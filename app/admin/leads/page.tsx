import { getAllLeads } from "@/lib/leads";
import LeadsClient from "./components/LeadsClient";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await getAllLeads();
  return <LeadsClient leads={leads} />;
}
