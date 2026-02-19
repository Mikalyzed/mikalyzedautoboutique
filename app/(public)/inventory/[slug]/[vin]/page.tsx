import Link from "next/link";
import type { Metadata } from "next";
import { getVehicleByVin } from "@/lib/vehicles";
import ImageGallery from "@/app/(public)/inventory/components/ImageGallery";
import VehicleActions from "@/app/(public)/inventory/components/VehicleActions";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
    vin: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vin } = await params;
  const vinFromUrl = vin.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const vehicle = await getVehicleByVin(vinFromUrl);

  if (!vehicle) {
    return { title: "Vehicle Not Found" };
  }

  const vehicleName = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const shareTitle = `Check out this ${vehicleName} at Mikalyzed Auto Boutique`;
  const image = vehicle.images?.[0];

  return {
    title: vehicleName,
    description: shareTitle,
    openGraph: {
      title: shareTitle,
      description: `${vehicleName} — ${vehicle.price} | Mikalyzed Auto Boutique`,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: vehicleName }] } : {}),
      type: "website",
      siteName: "Mikalyzed Auto Boutique",
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: `${vehicleName} — ${vehicle.price}`,
      ...(image ? { images: [image] } : {}),
    },
  };
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

  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    brand: { "@type": "Brand", name: vehicle.make },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    ...(vehicle.odometer !== undefined && {
      mileageFromOdometer: {
        "@type": "QuantitativeValue",
        value: vehicle.odometer,
        unitCode: "SMI",
      },
    }),
    ...(vehicle.exteriorColor && { color: vehicle.exteriorColor }),
    ...(vehicle.transmission && { vehicleTransmission: vehicle.transmission }),
    vehicleIdentificationNumber: vehicle.vin,
    ...(vehicle.images?.[0] && { image: vehicle.images[0] }),
    offers: {
      "@type": "Offer",
      availability: isSold
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      ...(vehicle.price && vehicle.price !== "Call" && vehicle.price !== "Sold" && {
        price: vehicle.price.replace(/[^0-9]/g, ""),
        priceCurrency: "USD",
      }),
      seller: {
        "@type": "AutoDealer",
        name: "Mikalyzed Auto Boutique",
        telephone: "+1-305-720-2533",
      },
    },
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-28 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />
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
          <ImageGallery images={vehicle.images ?? []} videoUrl={vehicle.videoUrl} />
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
            <VehicleActions
              vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              vehicleVin={vehicle.vin}
            />
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
              className="mt-8 flex lg:inline-flex w-full lg:w-auto items-center justify-center gap-2 bg-black border border-zinc-700 text-white px-6 py-3.5 lg:py-3 rounded-lg font-light tracking-wide hover:border-[#dffd6e] transition"
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

          {/* VIDEO — mobile only (desktop version is inside ImageGallery) */}
          {vehicle.videoUrl && (
            <div className="lg:hidden mt-8">
              {vehicle.videoUrl.includes("cloudflarestream.com") ? (
                <iframe
                  src={`${vehicle.videoUrl.replace("/watch", "/iframe")}?autoplay=true&muted=true&loop=true`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  className="w-full rounded-2xl border-0"
                  style={{ aspectRatio: "16/9" }}
                />
              ) : (
                <video
                  src={vehicle.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full rounded-2xl"
                />
              )}
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
