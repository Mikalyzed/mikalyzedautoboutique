import { getAvailableVehicles, getSoldVehicles } from "@/lib/vehicles";
import { getAllLeads } from "@/lib/leads";
import AnalyticsClient from "./components/AnalyticsClient";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const [available, sold, leads] = await Promise.all([
    getAvailableVehicles(),
    getSoldVehicles(),
    getAllLeads(),
  ]);

  // Leads per vehicle
  const leadsPerVehicle: Record<string, { count: number; label: string }> = {};
  for (const lead of leads) {
    if (lead.vehicleVin) {
      if (!leadsPerVehicle[lead.vehicleVin]) {
        const vehicle = [...available, ...sold].find(
          (v) => v.vin === lead.vehicleVin
        );
        leadsPerVehicle[lead.vehicleVin] = {
          count: 0,
          label: vehicle
            ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
            : lead.vehicleVin,
        };
      }
      leadsPerVehicle[lead.vehicleVin].count++;
    }
  }

  // Leads by source
  const leadsBySource: Record<string, number> = {};
  for (const lead of leads) {
    const source = lead.source || "website";
    leadsBySource[source] = (leadsBySource[source] || 0) + 1;
  }

  // Leads by form type
  const leadsByFormType: Record<string, number> = {};
  for (const lead of leads) {
    const ft = lead.formType || "unknown";
    leadsByFormType[ft] = (leadsByFormType[ft] || 0) + 1;
  }

  return (
    <AnalyticsClient
      totalActive={available.length}
      totalSold={sold.length}
      totalLeads={leads.length}
      leadsPerVehicle={leadsPerVehicle}
      leadsBySource={leadsBySource}
      leadsByFormType={leadsByFormType}
    />
  );
}
