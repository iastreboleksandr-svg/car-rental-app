export function MobileEn() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Mobile Apps</h1>
          <p className="text-text-muted text-sm mb-8">Lunar Carsharing always at hand — rent and manage directly from your smartphone</p>
          <Section title="The Lunar Carsharing App">
            <p>The Lunar Carsharing app is available for iOS and Android. All platform features — search, booking, rental management and communication with owners — in one place.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 p-5 border border-border-default rounded-xl flex flex-col gap-3">
                <p className="font-semibold text-text-base">App Store</p>
                <p className="text-sm text-text-muted">iOS 15.0 and above</p>
                <div className="mt-auto pt-3 border-t border-border-default">
                  <p className="text-xs text-text-muted">App is currently in development</p>
                </div>
              </div>
              <div className="flex-1 p-5 border border-border-default rounded-xl flex flex-col gap-3">
                <p className="font-semibold text-text-base">Google Play</p>
                <p className="text-sm text-text-muted">Android 9.0 and above</p>
                <div className="mt-auto pt-3 border-t border-border-default">
                  <p className="text-xs text-text-muted">App is currently in development</p>
                </div>
              </div>
            </div>
          </Section>
          <Section title="App Features">
            <div className="flex flex-col gap-4 mt-2">
              {[
                { title: 'Search and filter', desc: 'Search for cars by city, dates, fuel type and price. View photos and reviews directly in the app.' },
                { title: 'Instant booking', desc: 'Send requests and receive owner confirmation in real time. Notifications arrive instantly.' },
                { title: 'Rental management', desc: 'View active and completed rentals, cancel bookings and leave reviews.' },
                { title: 'Secure payment', desc: 'Pay for the rental in the app by card or Apple Pay / Google Pay.' },
                { title: 'Chat with owner', desc: 'Ask the owner questions directly and arrange vehicle handover details.' },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                  <div><p className="font-semibold text-text-base mb-1">{title}</p><p className="text-text-secondary text-sm leading-relaxed">{desc}</p></div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="For Car Owners">
            <p>Owners can manage their listings directly from the app: update the availability calendar, accept rental requests and track payments.</p>
            <ul className="space-y-2 mt-3">
              {['Add and edit listings with photos.', 'Manage availability calendar.', 'Confirm and decline requests.', 'Payment history and statistics.'].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>{item}</span></li>
              ))}
            </ul>
          </Section>
          <Section title="Web Version">
            <p>If you prefer to use the platform in a browser, the Lunar Carsharing web version is fully optimised for mobile devices and works on any smartphone without installing an app.</p>
          </Section>
          <Section title="Still have questions?" isLast>
            <p className="text-text-secondary">For questions about the app contact:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">Lunar Carsharing Support</p>
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