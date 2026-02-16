/**
 * AWS Lambda function: S3 CSV upload → POST to Vercel sync endpoint.
 *
 * Triggered by S3:ObjectCreated events on .csv files.
 * Downloads the CSV from S3 and POSTs it to the Vercel /api/sync-inventory endpoint.
 *
 * Environment variables (set in Lambda console):
 *   SYNC_ENDPOINT  - e.g. https://yourdomain.com/api/sync-inventory
 *   SYNC_API_KEY   - must match SYNC_API_KEY in Vercel env vars
 */
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client();

export const handler = async (event) => {
  const record = event.Records?.[0];
  if (!record) {
    console.error("No S3 record in event");
    return { statusCode: 400, body: "No S3 record" };
  }

  const bucket = record.s3.bucket.name;
  const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

  console.log(`New CSV uploaded: s3://${bucket}/${key}`);

  // 1. Download CSV from S3
  const response = await s3.send(
    new GetObjectCommand({ Bucket: bucket, Key: key })
  );
  const csvBody = await response.Body.transformToString("utf-8");

  console.log(`CSV size: ${csvBody.length} characters`);

  // 2. POST to Vercel sync endpoint
  const endpoint = process.env.SYNC_ENDPOINT;
  const apiKey = process.env.SYNC_API_KEY;

  if (!endpoint || !apiKey) {
    console.error("Missing SYNC_ENDPOINT or SYNC_API_KEY environment variables");
    return { statusCode: 500, body: "Missing environment variables" };
  }

  const syncResponse = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "text/csv",
      "x-api-key": apiKey,
    },
    body: csvBody,
  });

  const result = await syncResponse.json();

  console.log(`Sync response (${syncResponse.status}):`, JSON.stringify(result, null, 2));

  if (!syncResponse.ok) {
    console.error("Sync failed:", result);
    return { statusCode: syncResponse.status, body: JSON.stringify(result) };
  }

  console.log(
    `Sync complete: ${result.summary.newInventoryCount} vehicles in inventory, ${result.summary.newlySoldCount} newly sold`
  );

  return { statusCode: 200, body: JSON.stringify(result) };
};
