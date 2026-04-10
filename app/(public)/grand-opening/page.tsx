import type { Metadata } from "next";
import GrandOpeningForm from "./GrandOpeningForm";

export const metadata: Metadata = {
  title: "Grand Opening Car Show | Mikalyzed Auto Boutique",
  description:
    "Submit your vehicle to be featured at the Mikalyzed Auto Boutique Grand Opening.",
};

export default function GrandOpeningPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative pt-40 pb-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#dffd6e] text-xs font-light tracking-[0.5em] mb-6 uppercase">
              Grand Opening
            </p>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tighter mb-4">
              Bring Your Car to the{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent font-light">
                Show
              </span>
            </h1>
            <p className="text-gray-400 font-extralight text-lg leading-relaxed max-w-lg mx-auto">
              Fill out the form below to submit your vehicle for our Grand
              Opening event. We&apos;ll review your submission and get back to
              you.
            </p>
          </div>

          <GrandOpeningForm />
        </div>
      </section>
    </main>
  );
}
