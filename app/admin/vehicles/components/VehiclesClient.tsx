"use client";

import { useState } from "react";
import type { DynamoVehicle } from "@/lib/vehicles";
import StatusBadge from "../../components/StatusBadge";
import ToggleSwitch from "../../components/ToggleSwitch";
import VehicleEditPanel from "./VehicleEditPanel";

interface VehiclesClientProps {
  vehicles: DynamoVehicle[];
}

export default function VehiclesClient({ vehicles: initialVehicles }: VehiclesClientProps) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editVin, setEditVin] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = vehicles.filter((v) => {
    const matchesSearch =
      !search ||
      `${v.year} ${v.make} ${v.model} ${v.vin}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const editingVehicle = editVin
    ? vehicles.find((v) => v.vin === editVin) || null
    : null;

  async function handleToggle(
    vin: string,
    field: "featured" | "hidden",
    value: boolean
  ) {
    setUpdating(vin);
    try {
      const res = await fetch("/api/admin/vehicles/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vin, overrides: { [field]: value } }),
      });
      if (res.ok) {
        const { vehicle } = await res.json();
        setVehicles((prev) =>
          prev.map((v) => (v.vin === vin ? { ...v, ...vehicle } : v))
        );
      }
    } catch (error) {
      console.error("Toggle failed:", error);
    }
    setUpdating(null);
  }

  function handleSaved(updated: DynamoVehicle) {
    setVehicles((prev) =>
      prev.map((v) => (v.vin === updated.vin ? updated : v))
    );
    setEditVin(null);
  }

  const hasOverride = (v: DynamoVehicle) =>
    v.manualPrice ||
    v.manualDescription ||
    (v.manualImages && v.manualImages.length > 0) ||
    v.manuallyMarkedSold;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by VIN, make, model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light text-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#dffd6e] transition font-light text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="call">Call for Price</option>
        </select>
      </div>

      <p className="text-zinc-500 text-xs mb-4">
        {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Table */}
      <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800/40">
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider hidden md:table-cell">
                  VIN
                </th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="text-center px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">
                  Featured
                </th>
                <th className="text-center px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">
                  Hidden
                </th>
                <th className="text-right px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr
                  key={v.vin}
                  className="border-b border-zinc-800/20 hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="text-white font-light">
                          {v.year} {v.make} {v.model}
                        </p>
                        {v.trim && (
                          <p className="text-zinc-500 text-xs">{v.trim}</p>
                        )}
                      </div>
                      {hasOverride(v) && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-[#dffd6e]/10 text-[#dffd6e] border border-[#dffd6e]/20">
                          Override
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-400 font-mono text-xs hidden md:table-cell">
                    {v.vin}
                  </td>
                  <td className="px-4 py-3">
                    {v.manualPrice ? (
                      <div>
                        <span className="text-[#dffd6e]">{v.manualPrice}</span>
                        <span className="text-zinc-600 text-xs line-through ml-1">
                          {v.price}
                        </span>
                      </div>
                    ) : (
                      <span className="text-white">{v.price}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      status={v.manuallyMarkedSold ? "sold" : v.status}
                    />
                  </td>
                  <td className="text-center px-4 py-3 hidden lg:table-cell">
                    <ToggleSwitch
                      checked={!!v.featured}
                      onChange={(val) => handleToggle(v.vin, "featured", val)}
                      disabled={updating === v.vin}
                    />
                  </td>
                  <td className="text-center px-4 py-3 hidden lg:table-cell">
                    <ToggleSwitch
                      checked={!!v.hidden}
                      onChange={(val) => handleToggle(v.vin, "hidden", val)}
                      disabled={updating === v.vin}
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setEditVin(v.vin)}
                      className="text-zinc-400 hover:text-[#dffd6e] transition-colors text-xs"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-zinc-500"
                  >
                    No vehicles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Panel */}
      {editingVehicle && (
        <VehicleEditPanel
          vehicle={editingVehicle}
          onClose={() => setEditVin(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
