export function TermsEn() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Terms of Use</h1>
          <p className="text-text-muted text-sm mb-8">Last updated: January 1, 2025</p>
          <Section title="1. Subject of Agreement">
            <p>These Terms of Use govern the relationship between CarRental GmbH ("Platform") and users — renters and car owners. By registering on the platform, you accept these terms in full.</p>
          </Section>
          <Section title="2. Registration and Account">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>To register you must be at least 18 years old and hold a valid driver's license.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>You must provide accurate information and keep it up to date.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Your account is personal and may not be transferred to third parties.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>You are responsible for all actions taken through your account.</span></li>
            </ul>
          </Section>
          <Section title="3. Booking and Payment">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>A booking is confirmed once you receive a confirmation notification and payment is charged.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Payment is made in euros (EUR) via secure payment services.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>The rental price includes basic insurance unless otherwise stated in the car description.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Additional charges (fuel, fines, damage) are billed separately.</span></li>
            </ul>
          </Section>
          <Section title="4. Cancellation and Refunds">
            <div className="overflow-x-auto">
              <table className="w-full text-sm mt-2 border-collapse">
                <thead>
                  <tr className="bg-brand-subtle">
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Time before rental start</th>
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Refund</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border border-border-default text-text-secondary">More than 48 hours</td><td className="p-3 border border-border-default text-text-secondary">100%</td></tr>
                  <tr className="bg-bg-page"><td className="p-3 border border-border-default text-text-secondary">24 to 48 hours</td><td className="p-3 border border-border-default text-text-secondary">50%</td></tr>
                  <tr><td className="p-3 border border-border-default text-text-secondary">Less than 24 hours</td><td className="p-3 border border-border-default text-text-secondary">No refund</td></tr>
                </tbody>
              </table>
            </div>
          </Section>
          <Section title="5. Renter Obligations">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Use the vehicle strictly in accordance with rental terms.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Do not allow third parties not listed in the agreement to drive.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Comply with traffic regulations and be liable for fines.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Return the vehicle on time and in the same condition.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Immediately report any accident or damage to the vehicle.</span></li>
            </ul>
          </Section>
          <Section title="6. Owner Obligations">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Provide accurate vehicle description and up-to-date photos.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Hand over the vehicle in good, clean condition with a full tank.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Ensure valid insurance for the entire rental period.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Do not cancel confirmed bookings without valid reason.</span></li>
            </ul>
          </Section>
          <Section title="7. Platform Liability">
            <p>CarRental acts as an intermediary between renters and car owners. The platform is not liable for user actions, vehicle condition or losses arising during the rental. Maximum liability is limited to the commission received for the specific transaction.</p>
          </Section>
          <Section title="8. Prohibited Actions">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Using the vehicle for commercial purposes (taxi, delivery) without permission.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Driving under the influence of alcohol or drugs.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Participating in races or competitions.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Smoking in the vehicle unless permitted by the owner.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Transporting animals without the owner's explicit consent.</span></li>
            </ul>
          </Section>
          <Section title="9. Applicable Law">
            <p>These Terms are governed by the law of the Federal Republic of Germany. Disputes are handled by courts at the location of CarRental GmbH — Karlsruhe.</p>
          </Section>
          <Section title="10. Changes to Terms">
            <p>We reserve the right to modify these Terms. We will notify you by email at least 14 days before changes take effect. Continued use of the platform after changes take effect constitutes acceptance.</p>
          </Section>
          <Section title="11. Contact" isLast>
            <p className="text-text-secondary">For questions related to the terms of use:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">CarRental GmbH</p>
              <p className="text-text-secondary mt-1">legal@carrental.de</p>
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