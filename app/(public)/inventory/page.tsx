import type { Metadata } from "next";
import { getAvailableVehicles } from "@/lib/vehicles";
import InventoryClient from "./components/InventoryClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Inventory | Mikalyzed Auto Boutique",
  description: "Browse our curated collection of luxury, exotic, and performance vehicles for sale in Miami, FL. Porsche, Lamborghini, classic cars and more.",
};

export default async function InventoryPage() {
  const inventory = await getAvailableVehicles();

  return (
    <main className="min-h-screen bg-black text-white">
      <InventoryClient inventory={inventory} />
    </main>
  );
}
