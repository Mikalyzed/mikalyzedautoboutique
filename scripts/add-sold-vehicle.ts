/**
 * One-off script to add a single, manually-curated vehicle straight into the
 * "sold" section of DynamoDB.
 *
 * This vehicle is fully isolated from the DealerCenter CSV sync:
 *   - status "sold" + auction:false  → never enters the sync's active-inventory
 *     diff (getAvailableVehicles), so it's never re-evaluated or re-marked.
 *   - dataSource "manual"            → explicitly excluded from the sold-marking
 *     diff in /api/sync-inventory.
 *   - Its VIN won't appear in the active DealerCenter export, so upsertVehicles
 *     never overwrites it.
 *
 * Images live locally under /public so they need no remote-image config.
 *
 * Usage:
 *   npx tsx scripts/add-sold-vehicle.ts
 *
 * Requires .env.local with AWS credentials and DYNAMODB_TABLE_NAME.
 */

import fs from "fs";
import path from "path";
import { config } from "dotenv";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

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

// --- Vehicle details -------------------------------------------------------
const IMAGE_DIR = "1974-ford-bronco"; // folder name under /public
const VIN = "U15GLR43314";
const YEAR = 1974;
const MAKE = "Ford";
const MODEL = "Bronco";
const SOLD_DATE = "2026-05-16"; // YYYY-MM-DD

const slug = `${YEAR}-${MAKE}-${MODEL}`
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

// Build the image list from the public folder (sorted), video last as videoUrl.
const dir = path.join(process.cwd(), "public", IMAGE_DIR);
const files = fs.readdirSync(dir);
const images = files
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort()
  .map((f) => `/${IMAGE_DIR}/${f}`);
const videoFile = files.find((f) => /\.(mp4|webm|mov)$/i.test(f));
const videoUrl = videoFile ? `/${IMAGE_DIR}/${videoFile}` : undefined;

async function run() {
  if (images.length === 0) {
    console.error(`No images found in public/${IMAGE_DIR}`);
    process.exit(1);
  }

  const now = new Date().toISOString();
  const item = {
    vin: VIN,
    year: YEAR,
    make: MAKE,
    model: MODEL,
    slug,
    price: "Sold",
    status: "sold" as const,
    images,
    videoUrl,
    auction: false,
    dataSource: "manual",
    soldDate: SOLD_DATE,
    createdAt: now,
    updatedAt: now,
  };

  await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));

  console.log(`Added sold vehicle: ${YEAR} ${MAKE} ${MODEL} (${VIN})`);
  console.log(`  images: ${images.length}${videoUrl ? " + 1 video" : ""}`);
  console.log(`  page:   /inventory/${slug}/${VIN}`);
}

run().catch((err) => {
  console.error("Failed to add sold vehicle:", err);
  process.exit(1);
});
