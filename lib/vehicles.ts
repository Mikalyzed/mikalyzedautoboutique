import {
  QueryCommand,
  GetCommand,
  BatchWriteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "./dynamodb";
import type { Vehicle, VehicleStatus } from "./parseInventory";

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

  for (let i = 0; i < vehicles.length; i += BATCH_SIZE) {
    const batch = vehicles.slice(i, i + BATCH_SIZE);
    const requests = batch.map((v) => ({
      PutRequest: {
        Item: {
          ...v,
          updatedAt: now,
          createdAt: now,
        },
      },
    }));

    await docClient.send(
      new BatchWriteCommand({
        RequestItems: {
          [TABLE_NAME]: requests,
        },
      })
    );
  }
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
