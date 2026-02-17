import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getAllLeads } from "@/lib/leads";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await getAllLeads();

    const { searchParams } = new URL(request.url);
    const formType = searchParams.get("formType");
    const vehicleVin = searchParams.get("vehicleVin");

    let filtered = leads;

    if (formType) {
      filtered = filtered.filter((l) => l.formType === formType);
    }
    if (vehicleVin) {
      filtered = filtered.filter((l) => l.vehicleVin === vehicleVin);
    }

    return NextResponse.json({ leads: filtered });
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
