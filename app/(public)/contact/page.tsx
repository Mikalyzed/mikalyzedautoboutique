import Link from "next/link";
import ContactForm from "@/app/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* CONTACT INFO + FORM */}
      <section className="relative pt-32 pb-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-zinc-700/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            {/* Left — Contact Details */}
            <div className="scroll-reveal">
              <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-8 uppercase">
                Contact Information
              </p>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter mb-12 leading-tight">
                We&apos;d love to
                <br />
                <span className="text-gray-500">hear from you.</span>
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-light text-lg mb-1">Visit Us</h3>
                    <p className="text-gray-400 font-extralight leading-relaxed">
                      3455 NW 30th Ave
                      <br />
                      Miami, FL 33142
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-light text-lg mb-1">Call Us</h3>
                    <a href="tel:3057202533" className="text-gray-400 font-extralight hover:text-[#dffd6e] transition">
                      (305) 720-2533
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-light text-lg mb-1">Email Us</h3>
                    <a href="mailto:info@mikalyzedautoboutique.com" className="text-gray-400 font-extralight hover:text-[#dffd6e] transition">
                      info@mikalyzedautoboutique.com
                    </a>
                  </div>
                </div>

                {/* Social */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-2xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-light text-lg mb-1">Follow Us</h3>
                    <div className="flex gap-4 mt-2">
                      <a href="https://www.facebook.com/p/Mikalyzed-Auto-Boutique-61559979093260/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-[#dffd6e] hover:border-[#dffd6e] transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                      <a href="https://www.instagram.com/mikalyzed_autoboutique/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-[#dffd6e] hover:border-[#dffd6e] transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </a>
                      <a href="https://www.tiktok.com/@mikalyzed_autoboutique" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-[#dffd6e] hover:border-[#dffd6e] transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46v-7.15a8.16 8.16 0 005.58 2.17v-3.45a4.85 4.85 0 01-2-.54z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form (sticky so it stays aligned) */}
            <div className="md:sticky md:top-24 scroll-reveal" style={{ animationDelay: '200ms' }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#dffd6e]/30 to-transparent" />

      {/* MAP / HOURS SECTION */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-zinc-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#dffd6e]/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              Visit The Boutique
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight">
              Find{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Us
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800/30 rounded-3xl overflow-hidden scroll-reveal" style={{ animationDelay: '200ms' }}>
            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">Location</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">Miami, FL</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                3455 NW 30th Ave, Miami FL 33142. Minutes from Miami International Airport with easy highway access.
              </p>
            </div>

            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">Hours</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">By Appointment</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                We operate by appointment to give each client our full attention. Call or email to schedule your private visit.
              </p>
            </div>

            <div className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500">
              <span className="text-[#dffd6e] text-xs font-light tracking-[0.3em] uppercase block mb-6">Response Time</span>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white">Within 24 Hours</h3>
              <p className="text-gray-500 font-extralight leading-relaxed">
                Every inquiry is handled personally. We respond to all messages within 24 hours — usually much sooner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* FAQ SECTION */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              Common Questions
            </p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight">
              Frequently{" "}
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Asked
              </span>
            </h2>
          </div>

          <div className="space-y-0">
            <div className="scroll-reveal group py-10 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500">
              <h3 className="text-xl font-light tracking-tight mb-4 text-white group-hover:text-[#dffd6e] transition-colors duration-500">
                Do I need an appointment to visit?
              </h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                Yes. We operate by appointment only to ensure every client gets a private, dedicated experience. Call us at (305) 720-2533 or email to schedule your visit.
              </p>
            </div>

            <div className="scroll-reveal group py-10 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white group-hover:text-[#dffd6e] transition-colors duration-500">
                Do you offer financing?
              </h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                We work with several preferred lending partners to help you secure competitive financing. Contact us to discuss your options.
              </p>
            </div>

            <div className="scroll-reveal group py-10 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500" style={{ animationDelay: '200ms' }}>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white group-hover:text-[#dffd6e] transition-colors duration-500">
                Can you ship a vehicle out of state?
              </h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                Absolutely. We arrange enclosed transport nationwide and internationally. Every delivery is handled with white-glove care.
              </p>
            </div>

            <div className="scroll-reveal group py-10 border-b border-zinc-800/50 hover:border-[#dffd6e]/20 transition-colors duration-500" style={{ animationDelay: '300ms' }}>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white group-hover:text-[#dffd6e] transition-colors duration-500">
                How do I sell my car to you?
              </h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                Head to our <a href="/sell" className="text-[#dffd6e] hover:underline">Sell Your Car</a> page and submit your vehicle details. We&apos;ll get back to you with a competitive offer within 24 hours.
              </p>
            </div>

            <div className="scroll-reveal group py-10" style={{ animationDelay: '400ms' }}>
              <h3 className="text-xl font-light tracking-tight mb-4 text-white group-hover:text-[#dffd6e] transition-colors duration-500">
                What is The Reserve?
              </h3>
              <p className="text-gray-400 font-extralight text-lg leading-relaxed">
                The Reserve is our private, climate-controlled vehicle storage facility. It&apos;s designed for collectors and enthusiasts who want museum-level care for their vehicles. <a href="/reserve" className="text-[#dffd6e] hover:underline">Learn more here</a>.
              </p>
            </div>
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
            Ready to Start?
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tighter mb-6">
            The Experience{" "}
            <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
              Awaits
            </span>
          </h2>
          <p className="text-gray-300 text-lg font-extralight mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re looking to add to your collection, part ways with a vehicle, or find the perfect home for your cars — we&apos;re one call away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:3057202533"
              className="group relative bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] text-black px-10 py-4 rounded-full font-light tracking-wider hover:shadow-2xl hover:shadow-[#dffd6e]/50 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Call (305) 720-2533</span>
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
