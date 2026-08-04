import {
  QueryCommand,
  GetCommand,
  BatchWriteCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "./dynamodb";
import type { Vehicle, VehicleStatus } from "./parseInventory";

const ADMIN_OVERRIDE_FIELDS = [
  "manualPrice",
  "manualDescription",
  "manualImages",
  "manuallyMarkedSold",
  "featured",
  "hidden",
  "auction",
  "auctionHouse",
  "auctionUrl",
  "auctionDate",
] as const;

// A real DealerCenter gallery is dozens of shots. Anything smaller than this
// that ALSO tells us nothing new is treated as a truncated export, not as the
// car's actual photo set. See the guard in upsertVehicles().
const MIN_TRUSTED_IMAGE_COUNT = 15;

// DealerCenter hands out whatever size the export felt like; we always want the
// high-res original.
function toHiRes(url: string): string {
  return url.replace(
    /imagesdl\.dealercenter\.net\/\d+\/\d+\//,
    "imagesdl.dealercenter.net/1920/1440/"
  );
}

export interface SoldVehicle extends Vehicle {
  soldDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface DynamoVehicle extends Vehicle {
  createdAt: string;
  updatedAt: string;
  soldDate?: string;
}

const GSI_NAME = "status-updatedAt-index";

async function queryByStatus(status: VehicleStatus): Promise<DynamoVehicle[]> {
  const items: DynamoVehicle[] = [];
  let lastKey: Record<string, unknown> | undefined;

  do {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: GSI_NAME,
        KeyConditionExpression: "#s = :status",
        ExpressionAttributeNames: { "#s": "status" },
        ExpressionAttributeValues: { ":status": status },
        ExclusiveStartKey: lastKey,
      })
    );
    items.push(...((result.Items as DynamoVehicle[]) || []));
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  return items;
}

export async function getAvailableVehicles(): Promise<Vehicle[]> {
  const [available, call, sold] = await Promise.all([
    queryByStatus("available"),
    queryByStatus("call"),
    queryByStatus("sold"),
  ]);
  // Include sold vehicles that are marked for auction (they belong in active inventory)
  const auctionVehicles = sold.filter((v) => v.auction);
  return [...available, ...call, ...auctionVehicles];
}

export async function getAllVehicles(): Promise<DynamoVehicle[]> {
  const [available, call, sold] = await Promise.all([
    queryByStatus("available"),
    queryByStatus("call"),
    queryByStatus("sold"),
  ]);
  return [...available, ...call, ...sold];
}

export async function getSoldVehicles(): Promise<SoldVehicle[]> {
  const items = await queryByStatus("sold");
  // Exclude auction vehicles — they show in active inventory, not sold
  const actualSold = items.filter((v) => !v.auction);
  return (actualSold as SoldVehicle[]).sort(
    (a, b) => new Date(b.soldDate || b.updatedAt).getTime() - new Date(a.soldDate || a.updatedAt).getTime()
  );
}

export async function getVehicleByVin(vin: string): Promise<DynamoVehicle | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { vin },
    })
  );
  return (result.Item as DynamoVehicle) || null;
}

export async function upsertVehicles(vehicles: Vehicle[]): Promise<void> {
  const now = new Date().toISOString();
  const BATCH_SIZE = 25;

  // Fetch existing vehicles to preserve images when new CSV has fewer
  const existingMap = new Map<string, DynamoVehicle>();
  for (const v of vehicles) {
    const existing = await getVehicleByVin(v.vin);
    if (existing) existingMap.set(v.vin, existing);
  }

  for (let i = 0; i < vehicles.length; i += BATCH_SIZE) {
    const batch = vehicles.slice(i, i + BATCH_SIZE);
    const requests = batch.map((v) => {
      const existing = existingMap.get(v.vin);

      // DealerCenter sometimes exports a stub row carrying a single thumbnail
      // rather than the real gallery, and we don't want that to wipe a car's
      // photos. Guarding on raw count alone was too blunt though: a re-shoot
      // that legitimately trims the set lost to whatever was already stored
      // (40 fresh photos rejected in favour of 59 stale ones), so re-shoots
      // never reached the site while the price kept updating around them.
      //
      // Judge the payload by what it contains instead. If it carries a photo we
      // haven't seen, it's a real gallery — take it, however many there are.
      // Only when it adds nothing new AND is too small to be a real gallery do
      // we assume the export was truncated and keep what we already hold.
      const incoming = (v.images ?? []).map(toHiRes);
      const stored = (existing?.images ?? []).map(toHiRes);
      const storedSet = new Set(stored);
      const bringsNewPhotos = incoming.some((url) => !storedSet.has(url));
      const looksTruncated =
        stored.length > 0 &&
        !bringsNewPhotos &&
        incoming.length < stored.length &&
        incoming.length < MIN_TRUSTED_IMAGE_COUNT;

      if (looksTruncated) {
        console.warn(
          `[sync] ${v.vin}: keeping ${stored.length} stored photos — CSV sent ${incoming.length} already-known photo(s), too few to be a real gallery.`
        );
      }

      const images = looksTruncated ? stored : incoming;

      // Preserve admin override fields from existing record during sync
      const adminOverrides: Record<string, unknown> = {};
      if (existing) {
        const rec = existing as unknown as Record<string, unknown>;
        for (const field of ADMIN_OVERRIDE_FIELDS) {
          if (rec[field] !== undefined) {
            adminOverrides[field] = rec[field];
          }
        }

        // Auto-clear manualPrice if the new CSV price now matches the override
        if (existing.manualPrice) {
          const normalize = (p: string) => p.replace(/[^0-9]/g, "");
          if (normalize(v.price) === normalize(existing.manualPrice)) {
            delete adminOverrides.manualPrice;
          }
        }
      }

      return {
        PutRequest: {
          Item: {
            ...v,
            images,
            dataSource: "dealercenter",
            updatedAt: now,
            createdAt: existing?.createdAt || now,
            ...adminOverrides,
          },
        },
      };
    });

    await docClient.send(
      new BatchWriteCommand({
        RequestItems: {
          [TABLE_NAME]: requests,
        },
      })
    );
  }
}

/**
 * Apply admin overrides to a vehicle.
 *
 * Three-way semantics, because "leave alone" and "clear" are different
 * intentions and conflating them made overrides impossible to remove:
 *   undefined → field not supplied, leave whatever is stored
 *   null      → clear it, the attribute is removed from the record
 *   a value   → set it
 */
export async function updateVehicleOverrides(
  vin: string,
  overrides: {
    manualPrice?: string | null;
    manualDescription?: string | null;
    manualImages?: string[] | null;
    manuallyMarkedSold?: boolean | null;
    featured?: boolean | null;
    hidden?: boolean | null;
    auction?: boolean | null;
    auctionHouse?: string | null;
    auctionUrl?: string | null;
    auctionDate?: string | null;
  }
): Promise<void> {
  const sets: string[] = [];
  const removes: string[] = [];
  const names: Record<string, string> = {};
  const values: Record<string, unknown> = {};

  Object.entries(overrides).forEach(([key, value]) => {
    if (value === undefined) return;

    const attrName = `#${key}`;
    names[attrName] = key;

    if (value === null) {
      removes.push(attrName);
      return;
    }

    sets.push(`${attrName} = :${key}`);
    values[`:${key}`] = value;
  });

  if (sets.length === 0 && removes.length === 0) return;

  values[":now"] = new Date().toISOString();
  sets.push("#updatedAt = :now");
  names["#updatedAt"] = "updatedAt";

  const expression = [
    `SET ${sets.join(", ")}`,
    removes.length ? `REMOVE ${removes.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  await docClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { vin },
      UpdateExpression: expression,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
    })
  );
}

export async function markVehiclesAsSold(vins: string[]): Promise<void> {
  const now = new Date().toISOString();
  const today = now.split("T")[0];

  // Fetch current prices before marking sold so we can preserve them
  const updates = vins.map(async (vin) => {
    const vehicle = await getVehicleByVin(vin);
    const lastPrice = vehicle?.price && vehicle.price !== "Sold" ? vehicle.price : undefined;

    await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { vin },
        UpdateExpression: `SET #s = :sold, soldDate = :date, updatedAt = :now, price = :price, featured = :f${lastPrice ? ", lastPrice = :lp" : ""}`,
        ExpressionAttributeNames: { "#s": "status" },
        ExpressionAttributeValues: {
          ":sold": "sold",
          ":date": today,
          ":now": now,
          ":price": "Sold",
          ":f": false,
          ...(lastPrice ? { ":lp": lastPrice } : {}),
        },
      })
    );
  });

  await Promise.all(updates);
}

export async function deleteVehicle(vin: string): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { vin },
    })
  );
}
