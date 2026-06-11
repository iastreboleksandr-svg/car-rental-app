export function PrivacyEn() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">
            Privacy Policy
          </h1>
          <p className="text-text-muted text-sm mb-8">
            Last updated: January 1, 2025
          </p>
          <Section title="1. General Provisions">
            <p>
              This Privacy Policy describes how Lunar Carsharing ("we", "our", "us")
              collects, uses and protects your personal data when you use our
              car rental platform.
            </p>
            <p className="mt-3">
              By using our service, you agree to the terms of this policy.
              If you do not agree, please do not use the platform.
            </p>
          </Section>
          <Section title="2. Data We Collect">
            <p className="mb-3">We collect the following categories of personal data:</p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Registration data:</strong> first name, last name, email address, phone number, date of birth.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Identity data:</strong> driver's license number and expiry date.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Payment data:</strong> bank card details (processed by secure payment providers).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Usage data:</strong> booking history, preferences, reviews.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Technical data:</strong> IP address, browser type, cookies, pages visited.</span></li>
            </ul>
          </Section>
          <Section title="3. Purposes of Processing">
            <p className="mb-3">Your data is used for:</p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Registration and management of your account.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Processing bookings and payments.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Communication regarding rental and support matters.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Improving service quality.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Compliance with legal requirements.</span></li>
            </ul>
          </Section>
          <Section title="4. Legal Basis for Processing">
            <ul className="space-y-2 text-text-secondary mt-3">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Performance of a contract (Art. 6(1)(b) GDPR).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Your consent (Art. 6(1)(a) GDPR) — e.g. for marketing emails.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Legitimate interests (Art. 6(1)(f) GDPR) — for service improvement.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Compliance with legal obligations (Art. 6(1)(c) GDPR).</span></li>
            </ul>
          </Section>
          <Section title="5. Sharing with Third Parties">
            <ul className="space-y-2 text-text-secondary mt-3">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Payment providers for transaction processing.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Car owners as part of the rental arrangement.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Authorities when required by law.</span></li>
            </ul>
          </Section>
          <Section title="6. Cookies">
            <p className="text-text-secondary">
              We use cookies to operate the platform, analyse traffic and personalise content.
              You can manage cookie settings in your browser. Disabling cookies may affect
              the functionality of the site.
            </p>
          </Section>
          <Section title="7. Data Retention">
            <p className="text-text-secondary">
              Your data is stored for the duration of your account and up to 3 years after
              deletion. Payment records are kept for 10 years in accordance with German
              tax law (§ 147 AO).
            </p>
          </Section>
          <Section title="8. Your Rights">
            <ul className="space-y-2 text-text-secondary">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Access your personal data (Art. 15 GDPR).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Rectify inaccurate data (Art. 16 GDPR).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Erase your data (Art. 17 GDPR).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Restrict processing (Art. 18 GDPR).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Data portability (Art. 20 GDPR).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Withdraw consent at any time.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Lodge a complaint with a supervisory authority (in Germany: LfDI or BfDI).</span></li>
            </ul>
          </Section>
          <Section title="9. Contact" isLast>
            <p className="text-text-secondary">For all questions related to personal data processing:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">Lunar Carsharing GmbH</p>
              <p className="text-text-secondary mt-1">privacy@lunarcarsharing.de</p>
              <p className="text-text-secondary">Karlsruhe, Deutschland</p>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children, isLast = false }: { title: string; children: React.ReactNode; isLast?: boolean }) {
  return (
    <section className={!isLast ? 'mb-8 pb-8 border-b border-border-default' : 'mb-0'}>
      <h2 className="text-lg font-semibold text-text-base mb-3">{title}</h2>
      <div className="text-text-secondary leading-relaxed">{children}</div>
    </section>
  );
}