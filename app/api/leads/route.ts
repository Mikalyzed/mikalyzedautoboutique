import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createLead } from "@/lib/leads";
import { getVehicleByVin } from "@/lib/vehicles";

const DEFAULT_EMAIL = process.env.NOTIFICATION_EMAIL || "sales@mikalyzedautoboutique.com";
const NOTIFICATION_EMAILS: Record<string, string> = {
  contact: process.env.NOTIFICATION_EMAIL_CONTACT || DEFAULT_EMAIL,
  reserve: process.env.NOTIFICATION_EMAIL_RESERVE || DEFAULT_EMAIL,
  "reserve-storage": process.env.NOTIFICATION_EMAIL_STORAGE || DEFAULT_EMAIL,
  sell: process.env.NOTIFICATION_EMAIL_SELL || DEFAULT_EMAIL,
};

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

    // Send email notification via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        let subject = "";
        let htmlBody = "";

        const row = (label: string, value: string | undefined) =>
          value ? `<tr><td style="padding:6px 12px;font-weight:600;color:#888;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#fff">${value}</td></tr>` : "";

        const wrapper = (content: string) =>
          `<div style="font-family:system-ui,sans-serif;background:#111;color:#fff;padding:32px;border-radius:12px;max-width:600px">
            ${content}
          </div>`;

        if (formType === "reserve" && vehicleVin) {
          const vehicleName = vehicle
            ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
            : vehicleVin;
          subject = `New Vehicle Reservation — ${vehicleName}`;
          htmlBody = wrapper(`
            <h2 style="color:#dffd6e;margin:0 0 20px">New Vehicle Reservation</h2>
            <table style="border-collapse:collapse;width:100%">
              ${row("Name", name)}
              ${row("Email", email)}
              ${row("Phone", phone)}
              ${row("Vehicle", vehicleName)}
              ${row("VIN", vehicleVin)}
              ${row("Financing", financing ? "Yes" : "No")}
            </table>
          `);
        } else if (formType === "reserve-storage") {
          subject = `New Reserve Storage Inquiry — ${name}`;
          htmlBody = wrapper(`
            <h2 style="color:#dffd6e;margin:0 0 20px">New Reserve Storage Inquiry</h2>
            <table style="border-collapse:collapse;width:100%">
              ${row("Name", name)}
              ${row("Email", email)}
              ${row("Phone", phone)}
              ${row("Vehicles to Store", vehiclesToStore)}
              ${row("Message", collectionMessage)}
            </table>
          `);
        } else if (formType === "sell") {
          const sellVehicleName = [sellYear, sellMake, sellModel].filter(Boolean).join(" ");
          subject = `New Sell Car Submission — ${sellVehicleName || name}`;
          htmlBody = wrapper(`
            <h2 style="color:#dffd6e;margin:0 0 20px">New Sell Car Submission</h2>
            <table style="border-collapse:collapse;width:100%">
              ${row("Name", name)}
              ${row("Email", email)}
              ${row("Phone", phone)}
              ${row("Vehicle", sellVehicleName)}
              ${row("VIN", sellVin)}
              ${row("Mileage", mileage)}
              ${row("Condition", condition)}
              ${row("Exterior Color", exteriorColor)}
              ${row("Interior Color", interiorColor)}
              ${row("Details", message)}
            </table>
            ${imageUrls?.length ? `<p style="color:#888;margin-top:16px">${imageUrls.length} image(s) attached to submission</p>` : ""}
          `);
        } else if (formType === "contact") {
          subject = `New Contact Form — ${name}`;
          htmlBody = wrapper(`
            <h2 style="color:#dffd6e;margin:0 0 20px">New Contact Form Submission</h2>
            <table style="border-collapse:collapse;width:100%">
              ${row("Name", name)}
              ${row("Email", email)}
              ${row("Phone", phone)}
              ${row("Service", service)}
              ${row("Message", message)}
            </table>
          `);
        } else {
          subject = `New Form Submission — ${name}`;
          htmlBody = wrapper(`
            <h2 style="color:#dffd6e;margin:0 0 20px">New Form Submission</h2>
            <table style="border-collapse:collapse;width:100%">
              ${row("Name", name)}
              ${row("Email", email)}
              ${row("Phone", phone)}
              ${row("Form Type", formType)}
              ${row("Message", message)}
            </table>
          `);
        }

        const recipient = NOTIFICATION_EMAILS[formType] || DEFAULT_EMAIL;
        await resend.emails.send({
          from: "Mikalyzed Auto Boutique <notifications@mikalyzedautoboutique.com>",
          to: [recipient],
          subject,
          html: htmlBody,
        });
      } catch (emailError) {
        console.error("Resend email notification failed:", emailError);
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
