"use client";

import { useState } from "react";

export default function ReserveAccessForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicles: "",
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

    // TODO: Implement form submission logic
    console.log("Reserve access request:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your inquiry. A member of our team will be in touch shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        vehicles: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <form
      id="request-access"
      onSubmit={handleSubmit}
      className="bg-zinc-900/30 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/40 hover:border-[#dffd6e]/30 transition-all duration-700 scroll-reveal shadow-2xl"
      style={{ animationDelay: "200ms" }}
    >
      <p className="text-white text-lg font-light tracking-tight mb-1">Request Access</p>
      <p className="text-gray-500 text-sm font-extralight mb-6">All inquiries are handled with complete discretion.</p>

      {/* Name & Email Row */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="reserve-name"
            className="block text-xs font-light tracking-wider text-gray-400 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="reserve-name"
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
            htmlFor="reserve-email"
            className="block text-xs font-light tracking-wider text-gray-400 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="reserve-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
            placeholder="your@email.com"
          />
        </div>
      </div>

      {/* Phone & Vehicle Count */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="reserve-phone"
            className="block text-xs font-light tracking-wider text-gray-400 mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="reserve-phone"
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
            htmlFor="reserve-vehicles"
            className="block text-xs font-light tracking-wider text-gray-400 mb-2"
          >
            Vehicles to Store
          </label>
          <select
            id="reserve-vehicles"
            name="vehicles"
            value={formData.vehicles}
            onChange={handleChange}
            required
            className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#dffd6e] transition font-light cursor-pointer"
          >
            <option value="" disabled>Select</option>
            <option value="1">1 Vehicle</option>
            <option value="2-3">2 - 3 Vehicles</option>
            <option value="4-6">4 - 6 Vehicles</option>
            <option value="7+">7+ Vehicles</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label
          htmlFor="reserve-message"
          className="block text-xs font-light tracking-wider text-gray-400 mb-2"
        >
          Tell Us About Your Collection
        </label>
        <textarea
          id="reserve-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light resize-none"
          placeholder="Vehicle makes, models, any specific requirements..."
        />
      </div>

      {/* Submit */}
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
            Submitting...
          </>
        ) : (
          <>
            Request Access
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

      <p className="text-gray-600 text-xs font-extralight mt-4 text-center">
        Your information is kept strictly confidential.
      </p>
    </form>
  );
}
