import { redirect } from "next/navigation";
import { getAvailableVehicles } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

/**
 * /test/vdp with no VIN — jump to the first car that actually has photos, so
 * the preview never opens on an empty carousel.
 */
export default async function VdpIndex() {
  const all = await getAvailableVehicles();
  const target =
    all.find((v) => !v.hidden && (v.manualImages?.length || v.images?.length)) ??
    all.find((v) => !v.hidden);

  if (!target) redirect("/test/inventory");
  redirect(`/test/vdp/${target.vin}`);
}
