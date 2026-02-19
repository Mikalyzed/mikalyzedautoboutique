"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const inputClass =
  "w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light";

export default function SellCarForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    year: "",
    make: "",
    model: "",
    mileage: "",
    condition: "Excellent",
    vin: "",
    exteriorColor: "",
    interiorColor: "",
    message: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 5 - images.length;
    const newFiles = files.slice(0, remaining);

    setImages((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreviews((prev) => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload images to S3 first if any
      let imageUrls: string[] = [];
      if (images.length > 0) {
        setUploadProgress("Uploading photos...");
        const uploadData = new FormData();
        images.forEach((file) => uploadData.append("files", file));

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (uploadRes.ok) {
          const uploadResult = await uploadRes.json();
          imageUrls = uploadResult.urls;
        }
      }

      setUploadProgress("Submitting...");

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          formType: "sell",
          year: formData.year,
          make: formData.make,
          model: formData.model,
          mileage: formData.mileage,
          condition: formData.condition,
          vin: formData.vin,
          exteriorColor: formData.exteriorColor,
          interiorColor: formData.interiorColor,
          message: formData.message,
          imageUrls,
          source: "sell-car-page",
        }),
      });
      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Sell car form submit failed:", error);
    }
    setIsSubmitting(false);
    setUploadProgress("");
  };

  if (isSubmitted) {
    return (
      <div className="bg-zinc-900/30 backdrop-blur-xl p-12 rounded-3xl border border-[#dffd6e]/30 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-light text-white mb-4">Thank You</h3>
        <p className="text-gray-400 font-extralight text-lg leading-relaxed mb-2">
          We&apos;ll review your vehicle info and reach out with a quote within <span className="text-[#dffd6e]">24 hours</span> via SMS or email.
        </p>
        <p className="text-gray-500 font-extralight text-sm">
          Check your spam folder just in case.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/30 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/40 animate-glow-pulse shadow-2xl">
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-light transition-all duration-500 ${step === 1 ? "bg-[#dffd6e] text-black" : "bg-[#dffd6e]/20 text-[#dffd6e]"}`}>
            1
          </div>
          <span className={`text-xs font-light tracking-wider transition-colors duration-500 ${step === 1 ? "text-white" : "text-gray-500"}`}>
            Vehicle
          </span>
        </div>
        <div className="flex-1 h-px bg-zinc-700/50" />
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-light transition-all duration-500 ${step === 2 ? "bg-[#dffd6e] text-black" : "bg-zinc-800 text-gray-500"}`}>
            2
          </div>
          <span className={`text-xs font-light tracking-wider transition-colors duration-500 ${step === 2 ? "text-white" : "text-gray-500"}`}>
            Contact
          </span>
        </div>
      </div>

      {/* STEP 1: Vehicle Details */}
      {step === 1 && (
        <div className="animate-fade-in">
          <div className="form-field-reveal">
            <h3 className="text-xl font-light text-white mb-6 tracking-wide">Vehicle Details</h3>
          </div>

          {/* Year, Make, Model Row */}
          <div className="grid grid-cols-3 gap-4 mb-5 form-field-reveal">
            <div>
              <label htmlFor="year" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
                Year
              </label>
              <input
                type="text"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="2024"
              />
            </div>
            <div>
              <label htmlFor="make" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
                Make
              </label>
              <input
                type="text"
                id="make"
                name="make"
                value={formData.make}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Porsche"
              />
            </div>
            <div>
              <label htmlFor="model" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="911 GT3"
              />
            </div>
          </div>

          {/* Mileage & Condition Row */}
          <div className="grid grid-cols-2 gap-4 mb-5 form-field-reveal">
            <div>
              <label htmlFor="mileage" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
                Mileage
              </label>
              <input
                type="text"
                id="mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="12,000"
              />
            </div>
            <div>
              <label htmlFor="condition" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#dffd6e] transition font-light cursor-pointer"
              >
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Needs Work">Needs Work</option>
              </select>
            </div>
          </div>

          {/* Exterior & Interior Color Row */}
          <div className="grid grid-cols-2 gap-4 mb-5 form-field-reveal">
            <div>
              <label htmlFor="exteriorColor" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
                Exterior Color
              </label>
              <input
                type="text"
                id="exteriorColor"
                name="exteriorColor"
                value={formData.exteriorColor}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Guards Red"
              />
            </div>
            <div>
              <label htmlFor="interiorColor" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
                Interior Color
              </label>
              <input
                type="text"
                id="interiorColor"
                name="interiorColor"
                value={formData.interiorColor}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Black Leather"
              />
            </div>
          </div>

          {/* VIN (Optional) */}
          <div className="mb-5 form-field-reveal">
            <label htmlFor="vin" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
              VIN <span className="text-gray-600">(Optional)</span>
            </label>
            <input
              type="text"
              id="vin"
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. WP0AB2A99NS123456"
              maxLength={17}
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-6 form-field-reveal">
            <label className="block text-xs font-light tracking-wider text-gray-400 mb-2">
              Photos <span className="text-gray-600">(Optional — Up to 5)</span>
            </label>

            {/* Thumbnails */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mb-3">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-zinc-700">
                    <Image src={src} alt={`Upload ${i + 1}`} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            {images.length < 5 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-zinc-700 rounded-lg py-4 flex flex-col items-center gap-1 text-gray-500 hover:border-[#dffd6e]/50 hover:text-gray-300 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-xs font-light">
                  {images.length === 0 ? "Add photos" : `Add more (${5 - images.length} remaining)`}
                </span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!formData.year || !formData.make || !formData.model || !formData.mileage || !formData.exteriorColor || !formData.interiorColor}
            className="w-full bg-[#dffd6e] text-black font-normal tracking-wide py-3.5 rounded-lg hover:bg-[#dffd6e]/90 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Continue
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      )}

      {/* STEP 2: Your Information */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="animate-fade-in">
          <div className="form-field-reveal">
            <h3 className="text-xl font-light text-white mb-6 tracking-wide">Your Information</h3>
          </div>

          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-2 gap-4 mb-5 form-field-reveal">
            <div>
              <label htmlFor="firstName" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Email & Phone Row */}
          <div className="grid grid-cols-2 gap-4 mb-5 form-field-reveal">
            <div>
              <label htmlFor="email" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="(305) 123-4567"
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-6 form-field-reveal">
            <label htmlFor="message" className="block text-xs font-light tracking-wider text-gray-400 mb-2">
              Additional Details
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light resize-none"
              placeholder="Modifications, history, asking price, etc."
            />
          </div>

          {/* Back & Submit Buttons */}
          <div className="flex gap-3 form-field-reveal">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-zinc-700 text-gray-300 font-light tracking-wide hover:border-[#dffd6e]/50 hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#dffd6e] text-black font-normal tracking-wide py-3.5 rounded-lg hover:bg-[#dffd6e]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {uploadProgress || "Submitting..."}
                </>
              ) : (
                <>
                  Get Your Offer
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

          <p className="text-gray-600 text-xs font-extralight mt-4 text-center">
            Your information is kept private and never shared with third parties.
          </p>
        </form>
      )}
    </div>
  );
}
