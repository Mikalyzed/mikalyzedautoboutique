import { getAvailableVehicles } from "@/lib/vehicles";
import InventoryClient from "./components/InventoryClient";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const inventory = await getAvailableVehicles();

  return (
    <main className="min-h-screen bg-black text-white">
      <InventoryClient inventory={inventory} />
    </main>
  );
}
