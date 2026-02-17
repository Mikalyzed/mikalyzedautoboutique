import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/leads";
import { getVehicleByVin } from "@/lib/vehicles";

const RESERVE_VEHICLE_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/1QB8GTp5uOImt305H61U/webhook-trigger/f0d8cdc5-1603-495e-a895-163a2df8f4bb";

const RESERVE_STORAGE_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/1QB8GTp5uOImt305H61U/webhook-trigger/92a71d20-770f-4532-9f84-fb1ec23e9037";

const SELL_CAR_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/1QB8GTp5uOImt305H61U/webhook-trigger/ed6ea406-69e7-4619-aee4-a9ddf5103c5b";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      firstName,
      lastName,
      email,
      phone,
      vehicleVin,
      formType,
      financing,
      message,
      vehiclesToStore,
      collectionMessage,
      source,
      // Sell car fields
      year: sellYear,
      make: sellMake,
      model: sellModel,
      mileage,
      condition,
      vin: sellVin,
      exteriorColor,
      interiorColor,
      imageUrls,
      // Contact fields
      service,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Save lead to DynamoDB
    const lead = await createLead({
      name,
      email,
      phone: phone || undefined,
      vehicleVin: vehicleVin || undefined,
      formType: formType || "contact",
      message: message || undefined,
      source: source || "website",
    });

    // Look up vehicle details once (used by webhook for reserve form)
    let vehicle = null;
    if (formType === "reserve" && vehicleVin) {
      try {
        vehicle = await getVehicleByVin(vehicleVin);
      } catch (err) {
        console.error("Vehicle lookup failed:", err);
      }
    }

    // Forward reserve vehicle submissions to Lead Connector webhook
    if (formType === "reserve" && vehicleVin) {
      try {
        await fetch(RESERVE_VEHICLE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName || name,
            lastName: lastName || "",
            email,
            phone: phone || "",
            vehicleYear: vehicle?.year || "",
            vehicleMake: vehicle?.make || "",
            vehicleModel: vehicle?.model || "",
            vehicleVin,
            financing: financing ?? false,
            source: "mikalyzedautoboutique.com",
          }),
        });
      } catch (webhookError) {
        console.error("Reserve vehicle webhook failed:", webhookError);
      }
    }

    // Forward reserve storage (The Reserve page) submissions to Lead Connector webhook
    if (formType === "reserve-storage") {
      try {
        await fetch(RESERVE_STORAGE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName || name,
            lastName: lastName || "",
            email,
            phone: phone || "",
            vehiclesToStore: vehiclesToStore || "",
            message: collectionMessage || "",
            source: "mikalyzedautoboutique.com",
          }),
        });
      } catch (webhookError) {
        console.error("Reserve storage webhook failed:", webhookError);
      }
    }

    // Forward sell car submissions to Lead Connector webhook
    if (formType === "sell") {
      try {
        await fetch(SELL_CAR_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName || name,
            lastName: lastName || "",
            email,
            phone: phone || "",
            vehicleYear: sellYear || "",
            vehicleMake: sellMake || "",
            vehicleModel: sellModel || "",
            mileage: mileage || "",
            exteriorColor: exteriorColor || "",
            interiorColor: interiorColor || "",
            vin: sellVin || "",
            condition: condition || "",
            additionalDetails: message || "",
            imageUrls: imageUrls || [],
            source: "mikalyzedautoboutique.com",
          }),
        });
      } catch (webhookError) {
        console.error("Sell car webhook failed:", webhookError);
      }
    }

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    console.error("Failed to create lead:", error);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
