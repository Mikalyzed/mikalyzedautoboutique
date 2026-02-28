import type { Metadata } from "next";
import WheelsAndWingsForm from "./WheelsAndWingsForm";

export const metadata: Metadata = {
  title: "Columbus Wheels & Wings | Mikalyzed Auto Boutique",
  description:
    "Visit Mikalyzed Auto Boutique at Columbus Wheels & Wings. Connect with us and follow along on Instagram.",
};

export default function WheelsAndWingsPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 py-24">
      <div className="text-center max-w-lg w-full">
        {/* Event Title */}
        <p className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase mb-4">
          Mikalyzed Auto Boutique
        </p>
        <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-3">
          Columbus Wheels{" "}
          <span className="text-[#dffd6e]">&amp;</span> Wings
        </h1>
        <div className="w-16 h-px bg-[#dffd6e]/40 mx-auto mb-6" />
        <p className="text-gray-400 font-extralight text-base leading-relaxed mb-10">
          Thanks for stopping by our booth! We&apos;d love to stay connected.
          Drop your info below and give us a follow on Instagram to see our
          latest inventory and behind-the-scenes content.
        </p>

        {/* Contact Form */}
        <WheelsAndWingsForm />
      </div>
    </main>
  );
}
