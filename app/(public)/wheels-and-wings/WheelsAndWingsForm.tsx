"use client";

import { useState } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/mikalyzed_autoboutique/";

export default function WheelsAndWingsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          formType: "event",
          message: "Columbus Wheels & Wings 2026",
          source: "wheels-and-wings",
        }),
      });

      if (res.ok) {
        if (
          typeof window !== "undefined" &&
          (window as { fbq?: (...args: unknown[]) => void }).fbq
        ) {
          (window as { fbq: (...args: unknown[]) => void }).fbq(
            "track",
            "Contact"
          );
        }
        if (
          typeof window !== "undefined" &&
          (window as { gtag?: (...args: unknown[]) => void }).gtag
        ) {
          (window as { gtag: (...args: unknown[]) => void }).gtag(
            "event",
            "conversion_event_contact_1"
          );
        }

        window.location.href = INSTAGRAM_URL;
      }
    } catch (error) {
      console.error("Form submit failed:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/30 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/40 hover:border-[#dffd6e]/30 transition-all duration-700 shadow-2xl w-full max-w-md mx-auto"
    >
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block text-xs font-light tracking-wider text-gray-400 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
          placeholder="Your name"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block text-xs font-light tracking-wider text-gray-400 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
          placeholder="your@email.com"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="phone"
          className="block text-xs font-light tracking-wider text-gray-400 mb-2"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
          placeholder="(555) 123-4567"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#dffd6e] text-black font-normal tracking-wide py-3.5 rounded-lg hover:bg-[#dffd6e]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Submitting...
          </>
        ) : (
          <>
            Connect With Us
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
