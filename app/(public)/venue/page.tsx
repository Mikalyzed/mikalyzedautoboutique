import type { Metadata } from "next";
import Image from "next/image";
import VenueInquiryForm from "./components/VenueInquiryForm";

export const metadata: Metadata = {
  title: "Private Event Venue | Mikalyzed",
  description:
    "A 15,000 sq ft luxury industrial event space in Miami — transformable for weddings, corporate events, brand activations, art shows, fashion productions, and more.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function VenuePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/showroom.jpg"
          alt="Mikalyzed showroom interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)]" />

        <div className="relative z-10 text-center px-6 flex flex-col items-center w-full max-w-[90%] md:max-w-[70%]">
          <p className="text-[#dffd6e] text-xs font-light tracking-[0.5em] uppercase">
            15,000 SQ FT &middot; Miami
          </p>

          <div className="h-20 md:h-24" />

          <h1
            className="text-4xl md:text-6xl lg:text-7xl tracking-tight mb-3 uppercase text-white"
            style={{ fontFamily: "'TT Octosquares Trl', sans-serif", fontWeight: 700 }}
          >
            A Luxury Industrial
            <br />
            Event Space
          </h1>

          <div className="w-full max-w-[320px] md:max-w-[460px] lg:max-w-[560px] h-[1.5px] bg-white/70 mx-auto mb-3" />

          <p
            className="text-base md:text-lg lg:text-xl tracking-[0.45em] uppercase text-white/70"
            style={{ fontFamily: "'Sansation', sans-serif", fontWeight: 700 }}
          >
            By Mikalyzed
          </p>

          <div className="h-16 md:h-20" />

          <p className="text-gray-300 text-lg font-extralight max-w-[720px] mx-auto leading-relaxed">
            Our venue can be fully transformed into an open 15,000 sq ft event space for private events, corporate activations, weddings, brand launches, art shows, dinners, networking events, and more.
          </p>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* INTRODUCTION */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-8 uppercase">
            An Elevated Blank Canvas
          </p>
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter mb-12 leading-tight">
            Built to transform
            <br />
            <span className="text-gray-500">into yours.</span>
          </h2>
          <div className="space-y-8 text-gray-300 font-extralight text-lg md:text-xl leading-relaxed max-w-3xl">
            <p>
              Mikalyzed is a 15,000 sq ft luxury industrial venue in Miami — designed from the ground up for events that demand atmosphere, flexibility, and presence.
            </p>
            <p>
              High ceilings, climate control, and an open floor plan let you reshape the space completely. Bring in your own staging, vendors, and vision — or let our team coordinate every detail with you.
            </p>
          </div>

          <div className="mt-14">
            <a
              href="#venue-inquiry"
              className="text-[#dffd6e]/60 text-xs font-light tracking-[0.3em] uppercase hover:text-[#dffd6e] transition-colors duration-500"
            >
              Inquire &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* THE SPACE */}
      <section className="relative py-44 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#dffd6e]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-zinc-700/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              The Space
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight">
              Built for{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Anything
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Luxury Industrial Aesthetic",
                body: "Polished concrete, exposed steel, and warm lighting create a backdrop that photographs beautifully and reads upscale in any configuration.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 21V7l8-4 8 4v14M9 21V12h6v9" />
                ),
              },
              {
                title: "Climate-Controlled Interior",
                body: "Year-round climate and lighting control. The space feels intentional in any season — no compromises on guest comfort or brand presentation.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                ),
              },
              {
                title: "15,000 SQ FT Flexible Floor",
                body: "Open floor plan supports seated dinners, standing receptions, panel stages, runways, and step-and-repeat backdrops — reconfigurable to your run-of-show.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                ),
              },
              {
                title: "High Ceilings & Open Sightlines",
                body: "Soaring ceilings and uninterrupted floor space let you build big — large-format installations, hanging décor, dramatic lighting rigs.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4v16M21 4v16M3 4h18M3 20h18M7 8l5-4 5 4" />
                ),
              },
              {
                title: "Private & Secure",
                body: "Controlled access, dedicated parking, and on-site security. Your guests, your IP, and your VIPs are handled with complete discretion.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
              },
              {
                title: "Production-Ready",
                body: "Power, AV-friendly load-in, vendor access, and clean sightlines for photo and video crews. We coordinate directly with your production partners to keep set-up frictionless.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group bg-zinc-900/40 backdrop-blur-sm p-10 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 hover:scale-[1.02] transition-all duration-700"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-7"
                  style={{ boxShadow: "0 0 20px rgba(223,253,110,0.04)" }}
                >
                  <svg className="w-5 h-5 text-[#dffd6e]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-light tracking-tight text-white mb-3">{card.title}</h3>
                <p className="text-gray-500 font-extralight text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* GALLERY */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#dffd6e]/[0.04] rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              Inside The Warehouse
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight">
              See the{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Space
              </span>
            </h2>
          </div>

          {/* 2 columns × 4 rows = 8 wide-angle shots, full image, no crop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { src: "/gallery/P1901185.jpg", alt: "Warehouse interior" },
              { src: "/gallery/P1900928.jpg", alt: "Warehouse interior" },
              { src: "/gallery/P1900950.jpg", alt: "Upstairs lounge area" },
              { src: "/gallery/P1901157.jpg", alt: "Showroom floor" },
              { src: "/gallery/P1901200.jpg", alt: "Vehicle staging" },
              { src: "/gallery/P1901037.jpg", alt: "Warehouse perspective" },
              { src: "/gallery/P1900984.jpg", alt: "Showroom lighting" },
              { src: "/gallery/P1900900.jpg", alt: "Facility entrance" },
            ].map((img) => (
              <div
                key={img.src}
                className="relative overflow-hidden rounded-xl border border-zinc-800/40 hover:border-[#dffd6e]/30 transition-all duration-700 group aspect-video"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 font-extralight text-sm mt-12 max-w-xl mx-auto">
            Photographs are a starting point. Schedule a walkthrough to see the space in person.
          </p>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* PERFECT FOR */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              Perfect For
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter mb-8 leading-tight">
              Events of{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                All Types
              </span>
            </h2>
            <p className="text-gray-400 text-lg font-extralight max-w-2xl mx-auto leading-relaxed">
              Our space adapts to virtually any concept. Here&apos;s a sample of what we host.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              {
                title: "Corporate Events",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />,
              },
              {
                title: "Brand Activations",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />,
              },
              {
                title: "Weddings & Receptions",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
              },
              {
                title: "Private Parties",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
              },
              {
                title: "Art Exhibitions",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
              },
              {
                title: "Fashion Shows",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />,
              },
              {
                title: "Content Productions",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />,
              },
              {
                title: "Networking Mixers",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
              },
              {
                title: "Pop-Ups & Launches",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
              },
              {
                title: "Luxury Dinners",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21h8M12 21V13M6 3v10a4 4 0 004 4h0M18 3v10a4 4 0 01-4 4h0" />,
              },
              {
                title: "Podcasts & Live Panels",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />,
              },
              {
                title: "Charity Events",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group bg-zinc-900/40 backdrop-blur-sm p-6 rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/30 hover:scale-[1.03] transition-all duration-500 flex flex-col items-center text-center"
              >
                <div
                  className="w-11 h-11 rounded-xl bg-[#dffd6e]/5 border border-[#dffd6e]/10 flex items-center justify-center mb-4"
                  style={{ boxShadow: "0 0 20px rgba(223,253,110,0.04)" }}
                >
                  <svg className="w-5 h-5 text-[#dffd6e]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="text-sm md:text-base font-light tracking-tight text-white">{card.title}</h3>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 font-extralight text-sm mt-12 max-w-2xl mx-auto">
            Don&apos;t see your event type? We&apos;re open to custom concepts. Reach out and tell us what you have in mind.
          </p>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* VENUE FEATURES */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#dffd6e]/[0.04] rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              Venue Features
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter mb-8 leading-tight">
              Built for{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Logistics
              </span>
            </h2>
            <p className="text-gray-400 text-lg font-extralight max-w-2xl mx-auto leading-relaxed">
              Everything you need to plan with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 auto-rows-fr">
            {[
              "15,000 sq ft customizable floor plan",
              "Climate-controlled indoor venue",
              "Luxury industrial aesthetic",
              "High ceilings",
              "Flexible layouts",
              "Vendor-friendly setup",
              "Staging, bars & lounge configurations",
              "Private parking options",
              "Content / photo / video friendly",
              "Centrally located in Miami",
              "Indoor, rain-safe venue",
              "Custom event configurations available",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="shrink-0 w-5 h-5 rounded-full bg-[#dffd6e]/10 border border-[#dffd6e]/30 flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300 font-extralight text-base leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* PROCESS */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              How It Works
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight">
              From Inquiry to{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Event
              </span>
            </h2>
          </div>

          <div className="space-y-0">
            {[
              {
                num: "01",
                title: "Submit an Inquiry",
                body: "Share your event date, format, and goals. We respond within one business day with availability and a tailored walkthrough.",
              },
              {
                num: "02",
                title: "Private Walkthrough",
                body: "Visit the space in person or virtually. We'll discuss layout, staging, vehicle positioning, and any production needs your team has.",
              },
              {
                num: "03",
                title: "Custom Proposal",
                body: "We build a proposal around your event — pricing, inclusions, vehicle staging, and any partner coordination. Transparent and detailed.",
              },
              {
                num: "04",
                title: "Event Day",
                body: "Our team manages the venue, vehicles, and access. You focus on your guests and your moment.",
              },
            ].map((step, i, arr) => (
              <div
                key={step.num}
                className={`group flex items-start gap-8 py-12 transition-colors duration-500 ${
                  i < arr.length - 1 ? "border-b border-zinc-800/50 hover:border-[#dffd6e]/20" : ""
                }`}
              >
                <span className="text-[#dffd6e] text-4xl font-extralight tracking-tight shrink-0 w-16">{step.num}</span>
                <div>
                  <h3 className="text-2xl font-light tracking-tight mb-3 text-white group-hover:text-[#dffd6e] transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 font-extralight text-lg leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* INQUIRY FORM */}
      <section id="venue-inquiry" className="relative py-32 px-6 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-zinc-700/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
                Request Information
              </p>
              <h2 className="text-5xl md:text-6xl font-extralight tracking-tighter mb-10 leading-tight">
                Let&apos;s Build
                <br />
                <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                  Something Memorable.
                </span>
              </h2>
              <div className="space-y-6 text-gray-300 font-extralight text-lg leading-relaxed">
                <p>
                  Every event we host is built around the client. Share a few details and a member of our team will follow up with availability, pricing, and a proposal tailored to your concept.
                </p>
                <p className="text-gray-500">
                  Booking lead times vary by event size and season. We recommend reaching out at least four weeks in advance.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#dffd6e]" />
                  <span className="text-gray-400 text-sm font-light">By appointment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#dffd6e]" />
                  <span className="text-gray-400 text-sm font-light">Custom proposals</span>
                </div>
              </div>
            </div>

            <VenueInquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
