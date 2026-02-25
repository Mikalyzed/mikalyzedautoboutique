"use client";

import { useState } from "react";

interface ReservePanelProps {
  open: boolean;
  onClose: () => void;
  vehicleName: string;
  vehicleVin: string;
}

export default function ReservePanel({ open, onClose, vehicleName, vehicleVin }: ReservePanelProps) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", financing: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          vehicleVin,
          formType: "reserve",
          financing: form.financing,
          message: `Reservation request for ${vehicleName}${form.financing ? " — Interested in financing" : ""}`,
          source: "vehicle-detail",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== "undefined") {
          (window as { fbq?: (...args: unknown[]) => void }).fbq?.("track", "Contact");
          (window as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "conversion_event_contact_1");
        }
      }
    } catch (error) {
      console.error("Reserve submit failed:", error);
    }
    setSubmitting(false);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-zinc-950 border-l border-zinc-800/50 z-50 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
            <h2
              className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white whitespace-nowrap"
              style={{ fontFamily: "'TT Octosquares Trl', sans-serif" }}
            >
              Reserve Your Car Today
            </h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition p-1"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitted ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#dffd6e]/10 border border-[#dffd6e]/30 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#dffd6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-2">Reservation Submitted</h3>
              <p className="text-zinc-400 font-light text-sm mb-6">
                Our team will reach out to finalize your reservation for the {vehicleName}.
              </p>
              <button
                onClick={onClose}
                className="bg-[#dffd6e] text-black px-8 py-3 rounded-lg font-light tracking-wider hover:bg-[#dffd6e]/90 transition"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="flex-1 p-6">
              <p className="text-white text-lg font-semibold mb-1">
                {vehicleName}
              </p>
              <p className="text-zinc-400 font-light text-sm mb-6">
                Enter your contact details, and our team will reach out to finalize your vehicle reservation.
              </p>

              <div className="h-px bg-zinc-800/50 mb-6" />

              <h3 className="text-[#dffd6e] text-lg font-light mb-4">Contact Information</h3>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#dffd6e] transition font-light"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#dffd6e] transition font-light"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#dffd6e] transition font-light"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#dffd6e] transition font-light"
                />

                <div className="py-2">
                  <p className="text-zinc-400 text-sm font-light mb-2">Looking to finance?</p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, financing: true }))}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-light border transition ${
                        form.financing
                          ? "bg-[#dffd6e]/10 border-[#dffd6e] text-[#dffd6e]"
                          : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, financing: false }))}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-light border transition ${
                        !form.financing
                          ? "bg-[#dffd6e]/10 border-[#dffd6e] text-[#dffd6e]"
                          : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-zinc-800 border border-zinc-600 text-white py-3.5 rounded-lg font-light tracking-widest uppercase transition hover:border-[#dffd6e] hover:text-[#dffd6e] hover:shadow-md hover:shadow-[#dffd6e]/10 disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </form>

              <div className="h-px bg-zinc-800/50 mt-6 mb-6" />

              <h3 className="text-[#dffd6e] text-lg font-light mb-3">Services</h3>
              <div className="space-y-2 text-zinc-400 text-sm font-light">
                <a href="/sell" className="block hover:text-white transition">Sell Your Car</a>
                <a href="/inventory" className="block hover:text-white transition">Inventory</a>
                <a href="/reserve" className="block hover:text-white transition">The Reserve</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
