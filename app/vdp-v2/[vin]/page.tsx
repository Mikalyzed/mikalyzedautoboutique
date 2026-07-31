import { getVdpData } from "../data";
import { fontClass } from "../fonts";
import View from "../View";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mikalyzed — VDP Preview",
  robots: { index: false, follow: false },
};

export default async function VdpV2VinPreview({ params }: { params: Promise<{ vin: string }> }) {
  const { vin } = await params;
  const data = await getVdpData(vin);
  if (!data) {
    return (
      <div style={{ minHeight: "100vh", background: "#0B0B0A", color: "#F5F5F0", display: "grid", placeItems: "center", padding: 40 }}>
        Vehicle not found.
      </div>
    );
  }
  return <View {...data} fontClass={fontClass} />;
}
