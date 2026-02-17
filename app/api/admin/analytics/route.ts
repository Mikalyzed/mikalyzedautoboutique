import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getAvailableVehicles, getSoldVehicles } from "@/lib/vehicles";
import { getAllLeads } from "@/lib/leads";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [available, sold, leads] = await Promise.all([
      getAvailableVehicles(),
      getSoldVehicles(),
      getAllLeads(),
    ]);

    // Leads per vehicle
    const leadsPerVehicle: Record<string, number> = {};
    for (const lead of leads) {
      if (lead.vehicleVin) {
        leadsPerVehicle[lead.vehicleVin] =
          (leadsPerVehicle[lead.vehicleVin] || 0) + 1;
      }
    }

    // Leads by source
    const leadsBySource: Record<string, number> = {};
    for (const lead of leads) {
      const source = lead.source || "unknown";
      leadsBySource[source] = (leadsBySource[source] || 0) + 1;
    }

    // Leads by form type
    const leadsByFormType: Record<string, number> = {};
    for (const lead of leads) {
      const ft = lead.formType || "unknown";
      leadsByFormType[ft] = (leadsByFormType[ft] || 0) + 1;
    }

    return NextResponse.json({
      totalActive: available.length,
      totalSold: sold.length,
      totalLeads: leads.length,
      leadsPerVehicle,
      leadsBySource,
      leadsByFormType,
      recentLeads: leads.slice(0, 10),
    });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
