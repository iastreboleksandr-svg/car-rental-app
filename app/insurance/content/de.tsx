export function InsuranceDe() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Versicherung</h1>
          <p className="text-text-muted text-sm mb-8">Jede Miete auf der CarRental-Plattform ist versichert</p>
          <Section title="Basisversicherung">
            <p>Jede Miete beinhaltet automatisch einen Basisversicherungsschutz. Er gilt für die gesamte Mietdauer und deckt beide Parteien ab — Mieter und Fahrzeugeigentümer.</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-semibold mb-2">Was ist im Basisschutz enthalten:</p>
              <ul className="space-y-2">
                {['Haftpflicht gegenüber Dritten', 'Teilkasko — Schutz gegen Diebstahl, Naturkatastrophen, Brand', 'Rechtshilfe bei Unfällen'].map((item) => (
                  <li key={item} className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span className="text-text-secondary text-sm">{item}</span></li>
                ))}
              </ul>
            </div>
          </Section>
          <Section title="Erweiterte Versicherung">
            <p>Für zusätzlichen Schutz kann der Mieter bei der Buchung einen erweiterten Versicherungsschutz hinzubuchen.</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-brand-subtle">
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Paket</th>
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Deckung</th>
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Preis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border border-border-default text-text-secondary font-medium">Basis</td><td className="p-3 border border-border-default text-text-secondary">Automatisch inklusive</td><td className="p-3 border border-border-default text-text-secondary">Kostenlos</td></tr>
                  <tr className="bg-bg-page"><td className="p-3 border border-border-default text-text-secondary font-medium">Standard</td><td className="p-3 border border-border-default text-text-secondary">Basis + Vollkasko</td><td className="p-3 border border-border-default text-text-secondary">€5 / Tag</td></tr>
                  <tr><td className="p-3 border border-border-default text-text-secondary font-medium">Premium</td><td className="p-3 border border-border-default text-text-secondary">Standard + Nullselbstbehalt</td><td className="p-3 border border-border-default text-text-secondary">€10 / Tag</td></tr>
                </tbody>
              </table>
            </div>
          </Section>
          <Section title="Selbstbehalt">
            <p>Bei Basis- und Standardschutz gilt ein Selbstbehalt — der Betrag, den der Mieter im Schadensfall selbst trägt.</p>
            <ul className="space-y-2 mt-3">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Basispaket:</strong> Selbstbehalt bis €1.500.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Standard:</strong> Selbstbehalt bis €500.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Premium:</strong> Nullselbstbehalt.</span></li>
            </ul>
          </Section>
          <Section title="Was die Versicherung nicht abdeckt">
            <ul className="space-y-2">
              {[
                'Schäden unter Alkohol- oder Drogeneinfluss.',
                'Schäden durch zweckfremde Nutzung (Rennen, Gelände).',
                'Verlust persönlicher Gegenstände des Mieters.',
                'Bußgelder für Verkehrsverstöße.',
                'Vorsätzlich verursachte Schäden.',
              ].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>{item}</span></li>
              ))}
            </ul>
          </Section>
          <Section title="Im Schadensfall">
            <div className="flex flex-col gap-4 mt-2">
              {[
                { num: '01', text: 'Sofort anhalten und die Sicherheit aller Beteiligten sicherstellen.' },
                { num: '02', text: 'Polizei rufen und den Vorfall dokumentieren.' },
                { num: '03', text: 'Schäden und den Unfallort fotografieren.' },
                { num: '04', text: 'Unseren Support unter +49 721 000 0000 kontaktieren.' },
                { num: '05', text: 'Das Schadensformular im persönlichen Konto innerhalb von 24 Stunden ausfüllen.' },
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
          <Section title="Versicherungs-Kontakt" isLast>
            <p className="text-text-secondary">Bei Versicherungsfragen wenden Sie sich an:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">CarRental — Versicherungsservice</p>
              <p className="text-text-secondary mt-1">insurance@carrental.de</p>
              <p className="text-text-secondary">+49 721 000 0000 (rund um die Uhr)</p>
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