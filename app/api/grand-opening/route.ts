import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      year,
      make,
      model,
      imageUrls,
      videoUrl,
      _hp: honeypot,
      _ts: formLoadedAt,
    } = body;

    // Bot check
    if (honeypot) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }
    if (formLoadedAt && Date.now() - formLoadedAt < 3000) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    if (!firstName || !lastName || !email || !phone || !year || !make || !model) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const vehicleName = `${year} ${make} ${model}`;
      const row = (label: string, value: string) =>
        value
          ? `<tr><td style="padding:6px 12px;font-weight:600;color:#888;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#fff">${value}</td></tr>`
          : "";

      const imageSection =
        imageUrls?.length > 0
          ? `<div style="margin-top:20px">
              <p style="color:#dffd6e;font-weight:600;margin-bottom:8px">Vehicle Photos (${imageUrls.length})</p>
              ${(imageUrls as string[])
                .map(
                  (url: string, i: number) =>
                    `<a href="${url}" target="_blank" style="display:inline-block;margin:4px">
                      <img src="${url}" alt="Photo ${i + 1}" style="width:150px;height:100px;object-fit:cover;border-radius:8px;border:1px solid #333" />
                    </a>`
                )
                .join("")}
            </div>`
          : "";

      const videoSection = videoUrl
        ? `<div style="margin-top:16px">
            <p style="color:#dffd6e;font-weight:600;margin-bottom:8px">Vehicle Video</p>
            <a href="${videoUrl}" target="_blank" style="color:#dffd6e;text-decoration:underline">View Video</a>
          </div>`
        : "";

      await resend.emails.send({
        from: "Mikalyzed Auto Boutique <notifications@mikalyzedautoboutique.com>",
        to: ["info@mikalyzedautoboutique.com"],
        subject: `Grand Opening Submission — ${vehicleName} — ${firstName} ${lastName}`,
        html: `<div style="font-family:system-ui,sans-serif;background:#111;color:#fff;padding:32px;border-radius:12px;max-width:600px">
          <h2 style="color:#dffd6e;margin:0 0 20px">Grand Opening Car Show Submission</h2>
          <table style="border-collapse:collapse;width:100%">
            ${row("Name", `${firstName} ${lastName}`)}
            ${row("Email", email)}
            ${row("Phone", phone)}
            ${row("Vehicle", vehicleName)}
          </table>
          ${imageSection}
          ${videoSection}
        </div>`,
      });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Grand opening submission failed:", error);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
