"use client";

import { useState } from "react";
import Image from "next/image";
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

    let matchesStatus = false;
    if (statusFilter === "all") {
      matchesStatus = true;
    } else if (statusFilter === "auction") {
      matchesStatus = !!v.auction;
    } else if (statusFilter === "sold") {
      matchesStatus = v.status === "sold" && !v.auction;
    } else {
      matchesStatus = v.status === statusFilter;
    }

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

  const getDisplayImage = (v: DynamoVehicle) => {
    if (v.manualImages && v.manualImages.length > 0) return v.manualImages[0];
    if (v.images && v.images.length > 0) return v.images[0];
    return null;
  };

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
          <option value="auction">Auction</option>
          <option value="call">Call for Price</option>
        </select>
      </div>

      <p className="text-zinc-500 text-xs mb-4">
        {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((v) => {
          const img = getDisplayImage(v);
          return (
            <div
              key={v.vin}
              className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-xl overflow-hidden hover:border-zinc-700/60 transition-all duration-300 group"
            >
              {/* Thumbnail */}
              <div
                className="relative aspect-[16/10] bg-zinc-800 cursor-pointer overflow-hidden"
                onClick={() => setEditVin(v.vin)}
              >
                {img ? (
                  <Image
                    src={img}
                    alt={`${v.year} ${v.make} ${v.model}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg className="w-10 h-10 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                    </svg>
                  </div>
                )}

                {/* Status badge overlay */}
                <div className="absolute top-2 left-2">
                  <StatusBadge status={v.auction ? "auction" : v.manuallyMarkedSold ? "sold" : v.status} />
                </div>

                {/* Auction / Override indicator */}
                {v.auction ? (
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-black/60 backdrop-blur-sm text-amber-400 border border-amber-400/30">
                      Auction
                    </span>
                  </div>
                ) : hasOverride(v) ? (
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-black/60 backdrop-blur-sm text-[#dffd6e] border border-[#dffd6e]/30">
                      Override
                    </span>
                  </div>
                ) : null}

                {/* Photo count */}
                {v.images.length > 0 && (
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded px-1.5 py-0.5 text-[10px] text-zinc-300">
                    {v.images.length} photos
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-white text-sm font-light leading-tight truncate">
                    {v.year} {v.make} {v.model}
                  </h3>
                </div>
                {v.trim && (
                  <p className="text-zinc-500 text-xs truncate mb-1">{v.trim}</p>
                )}
                <p className="text-sm">
                  {v.manualPrice ? (
                    <>
                      <span className="text-[#dffd6e]">{v.manualPrice}</span>
                      <span className="text-zinc-600 text-xs line-through ml-1">{v.price}</span>
                    </>
                  ) : (
                    <span className="text-white">{v.price}</span>
                  )}
                </p>
              </div>

              {/* Quick Action Tabs */}
              <div className="grid grid-cols-3 border-t border-zinc-800/40">
                <button
                  onClick={() => handleToggle(v.vin, "featured", !v.featured)}
                  disabled={updating === v.vin}
                  className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] transition-all duration-200 border-r border-zinc-800/40 disabled:opacity-50 ${
                    v.featured
                      ? "bg-[#dffd6e]/10 text-[#dffd6e]"
                      : "text-zinc-500 hover:text-white hover:bg-zinc-800/30"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill={v.featured ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                  Featured
                </button>
                <button
                  onClick={() => handleToggle(v.vin, "hidden", !v.hidden)}
                  disabled={updating === v.vin}
                  className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] transition-all duration-200 border-r border-zinc-800/40 disabled:opacity-50 ${
                    v.hidden
                      ? "bg-red-500/10 text-red-400"
                      : "text-zinc-500 hover:text-white hover:bg-zinc-800/30"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {v.hidden ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </>
                    )}
                  </svg>
                  {v.hidden ? "Hidden" : "Visible"}
                </button>
                <button
                  onClick={() => setEditVin(v.vin)}
                  className="flex flex-col items-center gap-0.5 py-2.5 text-[10px] text-zinc-500 hover:text-[#dffd6e] hover:bg-zinc-800/30 transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                  </svg>
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-2xl p-12 text-center">
          <p className="text-zinc-500">No vehicles found</p>
        </div>
      )}

      {/* Edit Panel */}
      {editingVehicle && (
        <VehicleEditPanel
          vehicle={editingVehicle}
          onClose={() => setEditVin(null)}
          onSaved={handleSaved}
          onDeleted={(vin) => {
            setVehicles((prev) => prev.filter((v) => v.vin !== vin));
            setEditVin(null);
          }}
        />
      )}
    </div>
  );
}
