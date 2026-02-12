"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Buy Car",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement form submission logic (e.g., send to API endpoint)
    console.log("Form submitted:", formData);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your message! We'll be in touch soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "Buy Car",
        message: "",
      });
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/30 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/40 hover:border-[#dffd6e]/30 transition-all duration-700 scroll-reveal shadow-2xl"
      style={{ animationDelay: "200ms" }}
    >
      {/* Name & Email Row */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
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

        <div>
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
      </div>

      {/* Phone & Service Row */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
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

        <div>
          <label
            htmlFor="service"
            className="block text-xs font-light tracking-wider text-gray-400 mb-2"
          >
            Service
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#dffd6e] transition font-light cursor-pointer"
          >
            <option value="Buy Car">Buy a Car</option>
            <option value="Sell Car">Sell Your Car</option>
            <option value="Storage">Secure Storage</option>
          </select>
        </div>
      </div>

      {/* Message Textarea */}
      <div className="mb-6">
        <label
          htmlFor="message"
          className="block text-xs font-light tracking-wider text-gray-400 mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={3}
          className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light resize-none"
          placeholder="Tell us about your needs..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#dffd6e] text-black font-normal tracking-wide py-3.5 rounded-lg hover:bg-[#dffd6e]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
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
            Sending...
          </>
        ) : (
          <>
            Send Message
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
