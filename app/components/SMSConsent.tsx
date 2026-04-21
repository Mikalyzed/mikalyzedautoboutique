"use client";

import Link from "next/link";

interface SMSConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export default function SMSConsent({ checked, onChange, id = "sms-consent" }: SMSConsentProps) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-4 h-4 accent-[#dffd6e] shrink-0 cursor-pointer"
      />
      <span className="text-xs text-gray-400 font-light leading-relaxed">
        I agree to receive SMS/text messages from Mikalyzed Auto Boutique.
        Msg &amp; data rates may apply. Reply STOP to opt out. We don&apos;t
        share your info with third parties. See our{" "}
        <Link
          href="/privacy-policy"
          target="_blank"
          className="text-[#dffd6e] hover:underline"
        >
          Privacy Policy
        </Link>{" "}
        &amp;{" "}
        <Link
          href="/terms-and-conditions"
          target="_blank"
          className="text-[#dffd6e] hover:underline"
        >
          Terms
        </Link>
        .
      </span>
    </label>
  );
}
