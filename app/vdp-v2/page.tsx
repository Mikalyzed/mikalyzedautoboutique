import { getVdpData } from "./data";
import { fontClass } from "./fonts";
import View from "./View";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mikalyzed — VDP Preview",
  robots: { index: false, follow: false },
};

export default async function VdpV2Preview() {
  // Preview defaults to the 2012 Mercedes-Benz SLS AMG.
  const data = await getVdpData("WDDRJ7HAXCA007214");
  if (!data) {
    return (
      <div style={{ minHeight: "100vh", background: "#0B0B0A", color: "#F5F5F0", display: "grid", placeItems: "center", padding: 40 }}>
        No inventory available to preview.
      </div>
    );
  }
  return <View {...data} fontClass={fontClass} />;
}
