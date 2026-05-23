"use client";

import { useState, useRef } from "react";
import SMSConsent from "@/app/components/SMSConsent";

const EVENT_TYPES = [
  "Product Launch",
  "Brand Activation",
  "Corporate Meeting / Offsite",
  "Executive Dinner / Reception",
  "Photo / Film Shoot",
  "Other",
];

export default function VenueInquiryForm() {
  const formLoadedAt = useRef(Date.now());
  const [honeypot, setHoneypot] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const summary = [
        formData.company ? `Company: ${formData.company}` : "",
        formData.eventType ? `Event type: ${formData.eventType}` : "",
        formData.eventDate ? `Preferred date: ${formData.eventDate}` : "",
        formData.guestCount ? `Guest count: ${formData.guestCount}` : "",
        formData.message ? `Notes: ${formData.message}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          formType: "venue",
          message: summary,
          company: formData.company,
          eventType: formData.eventType,
          eventDate: formData.eventDate,
          guestCount: formData.guestCount,
          venueMessage: formData.message,
          source: "venue-page",
          _hp: honeypot,
          _ts: formLoadedAt.current,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== "undefined" && (window as { fbq?: (...args: unknown[]) => void }).fbq) {
          (window as { fbq: (...args: unknown[]) => void }).fbq("track", "Lead");
        }
        if (typeof window !== "undefined" && (window as { gtag?: (...args: unknown[]) => void }).gtag) {
          (window as { gtag: (...args: unknown[]) => void }).gtag("event", "venue_form_submit", {
            event_category: "lead",
            event_label: "venue",
            value: 1,
          });
        }
      }
    } catch (error) {
      console.error("Venue inquiry submit failed:", error);
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="bg-zinc-900/30 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/40 shadow-2xl flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-[#dffd6e]/10 border border-[#dffd6e]/30 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#dffd6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-light text-white mb-2">Inquiry Received</h3>
        <p className="text-gray-400 font-extralight text-sm max-w-sm">
          Thank you for considering Mikalyzed as your venue. A member of our team will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/30 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/40 hover:border-[#dffd6e]/30 transition-all duration-700 shadow-2xl"
    >
      <input
        type="text"
        name="_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
      />

      <p className="text-white text-lg font-light tracking-tight mb-1">Request Venue Information</p>
      <p className="text-gray-500 text-sm font-extralight mb-6">Tell us about your event and we&apos;ll follow up with details.</p>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label htmlFor="venue-firstName" className="block text-xs font-light tracking-wider text-gray-400 mb-2">First Name</label>
          <input
            type="text"
            id="venue-firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
            placeholder="First name"
          />
        </div>
        <div>
          <label htmlFor="venue-lastName" className="block text-xs font-light tracking-wider text-gray-400 mb-2">Last Name</label>
          <input
            type="text"
            id="venue-lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
            placeholder="Last name"
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="venue-company" className="block text-xs font-light tracking-wider text-gray-400 mb-2">Company / Organization</label>
        <input
          type="text"
          id="venue-company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
          placeholder="Acme Inc."
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label htmlFor="venue-email" className="block text-xs font-light tracking-wider text-gray-400 mb-2">Email</label>
          <input
            type="email"
            id="venue-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="venue-phone" className="block text-xs font-light tracking-wider text-gray-400 mb-2">Phone</label>
          <input
            type="tel"
            id="venue-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="venue-eventType" className="block text-xs font-light tracking-wider text-gray-400 mb-2">Event Type</label>
        <select
          id="venue-eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          required
          className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#dffd6e] transition font-light cursor-pointer"
        >
          <option value="" disabled>Select event type</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label htmlFor="venue-eventDate" className="block text-xs font-light tracking-wider text-gray-400 mb-2">Preferred Date</label>
          <input
            type="date"
            id="venue-eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
          />
        </div>
        <div>
          <label htmlFor="venue-guestCount" className="block text-xs font-light tracking-wider text-gray-400 mb-2">Estimated Guests</label>
          <input
            type="number"
            id="venue-guestCount"
            name="guestCount"
            min="1"
            value={formData.guestCount}
            onChange={handleChange}
            className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
            placeholder="e.g. 75"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="venue-message" className="block text-xs font-light tracking-wider text-gray-400 mb-2">Tell Us About Your Event</label>
        <textarea
          id="venue-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light resize-none"
          placeholder="Format, AV needs, branding requirements, vehicle-staging requests, etc."
        />
      </div>

      <div className="mb-6">
        <SMSConsent checked={smsConsent} onChange={setSmsConsent} id="venue-sms-consent" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#dffd6e] text-black font-normal tracking-wide py-3.5 rounded-lg hover:bg-[#dffd6e]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </>
        ) : (
          <>
            Submit Inquiry
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>

      <p className="text-gray-600 text-xs font-extralight mt-4 text-center">
        Your information is kept strictly confidential.
      </p>
    </form>
  );
}
