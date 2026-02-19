import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ReserveAccessForm from "./components/ReserveAccessForm";
import StickyGallery from "./components/StickyGallery";

export const metadata: Metadata = {
  title: "The Reserve | Mikalyzed Auto Boutique",
  description: "Exclusive members-only vehicle storage facility in Miami. Climate-controlled warehouse, full bar, racing simulator, and concierge services.",
};

export default function ReservePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/lamboreserve.jpg"
          alt="The Reserve facility"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay — 70% for logo prominence */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Vignette edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)]" />

        {/* Content — constrained to 40-50% screen width on desktop */}
        <div className="relative z-10 text-center px-6 flex flex-col items-center w-full max-w-[90%] md:max-w-[50%] lg:max-w-[45%]">
          <p className="text-[#dffd6e] text-xs font-light tracking-[0.5em] animate-fade-in-up uppercase">
            Members Only
          </p>

          {/* 80-100px spacing */}
          <div className="h-20 md:h-24" />

          {/* Logo lockup */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight mb-3 animate-fade-in-up uppercase text-white whitespace-nowrap"
            style={{ fontFamily: "'TT Octosquares Trl', sans-serif", fontWeight: 700, animationDelay: '0.2s' }}
          >
            The Reserve
          </h1>

          <div className="w-full max-w-[320px] md:max-w-[460px] lg:max-w-[560px] h-[1.5px] bg-white/70 mx-auto mb-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }} />

          <p
            className="text-base md:text-lg lg:text-xl tracking-[0.45em] uppercase text-white/70 animate-fade-in-up"
            style={{ fontFamily: "'Sansation', sans-serif", fontWeight: 700, animationDelay: '0.35s' }}
          >
            By Mikalyzed
          </p>

          {/* 60-80px spacing */}
          <div className="h-16 md:h-20" />

          <p className="text-gray-300 text-lg font-extralight max-w-[600px] mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Private vehicle storage for collectors who demand discretion, security, and control.
          </p>
        </div>

        {/* Scroll indicator — 120px from paragraph */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-500 text-[10px] font-light tracking-[0.4em]">SCROLL</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <div className="mt-14">
              <a
                href="#request-access"
                className="text-[#dffd6e]/60 text-xs font-light tracking-[0.3em] uppercase hover:text-[#dffd6e] transition-colors duration-500"
              >
                Inquire &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* THE STANDARD */}
      <section className="relative py-44 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#dffd6e]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-zinc-700/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
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

          {/* Service Cards — 3x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-reveal" style={{ animationDelay: '200ms' }}>
            {/* Climate Controlled Storage */}
            <div className="group bg-zinc-900/40 backdrop-blur-sm p-10 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 hover:scale-[1.02] transition-all duration-700">
              <div className="w-12 h-12 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-7" style={{ boxShadow: '0 0 20px rgba(223,253,110,0.04)' }}>
                <svg className="w-5 h-5 text-[#dffd6e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-light tracking-tight text-white mb-3">Climate Controlled</h3>
              <p className="text-gray-500 font-extralight text-sm leading-relaxed">
                Precision-regulated temperature and humidity. Museum-grade environmental conditions, 24/7/365.
              </p>
            </div>

            {/* 24/7 Surveillance & Biometric Access */}
            <div className="group bg-zinc-900/40 backdrop-blur-sm p-10 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 hover:scale-[1.02] transition-all duration-700">
              <div className="w-12 h-12 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-7" style={{ boxShadow: '0 0 20px rgba(223,253,110,0.04)' }}>
                <svg className="w-5 h-5 text-[#dffd6e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-light tracking-tight text-white mb-3">Absolute Security</h3>
              <p className="text-gray-500 font-extralight text-sm leading-relaxed">
                Biometric access. 24/7 surveillance. Armed response protocol. Multi-layered systems for the irreplaceable.
              </p>
            </div>

            {/* Concierge Vehicle Oversight */}
            <div className="group bg-zinc-900/40 backdrop-blur-sm p-10 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 hover:scale-[1.02] transition-all duration-700">
              <div className="w-12 h-12 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-7" style={{ boxShadow: '0 0 20px rgba(223,253,110,0.04)' }}>
                <svg className="w-5 h-5 text-[#dffd6e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-light tracking-tight text-white mb-3">Concierge Oversight</h3>
              <p className="text-gray-500 font-extralight text-sm leading-relaxed">
                Dedicated management per vehicle. Detailing, charging, and readiness — executed on a single request.
              </p>
            </div>

            {/* Battery Maintenance & Start Cycles */}
            <div className="group bg-zinc-900/40 backdrop-blur-sm p-10 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 hover:scale-[1.02] transition-all duration-700">
              <div className="w-12 h-12 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-7" style={{ boxShadow: '0 0 20px rgba(223,253,110,0.04)' }}>
                <svg className="w-5 h-5 text-[#dffd6e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-light tracking-tight text-white mb-3">Battery &amp; Start Cycles</h3>
              <p className="text-gray-500 font-extralight text-sm leading-relaxed">
                Trickle charging, periodic startups, and tire rotation on a managed schedule. Your vehicle stays operational.
              </p>
            </div>

            {/* Enclosed Transport & Logistics */}
            <div className="group bg-zinc-900/40 backdrop-blur-sm p-10 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 hover:scale-[1.02] transition-all duration-700">
              <div className="w-12 h-12 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-7" style={{ boxShadow: '0 0 20px rgba(223,253,110,0.04)' }}>
                <svg className="w-5 h-5 text-[#dffd6e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-light tracking-tight text-white mb-3">Transport &amp; Logistics</h3>
              <p className="text-gray-500 font-extralight text-sm leading-relaxed">
                Enclosed transport, event delivery, and seasonal rotation — coordinated entirely by our team.
              </p>
            </div>

            {/* Discreet Private Showings */}
            <div className="group bg-zinc-900/40 backdrop-blur-sm p-10 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 hover:scale-[1.02] transition-all duration-700">
              <div className="w-12 h-12 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-7" style={{ boxShadow: '0 0 20px rgba(223,253,110,0.04)' }}>
                <svg className="w-5 h-5 text-[#dffd6e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-light tracking-tight text-white mb-3">Private Showings</h3>
              <p className="text-gray-500 font-extralight text-sm leading-relaxed">
                By-appointment viewings for qualified buyers only. No public listings. Complete confidentiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY SCROLL GALLERY */}
      <StickyGallery />

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

          {/* 5-Grid Bento Layout: 1 large featured + 4 smaller */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 scroll-reveal" style={{ animationDelay: '200ms' }}>
            {/* Featured — Private Lounge Access */}
            <div className="group bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 hover:scale-[1.02] transition-all duration-700 md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-6" style={{ boxShadow: '0 0 20px rgba(223,253,110,0.04)' }}>
                  <svg className="w-4 h-4 text-[#dffd6e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
                  </svg>
                </div>
                <h3 className="text-xl font-light tracking-tight mb-4 text-white">Private Lounge Access</h3>
                <p className="text-gray-400 font-extralight text-sm leading-relaxed mb-5">
                  Our members-only lounge is more than a waiting room — it&apos;s an extension of the lifestyle.
                </p>

                {/* Amenity list */}
                <div className="flex flex-col gap-2 mb-5">
                  {["Cigar Lounge", "Full Bar", "Racing Simulators", "Pool Tables", "Private Spa Bathrooms"].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-1 h-1 rounded-full bg-[#dffd6e]/50 shrink-0" />
                      <span className="text-gray-400 font-extralight text-xs tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="text-gray-500 font-extralight text-xs leading-relaxed">
                  A space designed for those who expect more — steps away from their collection.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-zinc-800/40">
                <span className="text-[#dffd6e]/40 text-xs font-light tracking-[0.3em] uppercase">Featured Amenity</span>
              </div>
            </div>

            {/* Curated Community */}
            <div className="group bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 hover:scale-[1.02] transition-all duration-700 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-6" style={{ boxShadow: '0 0 20px rgba(223,253,110,0.04)' }}>
                <svg className="w-4 h-4 text-[#dffd6e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-light tracking-tight mb-3 text-white">Curated Community</h3>
              <p className="text-gray-500 font-extralight text-sm leading-relaxed flex-1">
                An invitation-only network of collectors, founders, and enthusiasts who share your standard.
              </p>
            </div>

            {/* Private Event Access */}
            <div className="group bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 hover:scale-[1.02] transition-all duration-700 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-6" style={{ boxShadow: '0 0 20px rgba(223,253,110,0.04)' }}>
                <svg className="w-4 h-4 text-[#dffd6e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-light tracking-tight mb-3 text-white">Private Event Access</h3>
              <p className="text-gray-500 font-extralight text-sm leading-relaxed flex-1">
                Exclusive gatherings, unveilings, curated drives, and experiences reserved strictly for members.
              </p>
            </div>

            {/* Asset Advisory */}
            <div className="group bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 hover:scale-[1.02] transition-all duration-700 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-6" style={{ boxShadow: '0 0 20px rgba(223,253,110,0.04)' }}>
                <svg className="w-4 h-4 text-[#dffd6e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-light tracking-tight mb-3 text-white">Asset Advisory</h3>
              <p className="text-gray-500 font-extralight text-sm leading-relaxed flex-1">
                Strategic guidance on acquisitions, market positioning, and maximizing the value of your collection.
              </p>
            </div>

            {/* White-Glove Service */}
            <div className="group bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 hover:scale-[1.02] transition-all duration-700 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-6" style={{ boxShadow: '0 0 20px rgba(223,253,110,0.04)' }}>
                <svg className="w-4 h-4 text-[#dffd6e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-light tracking-tight mb-3 text-white">White-Glove Service</h3>
              <p className="text-gray-500 font-extralight text-sm leading-relaxed flex-1">
                From arrival to departure — every detail is handled with precision, discretion, and zero friction.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <a
              href="#request-access"
              className="text-[#dffd6e]/60 text-xs font-light tracking-[0.3em] uppercase hover:text-[#dffd6e] transition-colors duration-500"
            >
              Inquire About Membership &rarr;
            </a>
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
      <section id="request-access" className="relative py-32 px-6 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 overflow-hidden">
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
