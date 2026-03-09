"use client";

export default function FloatingCallButton() {
  return (
    <a
      href="tel:+17867887243"
      onClick={() => {
        if (typeof window !== "undefined" && (window as { gtag?: (...args: unknown[]) => void }).gtag) {
          (window as { gtag: (...args: unknown[]) => void }).gtag("event", "reserve_phone_call", {
            event_category: "lead",
            event_label: "the_reserve_call",
            value: 1,
          });
        }
      }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#dffd6e] rounded-full flex items-center justify-center shadow-lg shadow-[#dffd6e]/20 hover:scale-110 hover:shadow-xl hover:shadow-[#dffd6e]/30 transition-all duration-300"
      aria-label="Call us"
    >
      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    </a>
  );
}
