import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getAvailableVehicles } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

const DESCRIPTION_NOTIFY_EMAIL =
  process.env.DESCRIPTION_NOTIFY_EMAIL || "andrejp@mikalyzedautoboutique.com";
const DESCRIPTION_NOTIFY_CC =
  process.env.DESCRIPTION_NOTIFY_CC || "fernandob@mikalyzedautoboutique.com";

export async function GET(request: NextRequest) {
  // Protect with API key or Vercel Cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const apiKey = process.env.SYNC_API_KEY;

  const isAuthorized =
    (cronSecret && authHeader === `Bearer ${cronSecret}`) ||
    (apiKey && request.headers.get("x-api-key") === apiKey);

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const vehicles = await getAvailableVehicles();
  const missing = vehicles.filter(
    (v) => !v.description || v.description.trim() === ""
  );

  if (missing.length === 0) {
    return NextResponse.json({
      message: "All vehicles have descriptions",
      total: vehicles.length,
    });
  }

  // Send email notification
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const vehicleRows = missing
      .map(
        (v) =>
          `<tr>
            <td style="padding:6px 12px;color:#fff">${v.year} ${v.make} ${v.model}${v.trim ? " " + v.trim : ""}</td>
            <td style="padding:6px 12px;color:#888;font-family:monospace">${v.vin}</td>
          </tr>`
      )
      .join("");

    const cc = DESCRIPTION_NOTIFY_CC.split(",").map((e) => e.trim()).filter(Boolean);
    await resend.emails.send({
      from: "Mikalyzed Auto Boutique <notifications@mikalyzedautoboutique.com>",
      to: [DESCRIPTION_NOTIFY_EMAIL],
      ...(cc.length > 0 && { cc }),
      subject: `${missing.length} vehicle(s) missing descriptions`,
      html: `<div style="font-family:system-ui,sans-serif;background:#111;color:#fff;padding:32px;border-radius:12px;max-width:600px">
        <h2 style="color:#dffd6e;margin:0 0 8px">Missing Vehicle Descriptions</h2>
        <p style="color:#888;margin:0 0 20px">${missing.length} of ${vehicles.length} active vehicles need descriptions added.</p>
        <table style="border-collapse:collapse;width:100%">
          <tr>
            <th style="padding:6px 12px;text-align:left;color:#dffd6e;border-bottom:1px solid #333">Vehicle</th>
            <th style="padding:6px 12px;text-align:left;color:#dffd6e;border-bottom:1px solid #333">VIN</th>
          </tr>
          ${vehicleRows}
        </table>
      </div>`,
    });
  }

  return NextResponse.json({
    message: `${missing.length} vehicle(s) missing descriptions — email sent`,
    missing: missing.map((v) => ({
      name: `${v.year} ${v.make} ${v.model}${v.trim ? " " + v.trim : ""}`,
      vin: v.vin,
    })),
    total: vehicles.length,
  });
}
