import { config } from "dotenv";
config({ path: ".env.local" });
import { getAvailableVehicles } from "../lib/vehicles";

async function main() {
  const vehicles = await getAvailableVehicles();
  const noDesc = vehicles.filter((v) => !v.description || v.description.trim() === "");

  console.log(`Vehicles with NO description (${noDesc.length}/${vehicles.length}):\n`);
  for (const v of noDesc) {
    console.log(`- ${v.year} ${v.make} ${v.model}${v.trim ? " " + v.trim : ""}  (VIN: ${v.vin})`);
  }
}

main().catch(console.error);
