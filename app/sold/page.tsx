import Link from "next/link";
import Image from "next/image";
import { getSoldVehicles } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

export default async function SoldPage() {
  const soldVehicles = await getSoldVehicles();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <p className="text-[#dffd6e] text-xs font-light tracking-[0.5em] mb-6 animate-fade-in-up uppercase">
              Previous Sales
            </p>
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter mb-6 animate-fade-in-up uppercase" style={{ animationDelay: "0.2s" }}>
              Recently{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent font-light">
                Sold
              </span>
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#dffd6e]/50 to-transparent mx-auto mb-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }} />
            <p className="text-gray-400 text-lg font-extralight max-w-xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              A look at vehicles we&apos;ve recently placed with new owners.
            </p>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* SOLD VEHICLES GRID or EMPTY STATE */}
      <section className="relative py-16 px-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-zinc-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {soldVehicles.length === 0 ? (
            /* EMPTY STATE */
            <div className="text-center py-16 scroll-reveal">
              <div className="w-24 h-24 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-full flex items-center justify-center mx-auto mb-10">
                <svg className="w-12 h-12 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-6">
                Sold Gallery Coming Soon
              </h2>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed mb-4 max-w-lg mx-auto">
                We&apos;re building out our sold archive. Check back soon to see the vehicles we&apos;ve placed with collectors and enthusiasts.
              </p>
              <p className="text-gray-500 font-extralight text-sm mb-12">
                In the meantime, browse our current inventory or reach out to learn what&apos;s available.
              </p>

              <div className="flex gap-4 justify-center">
                <Link
                  href="/inventory"
                  className="px-8 py-3 rounded-full text-sm font-light tracking-wider bg-[#dffd6e] text-black hover:shadow-lg hover:shadow-[#dffd6e]/30 transition-all duration-500"
                >
                  Browse Inventory
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 rounded-full text-sm font-light tracking-wider border border-zinc-700 text-white hover:border-[#dffd6e] hover:text-[#dffd6e] transition-all duration-500"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          ) : (
            /* SOLD VEHICLES */
            <>
              <p className="text-gray-400 text-sm font-light tracking-wide mb-8">
                {soldVehicles.length} vehicle{soldVehicles.length !== 1 ? "s" : ""} sold
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {soldVehicles.map((vehicle) => (
                  <Link
                    key={vehicle.vin}
                    href={`/inventory/${vehicle.slug}/${vehicle.vin}`}
                    className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-300"
                  >
                    {/* SOLD badge */}
                    <div className="absolute top-4 left-4 z-10 bg-red-600/90 text-white text-xs px-3 py-1 rounded-full font-light tracking-wider">
                      SOLD
                    </div>

                    {/* Image (grayscale for sold effect) */}
                    <div className="relative h-64 bg-zinc-800 overflow-hidden">
                      {vehicle.images && vehicle.images.length > 0 ? (
                        <Image
                          src={vehicle.images[0]}
                          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-normal tracking-tight text-white mb-1">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      {vehicle.trim && (
                        <p className="text-sm text-gray-500 font-light mb-2">{vehicle.trim}</p>
                      )}
                      <p className="text-sm text-gray-500 font-light">
                        Sold {vehicle.soldDate ? new Date(vehicle.soldDate + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
