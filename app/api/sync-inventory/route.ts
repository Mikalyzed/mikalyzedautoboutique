import { NextRequest, NextResponse } from "next/server";
import { parseCSVWithDiagnostics, Vehicle } from "@/lib/parseInventory";
import { getAvailableVehicles, upsertVehicles, markVehiclesAsSold } from "@/lib/vehicles";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // 0. Allow pausing sync via env var (set SYNC_PAUSED=true in Vercel to block updates)
  if (process.env.SYNC_PAUSED === "true") {
    return NextResponse.json(
      { error: "Sync is currently paused", message: "Remove SYNC_PAUSED env var to resume" },
      { status: 503 }
    );
  }

  // 1. Authenticate (skipped in local dev when SYNC_API_KEY is not set)
  const apiKey = process.env.SYNC_API_KEY;
  if (apiKey) {
    const providedKey =
      request.headers.get("x-api-key") ||
      request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

    if (providedKey !== apiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // 2. Read the CSV body
  let csvBody: string;
  try {
    csvBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Failed to read request body" }, { status: 400 });
  }

  if (!csvBody || csvBody.trim().length === 0) {
    return NextResponse.json({ error: "Empty CSV body" }, { status: 400 });
  }

  // 3. Parse the new CSV
  let newVehicles;
  let csvColumns: string[] = [];
  try {
    const result = parseCSVWithDiagnostics(csvBody);
    newVehicles = result.vehicles;
    csvColumns = result.columns;
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid CSV format", details: String(err) },
      { status: 400 }
    );
  }

  const newVins = new Set(newVehicles.map((v: Vehicle) => v.vin));

  if (newVins.size === 0) {
    return NextResponse.json({ error: "CSV contains no valid vehicles" }, { status: 400 });
  }

  // 4. Load current active inventory from DynamoDB
  let oldVehicles: Vehicle[];
  try {
    oldVehicles = await getAvailableVehicles();
  } catch {
    oldVehicles = [];
  }

  // 5. Diff: vehicles in old but NOT in new → mark as sold
  //    Skip auction vehicles — they were intentionally removed from DealerCenter
  const newlySold = oldVehicles.filter((v) => !newVins.has(v.vin) && !v.auction);
  const newlySoldVins = newlySold.map((v) => v.vin);

  // 6. Mark sold vehicles in DynamoDB
  if (newlySoldVins.length > 0) {
    await markVehiclesAsSold(newlySoldVins);
  }

  // 7. Upsert all vehicles from the new CSV
  await upsertVehicles(newVehicles);

  // 8. Return summary (includes CSV column names for debugging)
  const sample = newVehicles[0];
  return NextResponse.json({
    success: true,
    summary: {
      previousInventoryCount: oldVehicles.length,
      newInventoryCount: newVins.size,
      newlySoldCount: newlySoldVins.length,
      newlySoldVins: newlySold.map((v) => ({
        vin: v.vin,
        name: `${v.year} ${v.make} ${v.model}`,
      })),
      csvColumns,
      sampleVehicle: sample ? {
        vin: sample.vin,
        price: sample.price,
        hasDescription: !!sample.description,
        hasVideo: !!sample.videoUrl,
        imageCount: sample.images.length,
      } : null,
      timestamp: new Date().toISOString(),
    },
  });
}
