import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getAllVehicles } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const vehicles = await getAllVehicles();
    return NextResponse.json({ vehicles });
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
