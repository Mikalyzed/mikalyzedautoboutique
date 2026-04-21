"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const BOT_FIELD_STYLE = {
  position: "absolute" as const,
  left: "-9999px",
  opacity: 0,
  height: 0,
  width: 0,
};

const inputClass =
  "w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light";

export default function GrandOpeningForm() {
  const formLoadedAt = useRef(Date.now());
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    year: "",
    make: "",
    model: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 10 - images.length;
    const newFiles = files.slice(0, remaining);

    setImages((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreviews((prev) => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });

    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Compress image to stay under Vercel's 4.5MB body limit
  const compressImage = (file: File, maxSizeMB = 3): Promise<File> => {
    return new Promise((resolve) => {
      // If already small enough, skip compression
      if (file.size <= maxSizeMB * 1024 * 1024) {
        resolve(file);
        return;
      }

      const img = new window.Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement("canvas");
        // Scale down large images
        let { width, height } = img;
        const maxDim = 2000;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: "image/jpeg" }));
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          0.8
        );
      };
      img.onerror = () => resolve(file);
      img.src = url;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Upload images to S3 one at a time to avoid body size limits
      const imageUrls: string[] = [];
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          setUploadProgress(`Uploading photo ${i + 1} of ${images.length}...`);
          const compressed = await compressImage(images[i]);
          const uploadData = new FormData();
          uploadData.append("files", compressed);

          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: uploadData,
          });

          if (uploadRes.ok) {
            const uploadResult = await uploadRes.json();
            imageUrls.push(...uploadResult.urls);
          } else {
            setError(`Failed to upload photo ${i + 1}. Please try again.`);
            setIsSubmitting(false);
            setUploadProgress("");
            return;
          }
        }
      }

      setUploadProgress("Submitting...");

      const res = await fetch("/api/grand-opening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          year: formData.year,
          make: formData.make,
          model: formData.model,
          imageUrls,
          _hp: honeypot,
          _ts: formLoadedAt.current,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setIsSubmitting(false);
    setUploadProgress("");
  };

  if (isSubmitted) {
    return (
      <div className="bg-zinc-900/30 backdrop-blur-xl p-12 rounded-3xl border border-[#dffd6e]/30 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-[#dffd6e]/20 to-[#dffd6e]/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-10 h-10 text-[#dffd6e]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-light text-white mb-4">
          Submission Received
        </h3>
        <p className="text-gray-400 font-extralight text-lg leading-relaxed">
          Thank you for submitting your vehicle. We&apos;ll review your
          submission and reach out to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/30 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-zinc-800/50 space-y-6"
    >
      {/* Honeypot */}
      <div style={BOT_FIELD_STYLE} aria-hidden="true">
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 font-light mb-1.5">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 font-light mb-1.5">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className={inputClass}
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 font-light mb-1.5">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 font-light mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="(305) 555-1234"
            className={inputClass}
          />
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-400 font-light mb-1.5">
            Year *
          </label>
          <input
            type="text"
            name="year"
            required
            value={formData.year}
            onChange={handleChange}
            placeholder="2024"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 font-light mb-1.5">
            Make *
          </label>
          <input
            type="text"
            name="make"
            required
            value={formData.make}
            onChange={handleChange}
            placeholder="Porsche"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 font-light mb-1.5">
            Model *
          </label>
          <input
            type="text"
            name="model"
            required
            value={formData.model}
            onChange={handleChange}
            placeholder="911 GT3"
            className={inputClass}
          />
        </div>
      </div>

      {/* Photos */}
      <div>
        <label className="block text-sm text-gray-400 font-light mb-1.5">
          Vehicle Photos (up to 10)
        </label>
        <div
          onClick={() => imageInputRef.current?.click()}
          className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center cursor-pointer hover:border-[#dffd6e]/50 transition"
        >
          <svg
            className="w-8 h-8 text-gray-500 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-500 font-extralight text-sm">
            {images.length > 0
              ? `${images.length} photo${images.length > 1 ? "s" : ""} selected — click to add more`
              : "Click to upload photos"}
          </p>
        </div>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          className="hidden"
        />
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-5 gap-2 mt-3">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative group">
                <Image
                  src={src}
                  alt={`Photo ${i + 1}`}
                  width={120}
                  height={80}
                  className="w-full h-20 object-cover rounded-lg border border-zinc-700"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm font-light">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] text-black py-3.5 rounded-lg font-light tracking-wide hover:shadow-lg hover:shadow-[#dffd6e]/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? uploadProgress || "Submitting..." : "Submit Vehicle"}
      </button>
    </form>
  );
}
