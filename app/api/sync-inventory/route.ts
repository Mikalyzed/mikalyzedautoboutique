import { NextRequest, NextResponse } from "next/server";
import { parseCSV, Vehicle } from "@/lib/parseInventory";
import { getAvailableVehicles, upsertVehicles, markVehiclesAsSold } from "@/lib/vehicles";

export async function POST(request: NextRequest): Promise<NextResponse> {
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
  try {
    newVehicles = parseCSV(csvBody);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid CSV format", details: String(err) },
      { status: 400 }
    );
  }

  const newVins = new Set(newVehicles.map((v) => v.vin));

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
  const newlySold = oldVehicles.filter((v) => !newVins.has(v.vin));
  const newlySoldVins = newlySold.map((v) => v.vin);

  // 6. Mark sold vehicles in DynamoDB
  if (newlySoldVins.length > 0) {
    await markVehiclesAsSold(newlySoldVins);
  }

  // 7. Upsert all vehicles from the new CSV
  await upsertVehicles(newVehicles);

  // 8. Return summary
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
      timestamp: new Date().toISOString(),
    },
  });
}
