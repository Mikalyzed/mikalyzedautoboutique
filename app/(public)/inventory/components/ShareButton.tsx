"use client";

interface ShareButtonProps {
  vehicleName: string;
}

export default function ShareButton({ vehicleName }: ShareButtonProps) {
  return (
    <button
      onClick={async () => {
        const shareText = `Check out this ${vehicleName} at Mikalyzed Auto Boutique`;
        try {
          if (navigator.share) {
            await navigator.share({ title: shareText, text: shareText, url: window.location.href });
          } else {
            await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
          }
        } catch {
          // User cancelled or API unavailable
        }
      }}
      className="flex-1 flex items-center justify-center gap-2 bg-black border border-zinc-700 text-white px-6 py-3.5 lg:py-3 rounded-lg font-light tracking-wide hover:border-[#dffd6e] transition"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      Share
    </button>
  );
}
