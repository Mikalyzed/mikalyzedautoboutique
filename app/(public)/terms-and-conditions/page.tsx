import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Mikalyzed Auto Boutique",
  description:
    "Terms and conditions for Mikalyzed Auto Boutique website and SMS messaging services.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative pt-40 pb-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#dffd6e] text-xs font-light tracking-[0.5em] mb-6 uppercase">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tighter mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-500 font-extralight text-sm mb-16">
            Last updated: April 8, 2026
          </p>

          <div className="space-y-12 text-gray-300 font-extralight text-base leading-relaxed">
            {/* Intro */}
            <div>
              <p>
                These Terms and Conditions govern your use of the Mikalyzed
                Auto Boutique website (
                <span className="text-white">mikalyzedautoboutique.com</span>)
                and any related services, including SMS/text messaging. By
                using our website or submitting any form, you agree to these
                terms.
              </p>
            </div>

            {/* SMS Messaging Program */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                SMS Messaging Program
              </h2>
              <p className="mb-4">
                <span className="text-white">Program Name:</span> Mikalyzed
                Auto Boutique Notifications
              </p>
              <p className="mb-4">
                <span className="text-white">Description:</span> When you
                submit a form on our website (vehicle reservation, offer,
                contact inquiry, or sell request), you may opt in to receive
                SMS/text messages from Mikalyzed Auto Boutique. These messages
                are related to your inquiry and may include follow-ups about
                vehicle availability, appointment confirmations, offer
                updates, and other transactional communications related to
                your request.
              </p>
              <p className="mb-4">
                <span className="text-white">Message Frequency:</span>{" "}
                Message frequency varies based on your inquiry. You may
                receive up to 5 messages per interaction. Recurring messages
                are not sent unless you initiate a new inquiry.
              </p>
              <p>
                <span className="text-white">
                  Message and Data Rates:
                </span>{" "}
                Message and data rates may apply. Check with your mobile
                carrier for details regarding your text and data plan.
              </p>
            </div>

            {/* Opt-Out & Support */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Opt-Out &amp; Support
              </h2>
              <p className="mb-4">
                You can opt out of receiving SMS messages at any time by
                replying <strong className="text-white font-medium">STOP</strong> to
                any message you receive from us. After opting out, you will
                receive a one-time confirmation message and no further
                messages will be sent.
              </p>
              <p className="mb-4">
                For help or support regarding our SMS program, reply{" "}
                <strong className="text-white font-medium">HELP</strong> to any
                message, or contact us directly:
              </p>
              <div className="mt-4 space-y-1 text-gray-400 ml-2">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@mikalyzedautoboutique.com"
                    className="text-[#dffd6e] hover:underline"
                  >
                    info@mikalyzedautoboutique.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:3057202533"
                    className="text-[#dffd6e] hover:underline"
                  >
                    (305) 720-2533
                  </a>
                </p>
              </div>
            </div>

            {/* Website Use */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Website Use
              </h2>
              <p>
                All content on this website, including text, images, and
                vehicle listings, is the property of Mikalyzed Auto Boutique
                and is provided for informational purposes only. Vehicle
                availability, pricing, and specifications are subject to
                change without notice. Submitting a reservation or offer does
                not constitute a binding purchase agreement.
              </p>
            </div>

            {/* Privacy */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Privacy &amp; Data Sharing
              </h2>
              <p>
                We do not sell, rent, or share your personal information with
                third parties for marketing purposes. Information collected
                through our forms and SMS program is used solely to respond to
                your inquiries and facilitate vehicle transactions. For full
                details, see our{" "}
                <a
                  href="/privacy-policy"
                  className="text-[#dffd6e] hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            {/* Disclaimers */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Disclaimers
              </h2>
              <p>
                Vehicle photos, descriptions, and pricing are provided as
                accurately as possible but may contain errors. We are not
                responsible for typographical errors or inaccuracies in
                listings. All vehicles are sold as-is unless otherwise stated
                in a written agreement. Mikalyzed Auto Boutique reserves the
                right to modify these terms at any time.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Contact
              </h2>
              <p>
                For questions about these terms, contact us:
              </p>
              <div className="mt-4 space-y-1 text-gray-400">
                <p>Mikalyzed Auto Boutique</p>
                <p>3455 NW 30th Ave, Miami, FL 33142</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@mikalyzedautoboutique.com"
                    className="text-[#dffd6e] hover:underline"
                  >
                    info@mikalyzedautoboutique.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:3057202533"
                    className="text-[#dffd6e] hover:underline"
                  >
                    (305) 720-2533
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
