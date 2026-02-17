"use client";

import { useState } from "react";
import type { Lead } from "@/lib/leads";

interface LeadsClientProps {
  leads: Lead[];
}

export default function LeadsClient({ leads }: LeadsClientProps) {
  const [formTypeFilter, setFormTypeFilter] = useState("all");
  const [vinFilter, setVinFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formTypes = [...new Set(leads.map((l) => l.formType).filter(Boolean))];
  const vehicleVins = [
    ...new Set(leads.map((l) => l.vehicleVin).filter(Boolean)),
  ];

  const filtered = leads.filter((l) => {
    const matchesType =
      formTypeFilter === "all" || l.formType === formTypeFilter;
    const matchesVin =
      vinFilter === "all" || l.vehicleVin === vinFilter;
    return matchesType && matchesVin;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={formTypeFilter}
          onChange={(e) => setFormTypeFilter(e.target.value)}
          className="bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#dffd6e] transition font-light text-sm"
        >
          <option value="all">All Form Types</option>
          {formTypes.map((ft) => (
            <option key={ft} value={ft}>
              {ft}
            </option>
          ))}
        </select>
        <select
          value={vinFilter}
          onChange={(e) => setVinFilter(e.target.value)}
          className="bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#dffd6e] transition font-light text-sm"
        >
          <option value="all">All Vehicles</option>
          {vehicleVins.map((vin) => (
            <option key={vin} value={vin!}>
              {vin}
            </option>
          ))}
        </select>
      </div>

      <p className="text-zinc-500 text-xs mb-4">
        {filtered.length} lead{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Table */}
      <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800/40">
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">
                  Phone
                </th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider hidden md:table-cell">
                  Date
                </th>
                <th className="text-right px-4 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <>
                  <tr
                    key={lead.id}
                    className="border-b border-zinc-800/20 hover:bg-zinc-800/30 transition-colors cursor-pointer"
                    onClick={() =>
                      setExpandedId(
                        expandedId === lead.id ? null : lead.id
                      )
                    }
                  >
                    <td className="px-4 py-3 text-white font-light">
                      {lead.name}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 hidden md:table-cell">
                      {lead.email}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 hidden lg:table-cell">
                      {lead.phone || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs border bg-zinc-800/50 border-zinc-700/50 text-zinc-400">
                        {lead.formType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 text-xs hidden md:table-cell">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-zinc-400 hover:text-[#dffd6e] transition-colors">
                        <svg
                          className={`w-4 h-4 transform transition-transform ${
                            expandedId === lead.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  {expandedId === lead.id && (
                    <tr key={`${lead.id}-detail`}>
                      <td
                        colSpan={6}
                        className="px-4 py-4 bg-zinc-900/50"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-zinc-500 text-xs mb-1">Email</p>
                            <p className="text-white">{lead.email}</p>
                          </div>
                          <div>
                            <p className="text-zinc-500 text-xs mb-1">Phone</p>
                            <p className="text-white">{lead.phone || "—"}</p>
                          </div>
                          {lead.vehicleVin && (
                            <div>
                              <p className="text-zinc-500 text-xs mb-1">
                                Vehicle VIN
                              </p>
                              <p className="text-white font-mono text-xs">
                                {lead.vehicleVin}
                              </p>
                            </div>
                          )}
                          {lead.source && (
                            <div>
                              <p className="text-zinc-500 text-xs mb-1">
                                Source
                              </p>
                              <p className="text-white">{lead.source}</p>
                            </div>
                          )}
                          {lead.message && (
                            <div className="sm:col-span-2">
                              <p className="text-zinc-500 text-xs mb-1">
                                Message
                              </p>
                              <p className="text-white whitespace-pre-wrap">
                                {lead.message}
                              </p>
                            </div>
                          )}
                          <div>
                            <p className="text-zinc-500 text-xs mb-1">
                              Submitted
                            </p>
                            <p className="text-white">
                              {new Date(lead.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-zinc-500"
                  >
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
