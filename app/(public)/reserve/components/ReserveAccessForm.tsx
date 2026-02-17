"use client";

import { useState } from "react";

export default function ReserveAccessForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicles: "",
    message: "",
  });

  const [vehicleDetails, setVehicleDetails] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "vehicles") {
      const count = value === "4+" ? 0 : parseInt(value) || 0;
      setVehicleDetails((prev) => {
        const next = [...prev];
        while (next.length < count) next.push("");
        return next.slice(0, count);
      });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVehicleDetail = (index: number, value: string) => {
    setVehicleDetails((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const vehicleList = vehicleDetails.filter(Boolean).join("; ");

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          formType: "reserve-storage",
          message: `Vehicles to store: ${formData.vehicles || "Not specified"}${vehicleList ? ` (${vehicleList})` : ""}. Collection info: ${formData.message || "N/A"}`,
          vehiclesToStore: vehicleList || formData.vehicles,
          collectionMessage: formData.message,
          source: "reserve-page",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Reserve access submit failed:", error);
    }
    setIsSubmitting(false);
  };

  const vehicleCount = formData.vehicles === "4+" ? 0 : parseInt(formData.vehicles) || 0;

  if (submitted) {
    return (
      <div className="bg-zinc-900/30 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/40 shadow-2xl flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-[#dffd6e]/10 border border-[#dffd6e]/30 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#dffd6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-light text-white mb-2">Inquiry Submitted</h3>
        <p className="text-gray-400 font-extralight text-sm">
          A member of our team will be in touch shortly. All inquiries are handled with complete discretion.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/30 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/40 hover:border-[#dffd6e]/30 transition-all duration-700 scroll-reveal shadow-2xl"
      style={{ animationDelay: "200ms" }}
    >
      <p className="text-white text-lg font-light tracking-tight mb-1">Request Access</p>
      <p className="text-gray-500 text-sm font-extralight mb-6">All inquiries are handled with complete discretion.</p>

      {/* First Name & Last Name Row */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="reserve-firstName"
            className="block text-xs font-light tracking-wider text-gray-400 mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="reserve-firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
            placeholder="First name"
          />
        </div>

        <div>
          <label
            htmlFor="reserve-lastName"
            className="block text-xs font-light tracking-wider text-gray-400 mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="reserve-lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
            placeholder="Last name"
          />
        </div>
      </div>

      {/* Email & Phone Row */}
      <div className="grid grid-cols-2 gap-4 mb-5">
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
      </div>

      {/* Vehicle Count */}
      <div className="mb-5">
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
          <option value="2">2 Vehicles</option>
          <option value="3">3 Vehicles</option>
          <option value="4+">4+ Vehicles</option>
        </select>
      </div>

      {/* Vehicle Details — appears after selection */}
      {vehicleCount > 0 && (
        <div className="mb-5 overflow-hidden animate-fade-in">
          <label className="block text-xs font-light tracking-wider text-gray-400 mb-3">
            Vehicle{vehicleCount > 1 ? "s" : ""} to Be Stored
          </label>
          <div className="space-y-3">
            {vehicleDetails.map((detail, i) => (
              <input
                key={i}
                type="text"
                value={detail}
                onChange={(e) => handleVehicleDetail(i, e.target.value)}
                className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light"
                placeholder={`Vehicle ${i + 1} — Year, Make, Model`}
              />
            ))}
          </div>
        </div>
      )}

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
          placeholder="Any specific requirements or notes..."
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
