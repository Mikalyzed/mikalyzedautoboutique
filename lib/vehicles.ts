import {
  QueryCommand,
  GetCommand,
  BatchWriteCommand,
  UpdateCommand,
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
] as const;

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
  const [available, call] = await Promise.all([
    queryByStatus("available"),
    queryByStatus("call"),
  ]);
  return [...available, ...call];
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
  return (items as SoldVehicle[]).sort(
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
      // Keep existing images if the new CSV has fewer (DealerCenter sometimes sends only 1 thumbnail)
      const images =
        existing && existing.images && existing.images.length > v.images.length
          ? existing.images
          : v.images;

      // Preserve admin override fields from existing record during sync
      const adminOverrides: Record<string, unknown> = {};
      if (existing) {
        const rec = existing as unknown as Record<string, unknown>;
        for (const field of ADMIN_OVERRIDE_FIELDS) {
          if (rec[field] !== undefined) {
            adminOverrides[field] = rec[field];
          }
        }
      }

      return {
        PutRequest: {
          Item: {
            ...v,
            images,
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

export async function updateVehicleOverrides(
  vin: string,
  overrides: {
    manualPrice?: string;
    manualDescription?: string;
    manualImages?: string[];
    manuallyMarkedSold?: boolean;
    featured?: boolean;
    hidden?: boolean;
  }
): Promise<void> {
  const expressions: string[] = [];
  const names: Record<string, string> = {};
  const values: Record<string, unknown> = {};

  Object.entries(overrides).forEach(([key, value]) => {
    if (value !== undefined) {
      const attrName = `#${key}`;
      const attrValue = `:${key}`;
      expressions.push(`${attrName} = ${attrValue}`);
      names[attrName] = key;
      values[attrValue] = value;
    }
  });

  if (expressions.length === 0) return;

  values[":now"] = new Date().toISOString();
  expressions.push("#updatedAt = :now");
  names["#updatedAt"] = "updatedAt";

  await docClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { vin },
      UpdateExpression: `SET ${expressions.join(", ")}`,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
    })
  );
}

export async function markVehiclesAsSold(vins: string[]): Promise<void> {
  const now = new Date().toISOString();
  const today = now.split("T")[0];

  const updates = vins.map((vin) =>
    docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { vin },
        UpdateExpression: "SET #s = :sold, soldDate = :date, updatedAt = :now, price = :price",
        ExpressionAttributeNames: { "#s": "status" },
        ExpressionAttributeValues: {
          ":sold": "sold",
          ":date": today,
          ":now": now,
          ":price": "Sold",
        },
      })
    )
  );

  await Promise.all(updates);
}
