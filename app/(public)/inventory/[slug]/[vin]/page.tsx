import Link from "next/link";
import { getVehicleByVin } from "@/lib/vehicles";
import ImageGallery from "@/app/(public)/inventory/components/ImageGallery";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
    vin: string;
  }>;
}

export default async function VehicleDetailPage({ params }: PageProps) {
  // ✅ REQUIRED FOR NEXT 15+ (params is async)
  const { vin } = await params;

  if (!vin) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Vehicle not found.</p>
      </main>
    );
  }

  // Normalize VIN from URL and look up in DynamoDB
  const vinFromUrl = vin.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const vehicle = await getVehicleByVin(vinFromUrl);
  const isSold = vehicle?.status === "sold";

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Vehicle not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-sm font-light mb-10">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <Link href="/inventory" className="text-gray-500 hover:text-white transition-colors">
            Inventory
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </span>
        </nav>
      </div>

      {/* SOLD BANNER */}
      {isSold && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
            <p className="text-red-400 text-sm font-light tracking-wider uppercase">
              This vehicle has been sold
            </p>
          </div>
        </div>
      )}

      {/* VEHICLE TITLE + PRICE - above gallery on mobile, hidden on desktop */}
      <div className="max-w-7xl mx-auto lg:hidden mb-4">
        <p className="text-sm font-light tracking-[0.3em] text-[#dffd6e] mb-2 leading-tight block">
          {vehicle.year} {vehicle.make.toUpperCase()}
        </p>
        <h1 className="text-5xl font-light tracking-tight leading-tight mb-2">
          {vehicle.model}
        </h1>
        <p className="text-2xl font-light text-[#dffd6e]">
          {vehicle.price}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:items-start">

        {/* IMAGE GALLERY */}
        <div>
          <ImageGallery images={vehicle.images ?? []} />
        </div>

        {/* VEHICLE INFO */}
        <div className="m-0 p-0">
          {/* YEAR & MAKE BADGE - hidden on mobile, shown on desktop */}
          <p className="hidden lg:block text-sm font-light tracking-[0.3em] text-[#dffd6e] mb-2 leading-tight">
            {vehicle.year} {vehicle.make.toUpperCase()}
          </p>

          {/* MODEL NAME - hidden on mobile, shown on desktop */}
          <h1 className="hidden lg:block text-5xl font-light tracking-tight leading-tight mb-4">
            {vehicle.model}
          </h1>

          {/* PRICE - hidden on mobile (shown above gallery), visible on desktop */}
          <p className="hidden lg:block text-4xl font-light text-[#dffd6e] mb-8">
            {vehicle.price}
          </p>

          {/* ACTION BUTTONS — hidden for sold vehicles */}
          {!isSold && (
            <div className="flex flex-col gap-3 mb-10">
              <div className="flex gap-2 sm:gap-3">
                <button className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-[#dffd6e] text-black px-3 py-2.5 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-normal tracking-wide hover:bg-[#dffd6e]/90 transition">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact Us
                </button>

                <button className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-black border border-zinc-700 text-white px-3 py-2.5 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-light tracking-wide hover:border-[#dffd6e] transition">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Financing
                </button>

                <button className="bg-black border border-zinc-700 text-white p-2.5 sm:p-3 rounded-lg hover:border-[#dffd6e] transition">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-black border border-[#dffd6e] text-[#dffd6e] px-6 py-3 rounded-lg font-light tracking-wider hover:bg-[#dffd6e] hover:text-black transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Reserve This Vehicle
              </button>
            </div>
          )}

          {/* VEHICLE SPECS GRID */}
          {(() => {
            // Build array of available specs
            const specs = [];

            if (vehicle.transmission) {
              specs.push({ label: "Transmission", value: vehicle.transmission });
            }
            if (vehicle.exteriorColor) {
              specs.push({ label: "Exterior Color", value: vehicle.exteriorColor });
            }
            if (vehicle.interiorColor) {
              specs.push({ label: "Interior Color", value: vehicle.interiorColor });
            }
            // VIN is always shown
            specs.push({ label: "VIN", value: vehicle.vin, mono: true });

            if (vehicle.trim) {
              specs.push({ label: "Trim", value: vehicle.trim });
            }
            if (vehicle.odometer !== undefined) {
              specs.push({ label: "Mileage", value: `${vehicle.odometer.toLocaleString()} miles` });
            }

            const totalSpecs = specs.length;
            const isOdd = totalSpecs % 2 !== 0;

            return (
              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec, index) => {
                  const isLastAndOdd = isOdd && index === totalSpecs - 1;
                  return (
                    <div
                      key={spec.label}
                      className={`bg-zinc-900 rounded-lg p-5 border border-zinc-800 ${
                        isLastAndOdd ? "col-span-2" : ""
                      }`}
                    >
                      <p className="text-xs uppercase text-gray-400 tracking-[0.2em] mb-2 font-light">
                        {spec.label}
                      </p>
                      <p className={`text-lg font-light text-white ${spec.mono ? "text-base font-mono tracking-wide break-all" : ""}`}>
                        {spec.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* CARFAX — only for 1981+ vehicles */}
          {vehicle.year >= 1981 && (
            <a
              href={`https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=DVW_1&vin=${vehicle.vin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-black border border-zinc-700 text-white px-6 py-3 rounded-lg font-light tracking-wide hover:border-[#dffd6e] transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CARFAX Report
            </a>
          )}

          {/* DESCRIPTION */}
          {vehicle.description && (
            <div className="mt-10">
              <h3 className="text-xl font-normal mb-3 text-white tracking-tight">Description</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                {vehicle.description}
              </p>
            </div>
          )}

          {/* SCROLL INDICATOR */}
          <div className="mt-10 flex items-center justify-center gap-2 text-gray-500 text-sm font-light">
            <span>Scroll to details</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}
