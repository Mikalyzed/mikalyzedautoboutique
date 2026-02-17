"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/vehicles": "Vehicles",
  "/admin/leads": "Leads",
  "/admin/blog": "Blog",
  "/admin/analytics": "Analytics",
};

export default function AdminHeader() {
  const pathname = usePathname();

  const title =
    pageTitles[pathname] ||
    (pathname.startsWith("/admin/blog/") ? "Blog" : "Admin");

  return (
    <header className="h-16 flex-shrink-0 border-b border-zinc-800/40 bg-zinc-950/30 backdrop-blur-sm flex items-center justify-between px-6 lg:px-8">
      <div className="lg:hidden w-10" />
      <h1 className="text-lg font-light tracking-wide text-white">{title}</h1>
      <div className="flex items-center gap-4">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
            },
          }}
        />
      </div>
    </header>
  );
}
