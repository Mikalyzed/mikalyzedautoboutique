import Link from "next/link";
import FormParallaxSection from "./components/FormParallaxSection";

export default function SellPage() {
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
            Sell Your Vehicle
          </p>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tighter mb-6 animate-fade-in-up uppercase" style={{ animationDelay: '0.2s' }}>
            Cash In.{" "}
            <span className="bg-gradient-to-r from-[#dffd6e] via-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent font-light">
              Drive On.
            </span>
          </h1>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#dffd6e]/50 to-transparent mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }} />

          <p className="text-gray-400 text-lg md:text-xl font-extralight max-w-xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            A seamless, no-hassle selling process — quick, transparent, and effortless.
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

      {/* WHY SELL WITH US */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-8 uppercase">
              Why Sell With Us
            </p>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter mb-12 leading-tight">
              Your car deserves
              <br />
              <span className="text-gray-500">the right buyer.</span>
            </h2>
            <div className="space-y-8 text-gray-300 font-extralight text-lg md:text-xl leading-relaxed max-w-3xl">
              <p>
                We don&apos;t lowball. We don&apos;t waste your time. At Mikalyzed Auto Boutique, we understand the value of luxury and performance vehicles — because it&apos;s all we do.
              </p>
              <p>
                Whether you&apos;re selling a daily driver, a weekend exotic, or a collector&apos;s piece, we offer competitive quotes backed by real market knowledge and a network of serious buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      <FormParallaxSection />

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* BENEFITS */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-zinc-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#dffd6e]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              The Advantage
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight">
              What Sets Us{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Apart
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Fair Market Value */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-light tracking-tight mb-4 text-white">Fair Market Value</h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                We use real-time market data and our deep industry expertise to offer you a competitive, transparent price — no games, no hidden fees.
              </p>
            </div>

            {/* Fast Process */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '150ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-light tracking-tight mb-4 text-white">Quick Turnaround</h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                Get an offer within 24 hours. Once you accept, we handle the paperwork, payment, and pickup — on your schedule.
              </p>
            </div>

            {/* No Hassle */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '300ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-3xl font-light tracking-tight mb-4 text-white">Zero Hassle</h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                No tire kickers, no strangers at your door, no endless negotiations. We make it simple because selling your car shouldn&apos;t feel like a second job.
              </p>
            </div>

            {/* Trusted Network */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '450ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-light tracking-tight mb-4 text-white">Trusted Network</h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                Our established network of collectors, enthusiasts, and dealers means your vehicle gets exposure to the right audience — not just anyone.
              </p>
            </div>
          </div>

          <div className="text-center mt-16 scroll-reveal">
            <a
              href="#sell-form"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] text-black px-10 py-4 rounded-full font-light tracking-wider hover:shadow-2xl hover:shadow-[#dffd6e]/50 transition-all duration-500"
            >
              Submit Your Vehicle
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* HOW IT WORKS */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              How It Works
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight">
              Simple.{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Seamless.
              </span>
            </h2>
          </div>

          <div className="space-y-0">
            {/* Step 1 */}
            <div className="scroll-reveal group flex items-start gap-8 py-12 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500">
              <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-16">01</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">Submit Your Vehicle</h3>
                <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                  Fill out the form with your vehicle details — year, make, model, mileage, and condition. The more detail, the faster we can get back to you.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="scroll-reveal group flex items-start gap-8 py-12 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500" style={{ animationDelay: '150ms' }}>
              <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-16">02</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">Receive Your Offer</h3>
                <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                  Our team reviews your submission and delivers a competitive offer within 24 hours — via text or email, whichever you prefer.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="scroll-reveal group flex items-start gap-8 py-12 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500" style={{ animationDelay: '300ms' }}>
              <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-16">03</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">We Handle the Rest</h3>
                <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                  Accept the offer, and we take care of everything — paperwork, title transfer, and payment. No back and forth.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="scroll-reveal group flex items-start gap-8 py-12" style={{ animationDelay: '450ms' }}>
              <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-16">04</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">Get Paid</h3>
                <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                  Receive your payment quickly and securely. We offer same-day payment options for most transactions. It&apos;s that simple.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 scroll-reveal">
            <a
              href="#sell-form"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] text-black px-10 py-4 rounded-full font-light tracking-wider hover:shadow-2xl hover:shadow-[#dffd6e]/50 transition-all duration-500"
            >
              Submit Your Vehicle
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* FINAL CTA */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#dffd6e]/10 via-transparent to-transparent" />

        <div className="max-w-3xl mx-auto text-center relative z-10 scroll-reveal">
          <p className="text-[#dffd6e] text-xs font-light tracking-[0.4em] mb-4 uppercase">
            Questions?
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tighter mb-6">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
              Talk
            </span>
          </h2>
          <p className="text-gray-300 text-lg font-extralight mb-10 max-w-xl mx-auto leading-relaxed">
            Prefer to speak with someone directly? Give us a call or stop by our Miami facility. We&apos;re here to make this easy.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/inventory"
              className="px-8 py-3 rounded-full text-sm font-light tracking-wider border border-zinc-700 text-white hover:border-[#dffd6e] hover:text-[#dffd6e] transition-all duration-500"
            >
              Browse Inventory
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full text-sm font-light tracking-wider bg-[#dffd6e] text-black hover:shadow-lg hover:shadow-[#dffd6e]/30 transition-all duration-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
