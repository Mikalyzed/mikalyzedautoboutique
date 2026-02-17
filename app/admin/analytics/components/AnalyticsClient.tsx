"use client";

import StatCard from "../../components/StatCard";

interface AnalyticsClientProps {
  totalActive: number;
  totalSold: number;
  totalLeads: number;
  leadsPerVehicle: Record<string, { count: number; label: string }>;
  leadsBySource: Record<string, number>;
  leadsByFormType: Record<string, number>;
}

function BarChart({
  data,
  color = "#dffd6e",
}: {
  data: { label: string; value: number }[];
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-zinc-300 truncate mr-4">{item.label}</span>
            <span className="text-zinc-400 flex-shrink-0">{item.value}</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <p className="text-zinc-500 text-sm">No data available</p>
      )}
    </div>
  );
}

export default function AnalyticsClient({
  totalActive,
  totalSold,
  totalLeads,
  leadsPerVehicle,
  leadsBySource,
  leadsByFormType,
}: AnalyticsClientProps) {
  const vehicleLeadData = Object.entries(leadsPerVehicle)
    .map(([, v]) => ({ label: v.label, value: v.count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const sourceData = Object.entries(leadsBySource)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);

  const formTypeData = Object.entries(leadsByFormType)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="Active Vehicles" value={totalActive} />
        <StatCard label="Sold Vehicles" value={totalSold} />
        <StatCard label="Total Leads" value={totalLeads} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads per vehicle */}
        <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-2xl p-6">
          <h3 className="text-sm text-zinc-400 font-medium mb-6 uppercase tracking-wider">
            Leads per Vehicle (Top 10)
          </h3>
          <BarChart data={vehicleLeadData} />
        </div>

        {/* Leads by source */}
        <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-2xl p-6">
          <h3 className="text-sm text-zinc-400 font-medium mb-6 uppercase tracking-wider">
            Leads by Source
          </h3>
          <BarChart data={sourceData} color="#dffd6e" />
        </div>

        {/* Leads by form type */}
        <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-2xl p-6 lg:col-span-2">
          <h3 className="text-sm text-zinc-400 font-medium mb-6 uppercase tracking-wider">
            Leads by Form Type
          </h3>
          <BarChart data={formTypeData} color="#6ee7b7" />
        </div>
      </div>
    </div>
  );
}
