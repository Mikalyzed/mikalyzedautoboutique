import { getInventoryFromCSV } from "@/lib/parseInventory";
import InventoryClient from "./components/InventoryClient";

export default function InventoryPage() {
  const inventory = getInventoryFromCSV();

  return (
    <main className="min-h-screen bg-black text-white">
      <InventoryClient inventory={inventory} />
    </main>
  );
}
