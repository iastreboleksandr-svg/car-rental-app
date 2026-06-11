export function AboutEn() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">About us</h1>
          <p className="text-text-muted text-sm mb-8">CarRental — a platform for renting cars directly from owners</p>
          <Section title="Our Mission">
            <p>CarRental was created with one goal — to make car rental simple, fair and accessible. We remove intermediaries and connect renters directly with car owners across Germany.</p>
            <p className="mt-3">No hidden fees, no bureaucracy. Just people who want to drive — and people who have a car.</p>
          </Section>
          <Section title="How We Work">
            <p>The platform works as a marketplace: owners list their vehicles, renters choose the right option and book directly. We ensure transaction security, participant verification and support at all stages of the rental.</p>
          </Section>
          <Section id="reliability" title="Reliable Service">
            <p className="mb-3">We do everything to make every rental go smoothly:</p>
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Owner verification.</strong> Every owner is verified before listing a vehicle.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Real reviews.</strong> Only renters who have completed a trip can leave a review.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Payment protection.</strong> Funds are released to the owner only after the rental starts.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">24/7 support.</strong> Our team is available at any time to resolve issues.</span></li>
            </ul>
          </Section>
          <Section title="Numbers">
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { value: '2 400+', label: 'Vehicles on the platform' },
                { value: '18 000+', label: 'Completed trips' },
                { value: '4.8 ★', label: 'Average owner rating' },
                { value: '12', label: 'German cities' },
              ].map(({ value, label }) => (
                <div key={label} className="p-4 bg-brand-subtle rounded-xl border border-border-default">
                  <p className="text-2xl font-bold text-brand mb-1">{value}</p>
                  <p className="text-sm text-text-muted">{label}</p>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Team">
            <p>We are a small team of developers and entrepreneurs from Karlsruhe. We have experienced car rental problems ourselves and decided to build a platform we trust ourselves.</p>
            <p className="mt-3">CarRental is a portfolio project that is developed and improved every day. We are open to feedback and always welcome your suggestions.</p>
          </Section>
          <Section title="Contact" isLast>
            <p className="text-text-secondary">Have questions or suggestions?</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">CarRental GmbH</p>
              <p className="text-text-secondary mt-1">hello@carrental.de</p>
              <p className="text-text-secondary">Karlsruhe, Deutschland</p>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children, isLast = false, id }: { title: string; children: React.ReactNode; isLast?: boolean; id?: string }) {
  return (
    <section id={id} className={!isLast ? 'mb-8 pb-8 border-b border-border-default' : 'mb-0'}>
      <h2 className="text-lg font-semibold text-text-base mb-3">{title}</h2>
      <div className="text-text-secondary leading-relaxed">{children}</div>
    </section>
  );
}