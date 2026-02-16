/**
 * One-time seed script to load the current CSV inventory into DynamoDB.
 *
 * Usage:
 *   npx tsx scripts/seed-dynamodb.ts
 *
 * Requires .env.local with AWS credentials and DYNAMODB_TABLE_NAME.
 */

import fs from "fs";
import path from "path";
import { config } from "dotenv";
import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { parseCSV } from "../lib/parseInventory";

// Load environment variables from .env.local
config({ path: path.join(process.cwd(), ".env.local") });

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "mikalyzed-vehicles";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

async function ensureTableExists() {
  try {
    await client.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
    console.log(`Table "${TABLE_NAME}" already exists.`);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "name" in err && err.name === "ResourceNotFoundException") {
      console.log(`Creating table "${TABLE_NAME}"...`);
      await client.send(
        new CreateTableCommand({
          TableName: TABLE_NAME,
          KeySchema: [{ AttributeName: "vin", KeyType: "HASH" }],
          AttributeDefinitions: [
            { AttributeName: "vin", AttributeType: "S" },
            { AttributeName: "status", AttributeType: "S" },
            { AttributeName: "updatedAt", AttributeType: "S" },
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: "status-updatedAt-index",
              KeySchema: [
                { AttributeName: "status", KeyType: "HASH" },
                { AttributeName: "updatedAt", KeyType: "RANGE" },
              ],
              Projection: { ProjectionType: "ALL" },
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
              },
            },
          ],
          BillingMode: "PAY_PER_REQUEST",
        })
      );
      console.log("Table created. Waiting for it to become active...");

      // Wait for table to be active
      let active = false;
      while (!active) {
        await new Promise((r) => setTimeout(r, 2000));
        const desc = await client.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
        if (desc.Table?.TableStatus === "ACTIVE") active = true;
      }
      console.log("Table is active.");
    } else {
      throw err;
    }
  }
}

async function seed() {
  // Find the CSV file in /data
  const dataDir = path.join(process.cwd(), "data");
  const csvFiles = fs.readdirSync(dataDir).filter((f) => f.endsWith(".csv"));

  if (csvFiles.length === 0) {
    console.error("No CSV files found in data/ directory.");
    process.exit(1);
  }

  const csvPath = path.join(dataDir, csvFiles[0]);
  console.log(`Reading CSV: ${csvPath}`);

  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const vehicles = parseCSV(csvContent);

  console.log(`Parsed ${vehicles.length} vehicles from CSV.`);

  await ensureTableExists();

  const now = new Date().toISOString();
  const BATCH_SIZE = 25;
  let written = 0;

  for (let i = 0; i < vehicles.length; i += BATCH_SIZE) {
    const batch = vehicles.slice(i, i + BATCH_SIZE);
    const requests = batch.map((v) => ({
      PutRequest: {
        Item: {
          ...v,
          createdAt: now,
          updatedAt: now,
        },
      },
    }));

    await docClient.send(
      new BatchWriteCommand({
        RequestItems: { [TABLE_NAME]: requests },
      })
    );

    written += batch.length;
    console.log(`  Written ${written}/${vehicles.length} vehicles...`);
  }

  console.log(`\nSeed complete! ${written} vehicles loaded into "${TABLE_NAME}".`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
