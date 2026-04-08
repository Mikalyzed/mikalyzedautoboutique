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

  // 5. Diff: vehicles in old but NOT in new → candidates for sold marking
  //    Skip auction vehicles and vehicles not sourced from DealerCenter
  const nonAuctionOld = oldVehicles.filter((v) => !v.auction);
  const dealerCenterOld = nonAuctionOld.filter((v) => (v as unknown as Record<string, unknown>).dataSource === "dealercenter");
  const potentiallySold = dealerCenterOld.filter((v) => !newVins.has(v.vin));

  // 6. Safety check: reject sync if incoming CSV would mark too many vehicles as sold
  //    This prevents partial/corrupt CSV exports from wiping out active inventory
  if (dealerCenterOld.length > 10 && potentiallySold.length > dealerCenterOld.length * 0.3) {
    return NextResponse.json({
      error: "Sync rejected: too many vehicles would be marked as sold",
      details: `CSV has ${newVins.size} vehicles, but ${potentiallySold.length} of ${dealerCenterOld.length} DealerCenter vehicles would be marked sold. This looks like a partial export.`,
      wouldMarkSold: potentiallySold.map((v) => `${v.year} ${v.make} ${v.model} (${v.vin})`),
    }, { status: 400 });
  }

  const newlySold = potentiallySold;
  const newlySoldVins = newlySold.map((v) => v.vin);

  // 7. Mark sold vehicles in DynamoDB
  if (newlySoldVins.length > 0) {
    await markVehiclesAsSold(newlySoldVins);
  }

  // 8. Upsert all vehicles from the new CSV
  await upsertVehicles(newVehicles);

  // 9. Return summary (includes CSV column names for debugging)
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
