import { getInventoryFromCSV } from "@/lib/parseInventory";
import ImageGallery from "@/app/inventory/components/ImageGallery";


interface PageProps {
  params: Promise<{
    slug: string;
    vin: string;
  }>;
}

export default async function VehicleDetailPage({ params }: PageProps) {
  // ✅ REQUIRED FOR NEXT 15+ (params is async)
  const { vin } = await params;

  const inventory = getInventoryFromCSV();

  if (!vin) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Vehicle not found.</p>
      </main>
    );
  }

  // Normalize VIN from URL
  const vinFromUrl = vin.toUpperCase().replace(/[^A-Z0-9]/g, "");

  const vehicle = inventory.find((car) => {

    const csvVin = car.vin
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");

    return csvVin === vinFromUrl;
  });

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Vehicle not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:items-start">

        {/* IMAGE GALLERY */}
        <div>
          <ImageGallery images={vehicle.images ?? []} />
        </div>

        {/* VEHICLE INFO */}
        <div className="m-0 p-0">
          {/* YEAR & MAKE BADGE */}
          <p className="text-sm font-light tracking-[0.3em] text-[#dffd6e] mb-2 leading-tight block">
            {vehicle.year} {vehicle.make.toUpperCase()}
          </p>

          {/* MODEL NAME */}
          <h1 className="text-5xl font-light tracking-tight leading-tight mb-4">
            {vehicle.model}
          </h1>

          {/* PRICE */}
          <p className="text-4xl font-light text-[#dffd6e] mb-8">
            {vehicle.price}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-3 mb-10">
            <button className="flex items-center gap-2 bg-[#dffd6e] text-black px-6 py-3 rounded-lg font-normal tracking-wide hover:bg-[#dffd6e]/90 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact Us
            </button>

            <button className="flex items-center gap-2 bg-black border border-zinc-700 text-white px-6 py-3 rounded-lg font-light tracking-wide hover:border-[#dffd6e] transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Test Drive
            </button>

            <button className="bg-black border border-zinc-700 text-white p-3 rounded-lg hover:border-[#dffd6e] transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>

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
