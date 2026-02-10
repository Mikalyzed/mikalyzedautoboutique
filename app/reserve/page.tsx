import Link from "next/link";
import ReserveAccessForm from "./components/ReserveAccessForm";

export default function ReservePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Layered dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

        {/* Subtle ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#dffd6e]/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <p className="text-[#dffd6e] text-xs font-light tracking-[0.5em] mb-8 animate-fade-in-up uppercase">
            Members Only
          </p>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tighter mb-6 animate-fade-in-up uppercase" style={{ animationDelay: '0.2s' }}>
            The{" "}
            <span className="bg-gradient-to-r from-[#dffd6e] via-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent font-light">
              Reserve
            </span>
          </h1>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#dffd6e]/50 to-transparent mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }} />

          <p className="text-gray-400 text-lg md:text-xl font-extralight max-w-xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Private vehicle storage for those who demand absolute discretion, security, and care for their collection.
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

      {/* INTRODUCTION */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-8 uppercase">
              A Different Standard
            </p>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter mb-12 leading-tight">
              Not every vehicle belongs here.
              <br />
              <span className="text-gray-500">That&apos;s the point.</span>
            </h2>
            <div className="space-y-8 text-gray-300 font-extralight text-lg md:text-xl leading-relaxed max-w-3xl">
              <p>
                The Reserve is a private, invitation-based storage facility built for collectors, enthusiasts, and individuals who refuse to compromise on how their vehicles are kept.
              </p>
              <p>
                This is not a parking garage. It&apos;s a controlled environment where every detail — temperature, humidity, security, access — is managed with the same precision you&apos;d expect from a world-class institution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* THE PILLARS */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        {/* Decorative blur */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-zinc-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#dffd6e]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              The Standard
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight">
              Built on{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Principle
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Climate Control */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-3xl font-light tracking-tight mb-4 text-white">Climate Controlled</h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                Constant temperature and humidity regulation. Your vehicle is preserved in the same conditions a museum would demand — because anything less isn&apos;t good enough.
              </p>
            </div>

            {/* Security */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '150ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-3xl font-light tracking-tight mb-4 text-white">Absolute Security</h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                24/7 surveillance, biometric access control, and armed response. Your collection is protected by systems designed for the irreplaceable.
              </p>
            </div>

            {/* Concierge */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '300ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-3xl font-light tracking-tight mb-4 text-white">Concierge Service</h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                Need your vehicle detailed, charged, warmed up, or delivered? A single call is all it takes. We handle the rest with the discretion you expect.
              </p>
            </div>

            {/* Privacy */}
            <div className="group scroll-reveal bg-zinc-900/50 backdrop-blur-sm p-12 rounded-3xl border border-zinc-800/50 hover:border-[#dffd6e]/30 transition-all duration-700 hover:-translate-y-2" style={{ animationDelay: '450ms' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </div>
              <h3 className="text-3xl font-light tracking-tight mb-4 text-white">Total Privacy</h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                What you store here stays here. No public listings, no foot traffic, no questions. Your collection is your business — we simply protect it.
              </p>
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
              More Than Storage.
              <br />
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                A Membership.
              </span>
            </h2>
            <p className="text-gray-400 text-lg font-extralight max-w-2xl mx-auto leading-relaxed">
              Reserve members don&apos;t just store vehicles. They gain access to an ecosystem designed around the ownership experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800/30 rounded-3xl overflow-hidden scroll-reveal" style={{ animationDelay: '200ms' }}>
            {/* Item 1 */}
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">01</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">Private Lounge Access</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                A members-only space to relax, work, or host guests — adjacent to your collection.
              </p>
            </div>

            {/* Item 2 */}
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">02</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">On-Demand Detailing</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                Professional detailing services available on your schedule. Your vehicle is always ready.
              </p>
            </div>

            {/* Item 3 */}
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">03</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">Vehicle Logistics</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                Enclosed transport, event delivery, and seasonal rotation — coordinated entirely by our team.
              </p>
            </div>

            {/* Item 4 */}
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">04</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">Battery &amp; Start Programs</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                Trickle charging, periodic startups, and tire rotation schedules — so your vehicle stays alive.
              </p>
            </div>

            {/* Item 5 */}
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">05</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">Insurance Coordination</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                We work directly with specialty insurers to ensure your coverage reflects the value of your collection.
              </p>
            </div>

            {/* Item 6 */}
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">06</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">Private Showings</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                Considering selling? We arrange discreet, by-appointment showings to qualified buyers only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* THE PROCESS */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              The Process
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight">
              How to{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Join
              </span>
            </h2>
          </div>

          <div className="space-y-0">
            {/* Step 1 */}
            <div className="scroll-reveal group flex items-start gap-8 py-12 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500">
              <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-16">01</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">Request Access</h3>
                <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                  Submit your interest through our private inquiry form. Tell us about yourself and your collection.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="scroll-reveal group flex items-start gap-8 py-12 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500" style={{ animationDelay: '150ms' }}>
              <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-16">02</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">Private Consultation</h3>
                <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                  A member of our team will reach out to discuss your needs, walk you through the facility, and answer any questions — on your terms.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="scroll-reveal group flex items-start gap-8 py-12 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500" style={{ animationDelay: '300ms' }}>
              <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-16">03</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">Membership Approval</h3>
                <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                  Spaces are intentionally limited. Once approved, your dedicated bay is prepared and your concierge team is assigned.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="scroll-reveal group flex items-start gap-8 py-12" style={{ animationDelay: '450ms' }}>
              <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-16">04</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">Welcome to The Reserve</h3>
                <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                  Your vehicle is received, documented, and placed under our care. From here, everything is handled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* REQUEST ACCESS */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-zinc-700/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="scroll-reveal">
              <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
                Apply for Membership
              </p>
              <h2 className="text-5xl md:text-6xl font-extralight tracking-tighter mb-10 leading-tight">
                Ready to
                <br />
                <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                  Reserve?
                </span>
              </h2>
              <div className="space-y-6 text-gray-300 font-extralight text-lg leading-relaxed">
                <p>
                  Membership is by application only. We review every inquiry personally to ensure The Reserve remains what it was built to be — a place of trust, discretion, and uncompromising care.
                </p>
                <p className="text-gray-500">
                  Availability is limited. Current wait times vary by vehicle type and bay configuration.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#dffd6e]" />
                  <span className="text-gray-400 text-sm font-light">Invitation-based</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#dffd6e]" />
                  <span className="text-gray-400 text-sm font-light">Limited availability</span>
                </div>
              </div>
            </div>

            <ReserveAccessForm />
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
            Your Collection Deserves This
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tighter mb-6">
            Protect What{" "}
            <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
              Matters
            </span>
          </h2>
          <p className="text-gray-300 text-lg font-extralight mb-10 max-w-xl mx-auto leading-relaxed">
            The Reserve exists for those who understand that some things can&apos;t be replaced. If that resonates, we should talk.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#request-access"
              className="group relative bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] text-black px-10 py-4 rounded-full font-light tracking-wider hover:shadow-2xl hover:shadow-[#dffd6e]/50 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Request Access</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
            <Link
              href="/inventory"
              className="group bg-transparent border-2 border-zinc-700 text-white px-10 py-4 rounded-full font-extralight tracking-wider hover:border-[#dffd6e] hover:text-[#dffd6e] transition-all duration-500"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
