import { getAllVehicles } from "@/lib/vehicles";
import VehiclesClient from "./components/VehiclesClient";

export const dynamic = "force-dynamic";

export default async function AdminVehiclesPage() {
  const vehicles = await getAllVehicles();
  return <VehiclesClient vehicles={vehicles} />;
}
