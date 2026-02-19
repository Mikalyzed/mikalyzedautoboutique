import Link from "next/link";
import { getAvailableVehicles } from "@/lib/vehicles";
import Image from "next/image";
import ContactForm from "@/app/components/ContactForm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const inventory = await getAvailableVehicles();
  const sorted = [...inventory].sort((a, b) => {
    const aFeat = (a as unknown as Record<string, unknown>).featured ? 1 : 0;
    const bFeat = (b as unknown as Record<string, unknown>).featured ? 1 : 0;
    return bFeat - aFeat;
  });
  const featuredVehicles = sorted.slice(0, 6);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/showroom.jpg"
            alt="Luxury Car Showroom"
            fill
            priority
            className="object-cover"
            quality={100}
          />
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#dffd6e]/20 via-transparent to-transparent animate-pulse-slow" />

        {/* Content */}
        <div className="relative z-10 w-full px-5 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[#dffd6e] text-[10px] sm:text-xs font-light tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6 animate-fade-in-up uppercase">
              Premium Automotive Experience
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight mb-4 sm:mb-8 animate-fade-in-up uppercase" style={{ animationDelay: '0.2s' }}>
              <span className="bg-gradient-to-r from-[#dffd6e] via-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent font-light">
                Mikalyzed
              </span>
              <br />
              Auto Boutique
            </h1>

            <p className="text-gray-300 text-sm sm:text-lg md:text-xl font-extralight mb-8 sm:mb-12 leading-relaxed animate-fade-in-up max-w-md sm:max-w-none" style={{ animationDelay: '0.4s' }}>
              Discover our curated collection of luxury and performance vehicles.
            </p>

            <div className="flex flex-row gap-3 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link
                href="/inventory"
                className="group relative bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] text-black px-6 py-3 sm:px-10 sm:py-5 rounded-full text-sm sm:text-base font-light tracking-wider hover:shadow-2xl hover:shadow-[#dffd6e]/50 transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10">Explore Inventory</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link
                href="/reserve"
                className="group relative bg-transparent border-2 border-white/30 text-white px-6 py-3 sm:px-10 sm:py-5 rounded-full text-sm sm:text-base font-extralight tracking-wider hover:border-[#dffd6e] hover:text-[#dffd6e] transition-all duration-500 backdrop-blur-sm"
              >
                Storage
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-500 text-xs font-light tracking-widest">SCROLL</span>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
        {/* Decorative blur circles for glass effect visibility */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-zinc-700/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-zinc-600/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#dffd6e]/15 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              Featured Collection
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter mb-8 leading-tight">
              Curated for <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">Excellence</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#dffd6e] to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {featuredVehicles.map((vehicle, index) => (
              <Link
                key={vehicle.vin}
                href={`/inventory/${vehicle.slug}/${vehicle.vin}`}
                className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-[#dffd6e] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#dffd6e]/20 transition-all duration-500 scroll-reveal"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image Badge */}
                {vehicle.images && vehicle.images.length > 0 && (
                  <div className="absolute top-4 right-4 z-10 bg-black/70 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    {vehicle.images.length}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-64 bg-zinc-800 overflow-hidden">
                  {vehicle.images && vehicle.images.length > 0 ? (
                    <Image
                      src={vehicle.images[0]}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                <div className="p-5 bg-gray-100/5 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/60">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-normal tracking-tight text-white group-hover:text-[#dffd6e] transition truncate">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                  </div>

                  <p className="text-2xl font-light text-[#dffd6e] mb-4">
                    {vehicle.price}
                  </p>

                  <div className="flex gap-4 text-sm text-gray-400 font-light">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{vehicle.odometer ? `${vehicle.odometer.toLocaleString()} mi` : '0 mi'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span>{vehicle.transmission || 'Manual'}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center scroll-reveal">
            <Link
              href="/inventory"
              className="group inline-flex items-center gap-3 bg-transparent border border-zinc-700 text-white px-10 py-5 rounded-full font-light tracking-wider hover:border-[#dffd6e] hover:text-[#dffd6e] transition-all duration-500"
            >
              View Full Collection
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* OUR SERVICES */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              Mikalyzed Auto Boutique
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight">
              Our <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Secure Storage */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/20 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <h3 className="text-3xl font-light tracking-tight mb-6 text-white">Secure Storage</h3>

              <p className="text-gray-400 font-extralight text-lg leading-relaxed mb-8">
                Climate-controlled, 24/7 monitored storage facilities designed to preserve your vehicle in pristine condition.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-400 font-light">
                  <span className="text-[#dffd6e]">•</span>
                  Climate controlled
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400 font-light">
                  <span className="text-[#dffd6e]">•</span>
                  GPS tracking
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400 font-light">
                  <span className="text-[#dffd6e]">•</span>
                  Full insurance
                </li>
              </ul>

              <Link href="/reserve" className="inline-flex items-center gap-2 text-[#dffd6e] font-light tracking-wider hover:gap-3 transition-all">
                LEARN MORE
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Buy a Car */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '150ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/20 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>

              <h3 className="text-3xl font-light tracking-tight mb-6 text-white">Buy a Car</h3>

              <p className="text-gray-400 font-extralight text-lg leading-relaxed mb-8">
                Access our curated collection of the world&apos;s most sought-after luxury and performance vehicles.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-400 font-light">
                  <span className="text-[#dffd6e]">•</span>
                  Certified vehicles
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400 font-light">
                  <span className="text-[#dffd6e]">•</span>
                  Financing options
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400 font-light">
                  <span className="text-[#dffd6e]">•</span>
                  Nationwide delivery
                </li>
              </ul>

              <Link href="/inventory" className="inline-flex items-center gap-2 text-[#dffd6e] font-light tracking-wider hover:gap-3 transition-all">
                LEARN MORE
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Sell Your Car */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '300ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/20 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h3 className="text-3xl font-light tracking-tight mb-6 text-white">Sell Your Car</h3>

              <p className="text-gray-400 font-extralight text-lg leading-relaxed mb-8">
                Maximize your vehicle&apos;s value with our expert appraisal and premium consignment service.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-400 font-light">
                  <span className="text-[#dffd6e]">•</span>
                  Free appraisal
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400 font-light">
                  <span className="text-[#dffd6e]">•</span>
                  Market analysis
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400 font-light">
                  <span className="text-[#dffd6e]">•</span>
                  White-glove service
                </li>
              </ul>

              <Link href="/sell" className="inline-flex items-center gap-2 text-[#dffd6e] font-light tracking-wider hover:gap-3 transition-all">
                LEARN MORE
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* FACILITY GALLERY */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#dffd6e]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-zinc-700/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              Our Facility
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter mb-8">
              Where Excellence
              <br />
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">Lives</span>
            </h2>
            <p className="text-gray-400 text-lg font-light max-w-3xl mx-auto leading-relaxed">
              Step inside our state-of-the-art facility where luxury vehicles receive world-class care and presentation
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large Featured Image - Spans 2 columns */}
            <div className="lg:col-span-2 lg:row-span-2 scroll-reveal">
              <div className="relative h-[500px] rounded-3xl overflow-hidden border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 group bg-zinc-900">
                <Image
                  src="/gallery/P1900928.jpg"
                  alt="Mikalyzed Auto Boutique Facility"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-white text-2xl font-light tracking-tight">Main Showroom</p>
                  <p className="text-gray-300 text-sm font-light mt-2">Climate-controlled luxury display</p>
                </div>
              </div>
            </div>

            {/* Smaller Gallery Images */}
            <div className="scroll-reveal" style={{ animationDelay: '100ms' }}>
              <div className="relative h-[240px] rounded-3xl overflow-hidden border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 group bg-zinc-900">
                <Image
                  src="/gallery/P1901157.jpg"
                  alt="The Reserve Storage"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-lg font-light">The Reserve</p>
                </div>
              </div>
            </div>

            <div className="scroll-reveal" style={{ animationDelay: '200ms' }}>
              <div className="relative h-[240px] rounded-3xl overflow-hidden border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 group bg-zinc-900">
                <Image
                  src="/gallery/P1901200.jpg"
                  alt="Cigar Lounge"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-lg font-light">Cigar Lounge</p>
                </div>
              </div>
            </div>

            <div className="scroll-reveal" style={{ animationDelay: '300ms' }}>
              <div className="relative h-[240px] rounded-3xl overflow-hidden border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 group bg-zinc-900">
                <Image
                  src="/gallery/P1900950.jpg"
                  alt="Client Lounge"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-lg font-light">Client Lounge</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 scroll-reveal" style={{ animationDelay: '400ms' }}>
              <div className="relative h-[240px] rounded-3xl overflow-hidden border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 group bg-zinc-900">
                <Image
                  src="/gallery/P1901037.jpg"
                  alt="Full Bar"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-lg font-light">Full Bar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* EXPERIENCE SECTION */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#dffd6e]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              The Experience
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter mb-8">
              Precision in Every
              <br />
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">Detail</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Curated Inventory */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-10 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light tracking-tight mb-4 text-white">Curated Inventory</h3>
              <p className="text-gray-400 font-extralight leading-relaxed">
                Hand-selected vehicles only. Condition, spec, and provenance matter here.
              </p>
            </div>

            {/* The Reserve */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-10 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light tracking-tight mb-4 text-white">The Reserve</h3>
              <p className="text-gray-400 font-extralight leading-relaxed">
                Climate-controlled luxury storage designed for serious car collections.
              </p>
            </div>

            {/* Nationwide Reach */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-10 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light tracking-tight mb-4 text-white">Nationwide Reach</h3>
              <p className="text-gray-400 font-extralight leading-relaxed">
                Seamless buying and selling anywhere in the United States.
              </p>
            </div>

            {/* Global Transactions */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-10 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light tracking-tight mb-4 text-white">Global Transactions</h3>
              <p className="text-gray-400 font-extralight leading-relaxed">
                Experience handling international buyers, sellers, and logistics.
              </p>
            </div>

            {/* White-Glove Experience */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-10 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light tracking-tight mb-4 text-white">White-Glove Experience</h3>
              <p className="text-gray-400 font-extralight leading-relaxed">
                A refined, concierge-level process from first conversation to delivery.
              </p>
            </div>

            {/* Consignment Done Right */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-10 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '500ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light tracking-tight mb-4 text-white">Consignment Done Right</h3>
              <p className="text-gray-400 font-extralight leading-relaxed">
                Maximum exposure, proper representation, and a smooth selling process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* LEGACY SECTION */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-zinc-700/20 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="scroll-reveal">
              <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
                Our Legacy
              </p>
              <h2 className="text-5xl md:text-6xl font-extralight tracking-tighter mb-10 leading-tight">
                Where Luxury
                <br />
                <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                  Meets Vision
                </span>
              </h2>
              <div className="space-y-8 text-gray-300 font-extralight text-lg leading-relaxed">
                <p>
                  For over two decades, Mikalyzed Auto Boutique has redefined automotive excellence. We don&apos;t simply sell vehicles—we orchestrate experiences that resonate with your aspirations.
                </p>
                <p>
                  Each automobile in our collection tells a story of engineering brilliance, designed passion, and timeless elegance. From rare classics to contemporary masterpieces, we curate only the extraordinary.
                </p>
              </div>
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 mt-12 text-[#dffd6e] font-light tracking-wider hover:text-[#dffd6e] transition-all duration-500"
              >
                Discover Our Story
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* FINAL CTA */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#dffd6e]/10 via-transparent to-transparent" />

        <div className="max-w-3xl mx-auto text-center relative z-10 scroll-reveal">
          <p className="text-[#dffd6e] text-xs font-light tracking-[0.4em] mb-4 uppercase">
            Begin Your Journey
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tighter mb-6">
            Your Dream <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">Awaits</span>
          </h2>
          <p className="text-gray-300 text-lg font-extralight mb-10 max-w-xl mx-auto leading-relaxed">
            Let us guide you to the perfect vehicle. Experience automotive luxury redefined.
          </p>

          <div className="flex flex-col gap-4 max-w-lg mx-auto">
            <div className="flex gap-4">
              <Link
                href="/inventory"
                className="flex-1 text-center bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] text-black px-6 py-4 rounded-full font-light tracking-wider hover:shadow-2xl hover:shadow-[#dffd6e]/50 transition-all duration-500"
              >
                Browse Inventory
              </Link>
              <Link
                href="/sell"
                className="flex-1 text-center bg-transparent border-2 border-zinc-700 text-white px-6 py-4 rounded-full font-extralight tracking-wider hover:border-[#dffd6e] hover:text-[#dffd6e] transition-all duration-500"
              >
                Sell Your Car
              </Link>
            </div>
            <Link
              href="/reserve"
              className="text-center bg-transparent border-2 border-zinc-700 text-white px-6 py-4 rounded-full font-extralight tracking-wider hover:border-[#dffd6e] hover:text-[#dffd6e] transition-all duration-500"
            >
              Vehicle Storage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
