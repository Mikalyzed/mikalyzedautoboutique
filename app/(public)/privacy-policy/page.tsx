import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Mikalyzed Auto Boutique",
  description:
    "Learn how Mikalyzed Auto Boutique collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative pt-40 pb-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#dffd6e] text-xs font-light tracking-[0.5em] mb-6 uppercase">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tighter mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 font-extralight text-sm mb-16">
            Last updated: April 8, 2026
          </p>

          <div className="space-y-12 text-gray-300 font-extralight text-base leading-relaxed">
            {/* Intro */}
            <div>
              <p>
                Mikalyzed Auto Boutique (&quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;) operates the website{" "}
                <span className="text-white">mikalyzedautoboutique.com</span>.
                This Privacy Policy explains how we collect, use, and protect
                your personal information when you visit our website or submit
                information through our forms.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Information We Collect
              </h2>
              <p className="mb-4">
                We collect personal information that you voluntarily provide
                when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
                <li>Submit a vehicle reservation request</li>
                <li>Make an offer on a vehicle</li>
                <li>Fill out a contact form</li>
                <li>Request financing information</li>
                <li>Submit a vehicle for sale</li>
              </ul>
              <p className="mt-4">
                This information may include your name, email address, phone
                number, and any message or details you provide in the form
                submission.
              </p>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
                <li>
                  Respond to your inquiries, reservation requests, and offers
                </li>
                <li>Communicate with you about vehicles and services</li>
                <li>Process and manage vehicle transactions</li>
                <li>Improve our website and customer experience</li>
                <li>
                  Send follow-up communications related to your inquiry
                </li>
              </ul>
            </div>

            {/* Third-Party Services */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Third-Party Services
              </h2>
              <p className="mb-4">
                We use the following third-party services to operate our
                website and manage customer interactions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
                <li>
                  <span className="text-gray-300">Google Analytics</span> —
                  to understand website traffic and usage patterns
                </li>
                <li>
                  <span className="text-gray-300">Meta (Facebook) Pixel</span>{" "}
                  — to measure advertising effectiveness
                </li>
                <li>
                  <span className="text-gray-300">Google Ads</span> — to
                  track conversions from our advertising campaigns
                </li>
              </ul>
              <p className="mt-4">
                These services may collect anonymous usage data such as pages
                visited, time on site, and device information through cookies
                and similar technologies. This data is used solely for
                analytics and advertising measurement purposes.
              </p>
            </div>

            {/* CRM & Lead Management */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Lead Management
              </h2>
              <p>
                When you submit a form on our website, your information may be
                forwarded to our customer relationship management (CRM) system
                so that our team can follow up with you in a timely manner.
                Your information is only used for the purpose of responding to
                your inquiry and is not sold or shared with unrelated third
                parties.
              </p>
            </div>

            {/* Data Protection */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Data Protection
              </h2>
              <p>
                We take reasonable measures to protect your personal
                information from unauthorized access, alteration, or
                destruction. Form submissions are transmitted over encrypted
                (HTTPS) connections and stored in secure cloud infrastructure.
                However, no method of electronic transmission or storage is
                100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Cookies
              </h2>
              <p>
                Our website uses cookies and similar tracking technologies for
                analytics and advertising purposes. You can control cookie
                preferences through your browser settings. Disabling cookies
                may affect certain features of the website.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Your Rights
              </h2>
              <p>
                You may request access to, correction of, or deletion of your
                personal information at any time by contacting us. We will
                respond to your request within a reasonable timeframe.
              </p>
            </div>

            {/* Changes */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any
                changes will be posted on this page with a revised &quot;last
                updated&quot; date.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-[#dffd6e] text-sm font-light tracking-[0.3em] uppercase mb-4">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or how we
                handle your information, please contact us:
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
