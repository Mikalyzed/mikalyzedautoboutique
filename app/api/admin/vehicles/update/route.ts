import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { updateVehicleOverrides, getVehicleByVin } from "@/lib/vehicles";

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { vin, overrides } = body;

    if (!vin || typeof vin !== "string") {
      return NextResponse.json({ error: "VIN is required" }, { status: 400 });
    }

    if (!overrides || typeof overrides !== "object") {
      return NextResponse.json(
        { error: "Overrides object is required" },
        { status: 400 }
      );
    }

    // Only allow known override fields
    const allowed = new Set([
      "manualPrice",
      "manualDescription",
      "manualImages",
      "manuallyMarkedSold",
      "featured",
      "hidden",
    ]);

    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(overrides)) {
      if (allowed.has(key)) {
        sanitized[key] = value;
      }
    }

    await updateVehicleOverrides(vin, sanitized);
    const updated = await getVehicleByVin(vin);

    return NextResponse.json({ vehicle: updated });
  } catch (error) {
    console.error("Failed to update vehicle:", error);
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 500 }
    );
  }
}
