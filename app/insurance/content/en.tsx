export function InsuranceEn() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Insurance</h1>
          <p className="text-text-muted text-sm mb-8">Every rental on the CarRental platform is covered by insurance</p>
          <Section title="Basic Insurance">
            <p>Every rental automatically includes basic insurance coverage. It applies for the entire rental period and covers both parties — the renter and the car owner.</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-semibold mb-2">What is included in basic coverage:</p>
              <ul className="space-y-2">
                {['Third-party liability', 'Partial comprehensive — protection against theft, natural disasters, fire', 'Legal assistance in case of accident'].map((item) => (
                  <li key={item} className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span className="text-text-secondary text-sm">{item}</span></li>
                ))}
              </ul>
            </div>
          </Section>
          <Section title="Extended Insurance">
            <p>For additional protection the renter can add extended insurance coverage when booking.</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-brand-subtle">
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Package</th>
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Coverage</th>
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border border-border-default text-text-secondary font-medium">Basic</td><td className="p-3 border border-border-default text-text-secondary">Included automatically</td><td className="p-3 border border-border-default text-text-secondary">Free</td></tr>
                  <tr className="bg-bg-page"><td className="p-3 border border-border-default text-text-secondary font-medium">Standard</td><td className="p-3 border border-border-default text-text-secondary">Basic + full comprehensive</td><td className="p-3 border border-border-default text-text-secondary">€5 / day</td></tr>
                  <tr><td className="p-3 border border-border-default text-text-secondary font-medium">Premium</td><td className="p-3 border border-border-default text-text-secondary">Standard + zero excess</td><td className="p-3 border border-border-default text-text-secondary">€10 / day</td></tr>
                </tbody>
              </table>
            </div>
          </Section>
          <Section title="Excess">
            <p>With basic and standard coverage an excess applies — the amount the renter pays themselves in case of a claim.</p>
            <ul className="space-y-2 mt-3">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Basic package:</strong> excess up to €1,500.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Standard:</strong> excess up to €500.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Premium:</strong> zero excess.</span></li>
            </ul>
          </Section>
          <Section title="What insurance does not cover">
            <ul className="space-y-2">
              {[
                'Damage caused under the influence of alcohol or drugs.',
                'Damage from improper use (racing, off-road).',
                'Loss of renter\'s personal belongings.',
                'Traffic fines.',
                'Damage intentionally caused by the renter.',
              ].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>{item}</span></li>
              ))}
            </ul>
          </Section>
          <Section title="In case of a claim">
            <div className="flex flex-col gap-4 mt-2">
              {[
                { num: '01', text: 'Stop immediately and ensure the safety of all parties.' },
                { num: '02', text: 'Call the police and document the incident.' },
                { num: '03', text: 'Photograph the damage and accident scene.' },
                { num: '04', text: 'Contact our support at +49 721 000 0000.' },
                { num: '05', text: 'Fill in the claim form in your personal account within 24 hours.' },
              ].map(({ num, text }) => (
                <div key={num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-subtle flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand">{num}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed self-center">{text}</p>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Insurance Contact" isLast>
            <p className="text-text-secondary">For insurance questions contact:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">CarRental — Insurance Service</p>
              <p className="text-text-secondary mt-1">insurance@carrental.de</p>
              <p className="text-text-secondary">+49 721 000 0000 (around the clock)</p>
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