import "dotenv/config";

/**
 * One-time script to restore full descriptions from an older CSV export.
 *
 * DealerCenter's newer CSV exports sometimes truncate the WebDescription field
 * to just the first line. This script reads the older CSV (which had full
 * descriptions) and updates DynamoDB records where the stored description
 * is shorter than the one in the old CSV.
 *
 * Usage:
 *   npx tsx scripts/restore-descriptions.ts
 */

import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "../lib/dynamodb";
import { getVehicleByVin } from "../lib/vehicles";

const PLACEHOLDER = "\uE000";

function fixEncoding(text: string): string {
  return text
    .replace(new RegExp(PLACEHOLDER, "g"), (_, offset) => {
      const before = text.slice(Math.max(0, offset - 2), offset);
      const after = text.slice(offset + 1, offset + 3);
      if (before.endsWith(" ") && after.startsWith(" ")) return "—";
      if (/\d$/.test(before) && /[ \s",.)]/.test(after[0] || "")) return "\u2033";
      if (/[a-zA-Z]$/.test(before)) return "\u2019";
      if (/\d/.test(after[0] || "")) return "\u2019";
      return "\u2019";
    })
    .replace(/ +,/g, ",")
    .replace(/ +\./g, ".");
}

async function main() {
  // Read the older CSV with full descriptions
  const csvPath = path.join(
    __dirname,
    "../data/DealerCenter_20260204_22887597.csv"
  );
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const fileContent = csvContent.replace(/\uFFFD/g, PLACEHOLDER);

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as Record<string, string>[];

  let updated = 0;
  let skipped = 0;

  for (const row of records) {
    const vin = row["VIN"]?.trim().toUpperCase();
    if (!vin) continue;

    const rawDesc = row["WebDescription"]?.trim();
    if (!rawDesc) continue;

    const fullDesc = fixEncoding(rawDesc);

    // Check current DynamoDB record
    const existing = await getVehicleByVin(vin);
    if (!existing) {
      console.log(`SKIP ${vin} — not in DynamoDB`);
      skipped++;
      continue;
    }

    const currentDesc = existing.description || "";

    // Only update if the old CSV description is longer
    if (fullDesc.length > currentDesc.length) {
      await docClient.send(
        new UpdateCommand({
          TableName: TABLE_NAME,
          Key: { vin },
          UpdateExpression: "SET description = :desc, updatedAt = :now",
          ExpressionAttributeValues: {
            ":desc": fullDesc,
            ":now": new Date().toISOString(),
          },
        })
      );
      console.log(
        `UPDATED ${vin} — ${currentDesc.length} → ${fullDesc.length} chars`
      );
      updated++;
    } else {
      console.log(
        `OK ${vin} — current (${currentDesc.length}) >= old (${fullDesc.length})`
      );
      skipped++;
    }
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
}

main().catch(console.error);
