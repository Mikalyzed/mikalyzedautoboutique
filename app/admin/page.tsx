import { getAvailableVehicles, getSoldVehicles } from "@/lib/vehicles";
import { getAllLeads } from "@/lib/leads";
import { getAllBlogPosts } from "@/lib/blog";
import StatCard from "./components/StatCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function safeCall<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return fallback;
  }
}

export default async function AdminDashboard() {
  const [available, sold, leads, posts] = await Promise.all([
    safeCall(getAvailableVehicles, []),
    safeCall(getSoldVehicles, []),
    safeCall(getAllLeads, []),
    safeCall(getAllBlogPosts, []),
  ]);

  const now = new Date();
  const thisMonth = leads.filter((l) => {
    const d = new Date(l.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const recentLeads = leads.slice(0, 5);

  return (
    <div>
      <h2 className="text-2xl font-light tracking-tight text-white mb-8">
        Welcome back
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Active Vehicles" value={available.length} />
        <StatCard label="Sold Vehicles" value={sold.length} />
        <StatCard label="Total Leads" value={leads.length} />
        <StatCard
          label="Leads This Month"
          value={thisMonth.length}
          subtitle={`${posts.length} blog posts`}
        />
      </div>

      {/* Quick Links + Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-2xl p-6">
          <h3 className="text-sm text-zinc-400 font-medium mb-4 uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="space-y-2">
            {[
              { href: "/admin/vehicles", label: "Manage Vehicles", desc: `${available.length} active listings` },
              { href: "/admin/leads", label: "View Leads", desc: `${leads.length} total inquiries` },
              { href: "/admin/blog/new", label: "New Blog Post", desc: `${posts.length} posts total` },
              { href: "/admin/analytics", label: "View Analytics", desc: "Inventory & lead metrics" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/50 transition-all duration-200 group"
              >
                <div>
                  <p className="text-white text-sm group-hover:text-[#dffd6e] transition-colors">
                    {item.label}
                  </p>
                  <p className="text-zinc-500 text-xs">{item.desc}</p>
                </div>
                <svg className="w-4 h-4 text-zinc-600 group-hover:text-[#dffd6e] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent leads */}
        <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-zinc-400 font-medium uppercase tracking-wider">
              Recent Leads
            </h3>
            <Link
              href="/admin/leads"
              className="text-xs text-[#dffd6e] hover:underline"
            >
              View all
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <p className="text-zinc-500 text-sm">No leads yet</p>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between py-2 border-b border-zinc-800/30 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-white text-sm truncate">{lead.name}</p>
                    <p className="text-zinc-500 text-xs truncate">
                      {lead.email}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs border bg-zinc-800/50 border-zinc-700/50 text-zinc-400">
                      {lead.formType}
                    </span>
                    <p className="text-zinc-600 text-xs mt-0.5">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
