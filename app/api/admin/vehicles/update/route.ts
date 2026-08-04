import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { updateVehicleOverrides, getVehicleByVin, deleteVehicle } from "@/lib/vehicles";

/**
 * Signed-in and allow-listed are two different failures, and collapsing both
 * into a bare 401 is why a rejected save looked like a save that did nothing.
 */
function authFailure(err: unknown) {
  const message = err instanceof Error ? err.message : "";
  if (message.startsWith("Forbidden")) {
    return NextResponse.json(
      {
        error:
          "Your account is signed in but not on the admin list, so nothing was saved. Ask for your Clerk user ID to be added to ADMIN_USER_IDS.",
      },
      { status: 403 }
    );
  }
  return NextResponse.json(
    { error: "Your session has expired — sign in again and retry. Nothing was saved." },
    { status: 401 }
  );
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (err) {
    return authFailure(err);
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
      "auction",
      "auctionHouse",
      "auctionUrl",
      "auctionDate",
    ]);

    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(overrides)) {
      if (allowed.has(key)) {
        sanitized[key] = value;
      }
    }

    // If marking as sold, automatically remove featured
    if (sanitized.manuallyMarkedSold === true) {
      sanitized.featured = false;
    }

    // If marking for auction, automatically remove featured
    if (sanitized.auction === true) {
      sanitized.featured = false;
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

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (err) {
    return authFailure(err);
  }

  try {
    const body = await request.json();
    const { vin } = body;

    if (!vin || typeof vin !== "string") {
      return NextResponse.json({ error: "VIN is required" }, { status: 400 });
    }

    await deleteVehicle(vin);

    return NextResponse.json({ success: true, vin });
  } catch (error) {
    console.error("Failed to delete vehicle:", error);
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
