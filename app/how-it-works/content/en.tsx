export function HowItWorksEn() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">How it works</h1>
          <p className="text-text-muted text-sm mb-8">Renting a car directly from the owner — simple and safe</p>
          <Section title="For Renters">
            <div className="flex flex-col gap-6 mt-2">
              {[
                { num: '01', title: 'Find a car', desc: 'Enter your city, rental dates and desired parameters. The platform will show available cars near you with real reviews and photos.' },
                { num: '02', title: 'Send a request', desc: 'Choose a suitable car and send a booking request. The owner will receive a notification and respond within an hour.' },
                { num: '03', title: 'Pay for the rental', desc: 'After the owner confirms, pay for the rental through the secure payment system. Funds are frozen until the rental starts.' },
                { num: '04', title: 'Pick up the car', desc: 'Meet the owner at the agreed location, inspect the car and get the keys. Have a great trip!' },
                { num: '05', title: 'Return and review', desc: 'Return the car on time and in the same condition. After the rental ends you can leave an honest review of the owner.' },
              ].map(({ num, title, desc }) => (
                <div key={num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-subtle flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand">{num}</span>
                  </div>
                  <div><p className="font-semibold text-text-base mb-1">{title}</p><p className="text-text-secondary text-sm leading-relaxed">{desc}</p></div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="For Owners">
            <div className="flex flex-col gap-6 mt-2">
              {[
                { num: '01', title: 'Register and verify', desc: 'Create an owner account and verify your documents. This takes no more than 10 minutes.' },
                { num: '02', title: 'Add your car', desc: 'Fill in the car description, upload photos and set your daily price. You decide who to rent to.' },
                { num: '03', title: 'Manage bookings', desc: 'Receive requests from renters, confirm or decline them. Manage the availability calendar to suit your schedule.' },
                { num: '04', title: 'Receive payment', desc: 'After the rental starts the funds are automatically transferred to your account. No delays, no hidden fees.' },
              ].map(({ num, title, desc }) => (
                <div key={num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-subtle flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand">{num}</span>
                  </div>
                  <div><p className="font-semibold text-text-base mb-1">{title}</p><p className="text-text-secondary text-sm leading-relaxed">{desc}</p></div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Transaction Security">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>The renter's funds are frozen until the rental starts and are released to the owner only after.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>All platform participants are personally verified.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>In case of disputes our support resolves the situation within 24 hours.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Every rental is covered by basic insurance.</span></li>
            </ul>
          </Section>
          <Section title="Frequently Asked Questions">
            <div className="flex flex-col gap-5 mt-2">
              {[
                { q: "Do I need a driver's license to register?", a: "Yes, a valid driver's license is required to rent a car. It is verified during account verification." },
                { q: 'How do I cancel a booking?', a: 'A booking can be cancelled in your personal account under "My bookings". Refund terms depend on the time before rental start — see Terms of Use for details.' },
                { q: 'What to do in case of an accident?', a: 'Contact our support immediately and call the police. All incidents must be documented.' },
                { q: 'Can I rent a car in another city?', a: 'Yes, the platform operates in 12 German cities. The handover location is specified in each listing.' },
              ].map(({ q, a }) => (
                <div key={q}><p className="font-semibold text-text-base mb-1">{q}</p><p className="text-text-secondary text-sm leading-relaxed">{a}</p></div>
              ))}
            </div>
          </Section>
          <Section title="Still have questions?" isLast>
            <p className="text-text-secondary">Our support team is ready to help at any time.</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">Help Center</p>
              <p className="text-text-secondary mt-1">support@lunarcarsharing.de</p>
              <p className="text-text-secondary">Reply within 2 hours</p>
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