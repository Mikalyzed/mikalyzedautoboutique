import Link from "next/link";
import ContactForm from "@/app/components/ContactForm";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#dffd6e]/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <p className="text-[#dffd6e] text-xs font-light tracking-[0.5em] mb-8 animate-fade-in-up uppercase">
            Our Story
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tighter mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Life is too short to
            <br />
            <span className="bg-gradient-to-r from-[#dffd6e] via-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent font-light">
              drive boring cars.
            </span>
          </h1>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#dffd6e]/50 to-transparent mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }} />

          <p className="text-gray-400 text-lg md:text-xl font-extralight max-w-xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Where passion meets precision.
          </p>
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

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* WHO WE ARE */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-8 uppercase">
              Who We Are
            </p>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter mb-12 leading-tight">
              We don&apos;t just sell cars.
              <br />
              <span className="text-gray-500">We elevate lifestyles.</span>
            </h2>
            <div className="space-y-8 text-gray-300 font-extralight text-lg md:text-xl leading-relaxed max-w-3xl">
              <p>
                Mikalyzed Auto Boutique was built on a simple belief: the vehicles you drive should reflect who you are. We curate premium luxury and performance vehicles — handpicked for those who demand the best in style, performance, and exclusivity.
              </p>
              <p>
                Every car on our floor has been selected with intention. We don&apos;t deal in volume. We deal in quality. From rare exotics to timeless classics, each vehicle in our collection tells a story worth owning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* WHAT WE OFFER */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-zinc-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#dffd6e]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              What We Do
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight">
              Three Pillars of{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Buy */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <p className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-4">Elevate Your Drive</p>
              <h3 className="text-3xl font-light tracking-tight mb-4 text-white">Purchase</h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed mb-6">
                A curated selection of high-end luxury vehicles, handpicked for those who demand the best in style and performance. Every vehicle inspected, every detail verified.
              </p>
              <Link href="/inventory" className="text-[#dffd6e] text-sm font-light tracking-wider hover:underline inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Browse Inventory
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Sell */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '150ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-4">Cash In. Drive On.</p>
              <h3 className="text-3xl font-light tracking-tight mb-4 text-white">Sell</h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed mb-6">
                A seamless, no-hassle selling process. Quick, transparent, and effortless. Get a competitive offer within 24 hours and let us handle the rest.
              </p>
              <Link href="/sell" className="text-[#dffd6e] text-sm font-light tracking-wider hover:underline inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Sell Your Car
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Store */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '300ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-4">Protect What Matters</p>
              <h3 className="text-3xl font-light tracking-tight mb-4 text-white">The Reserve</h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed mb-6">
                State-of-the-art 30,000 sq. ft. facility near Miami International Airport. Climate-controlled, 24/7 security, and full concierge service for your collection.
              </p>
              <Link href="/reserve" className="text-[#dffd6e] text-sm font-light tracking-wider hover:underline inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* THE EXPERIENCE */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              The Experience
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter mb-8 leading-tight">
              What Sets Us{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Apart
              </span>
            </h2>
            <p className="text-gray-400 text-lg font-extralight max-w-2xl mx-auto leading-relaxed">
              We&apos;re not a typical dealership. We&apos;re a boutique — built for people who see cars as more than transportation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800/30 rounded-3xl overflow-hidden scroll-reveal" style={{ animationDelay: '200ms' }}>
            {/* Item 1 */}
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">01</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">Curated Selection</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                Every vehicle is handpicked. We don&apos;t deal in volume — we deal in quality, rarity, and vehicles that turn heads.
              </p>
            </div>

            {/* Item 2 */}
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">02</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">Private Appointments</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                No crowded showroom floor. View vehicles on your time, at your pace, with dedicated one-on-one attention.
              </p>
            </div>

            {/* Item 3 */}
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">03</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">Full Transparency</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                Complete vehicle history, detailed inspections, and honest conversations. No surprises, no pressure — ever.
              </p>
            </div>

            {/* Item 4 */}
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">04</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">Concierge Delivery</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                We deliver anywhere. Enclosed transport, white-glove service, and a seamless handoff experience.
              </p>
            </div>

            {/* Item 5 */}
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">05</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">After-Sale Support</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                Our relationship doesn&apos;t end at the sale. Maintenance coordination, insurance guidance, and ongoing support.
              </p>
            </div>

            {/* Item 6 */}
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">06</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">Miami Based</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                Located near Miami International Airport in our 30,000 sq. ft. facility — a destination built for automotive enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* THE FACILITY */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              Our Home
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight">
              The{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Facility
              </span>
            </h2>
          </div>

          <div className="space-y-0">
            <div className="scroll-reveal group flex items-start gap-8 py-12 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500">
              <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-20">30K</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">Square Feet</h3>
                <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                  Our state-of-the-art facility provides ample space for our showroom, storage bays, detailing center, and private viewing areas.
                </p>
              </div>
            </div>

            <div className="scroll-reveal group flex items-start gap-8 py-12 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500" style={{ animationDelay: '150ms' }}>
              <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-20">MIA</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">Miami, Florida</h3>
                <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                  Strategically located near Miami International Airport at 3455 NW 30th Ave, Miami FL 33142. Easy access for local and out-of-state clients.
                </p>
              </div>
            </div>

            <div className="scroll-reveal group flex items-start gap-8 py-12 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500" style={{ animationDelay: '300ms' }}>
              <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-20">24/7</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">Security & Monitoring</h3>
                <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                  Round-the-clock surveillance, climate control monitoring, and controlled access ensure every vehicle under our care is protected at all times.
                </p>
              </div>
            </div>

            <div className="scroll-reveal group flex items-start gap-8 py-12" style={{ animationDelay: '450ms' }}>
              <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-20 text-3xl">APT</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">By Appointment</h3>
                <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                  We operate by appointment to ensure each client receives our full attention. Schedule a private visit to experience the boutique firsthand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* CONTACT SECTION */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-zinc-700/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="scroll-reveal">
              <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
                Get In Touch
              </p>
              <h2 className="text-5xl md:text-6xl font-extralight tracking-tighter mb-10 leading-tight">
                Let&apos;s Start a
                <br />
                <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                  Conversation
                </span>
              </h2>
              <div className="space-y-6 text-gray-300 font-extralight text-lg leading-relaxed">
                <p>
                  Whether you&apos;re looking to buy, sell, or store — we&apos;d love to hear from you. Reach out and let us show you the Mikalyzed experience.
                </p>
              </div>

              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-light">3455 NW 30th Ave</p>
                    <p className="text-gray-500 font-extralight text-sm">Miami, FL 33142</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-light">(305) 720-2533</p>
                    <p className="text-gray-500 font-extralight text-sm">Call anytime</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-light">info@mikalyzedautoboutique.com</p>
                    <p className="text-gray-500 font-extralight text-sm">We respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* FINAL CTA */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#dffd6e]/10 via-transparent to-transparent" />

        <div className="max-w-3xl mx-auto text-center relative z-10 scroll-reveal">
          <p className="text-[#dffd6e] text-xs font-light tracking-[0.4em] mb-4 uppercase">
            An Unmatched Experience
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tighter mb-6">
            In the Heart of{" "}
            <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
              Miami
            </span>
          </h2>
          <p className="text-gray-300 text-lg font-extralight mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re seeking to buy, sell, or showcase your dream car — Mikalyzed Auto Boutique offers an unmatched experience for those who appreciate excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inventory"
              className="group relative bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] text-black px-10 py-4 rounded-full font-light tracking-wider hover:shadow-2xl hover:shadow-[#dffd6e]/50 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Browse Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link
              href="/reserve"
              className="group bg-transparent border-2 border-zinc-700 text-white px-10 py-4 rounded-full font-extralight tracking-wider hover:border-[#dffd6e] hover:text-[#dffd6e] transition-all duration-500"
            >
              Explore The Reserve
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
