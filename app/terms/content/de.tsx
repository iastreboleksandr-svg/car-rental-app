export function TermsDe() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Nutzungsbedingungen</h1>
          <p className="text-text-muted text-sm mb-8">Letzte Aktualisierung: 1. Januar 2025</p>
          <Section title="1. Vertragsgegenstand">
            <p>Diese Nutzungsbedingungen regeln das Verhältnis zwischen Lunar Carsharing GmbH („Plattform") und den Nutzern — Mietern und Fahrzeugeigentümern. Mit der Registrierung auf der Plattform akzeptieren Sie diese Bedingungen vollständig.</p>
          </Section>
          <Section title="2. Registrierung und Konto">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Zur Registrierung müssen Sie mindestens 18 Jahre alt sein und einen gültigen Führerschein besitzen.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Sie sind verpflichtet, korrekte Daten anzugeben und diese aktuell zu halten.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Das Konto ist persönlich und darf nicht an Dritte weitergegeben werden.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Sie sind für alle Handlungen verantwortlich, die über Ihr Konto vorgenommen werden.</span></li>
            </ul>
          </Section>
          <Section title="3. Buchung und Zahlung">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Eine Buchung gilt als bestätigt, wenn Sie eine Bestätigungsbenachrichtigung erhalten und die Zahlung abgebucht wurde.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Die Zahlung erfolgt in Euro (EUR) über sichere Zahlungsdienste.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Der Mietpreis beinhaltet eine Basisversicherung, sofern in der Fahrzeugbeschreibung nicht anders angegeben.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Zusatzkosten (Kraftstoff, Bußgelder, Schäden) werden separat berechnet.</span></li>
            </ul>
          </Section>
          <Section title="4. Stornierung und Erstattung">
            <div className="overflow-x-auto">
              <table className="w-full text-sm mt-2 border-collapse">
                <thead>
                  <tr className="bg-brand-subtle">
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Zeit bis Mietbeginn</th>
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Erstattung</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border border-border-default text-text-secondary">Mehr als 48 Stunden</td><td className="p-3 border border-border-default text-text-secondary">100%</td></tr>
                  <tr className="bg-bg-page"><td className="p-3 border border-border-default text-text-secondary">24 bis 48 Stunden</td><td className="p-3 border border-border-default text-text-secondary">50%</td></tr>
                  <tr><td className="p-3 border border-border-default text-text-secondary">Weniger als 24 Stunden</td><td className="p-3 border border-border-default text-text-secondary">Keine Erstattung</td></tr>
                </tbody>
              </table>
            </div>
          </Section>
          <Section title="5. Pflichten des Mieters">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Das Fahrzeug ausschließlich gemäß den Mietbedingungen nutzen.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Das Steuer nicht an Dritte weitergeben, die nicht im Vertrag genannt sind.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Die Verkehrsregeln einhalten und für Bußgelder haften.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Das Fahrzeug pünktlich und im gleichen Zustand zurückgeben.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Jeden Unfall oder Schaden unverzüglich melden.</span></li>
            </ul>
          </Section>
          <Section title="6. Pflichten des Fahrzeugeigentümers">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Korrekte Fahrzeugbeschreibung und aktuelle Fotos bereitstellen.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Das Fahrzeug in einwandfreiem, sauberem Zustand mit vollem Tank übergeben.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Eine gültige Versicherung für den gesamten Mietzeitraum sicherstellen.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Bestätigte Buchungen nicht ohne triftigen Grund stornieren.</span></li>
            </ul>
          </Section>
          <Section title="7. Haftung der Plattform">
            <p>Lunar Carsharing ist Vermittler zwischen Mietern und Fahrzeugeigentümern. Die Plattform haftet nicht für das Verhalten der Nutzer, den Zustand der Fahrzeuge oder Schäden, die während der Miete entstehen. Die maximale Haftung ist auf die erhaltene Provision der jeweiligen Transaktion begrenzt.</p>
          </Section>
          <Section title="8. Verbotene Handlungen">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Nutzung des Fahrzeugs für kommerzielle Zwecke (Taxi, Lieferung) ohne Genehmigung.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Fahren unter Alkohol- oder Drogeneinfluss.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Teilnahme an Rennen oder Wettbewerben.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Rauchen im Fahrzeug, sofern nicht vom Eigentümer erlaubt.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Transport von Tieren ohne ausdrückliche Zustimmung des Eigentümers.</span></li>
            </ul>
          </Section>
          <Section title="9. Anwendbares Recht">
            <p>Diese Bedingungen unterliegen dem Recht der Bundesrepublik Deutschland. Streitigkeiten werden vor den Gerichten am Sitz der Lunar Carsharing GmbH — Karlsruhe — verhandelt.</p>
          </Section>
          <Section title="10. Änderungen der Bedingungen">
            <p>Wir behalten uns das Recht vor, diese Bedingungen zu ändern. Über Änderungen informieren wir Sie per E-Mail mindestens 14 Tage vor Inkrafttreten. Die weitere Nutzung der Plattform nach Inkrafttreten der Änderungen gilt als Zustimmung.</p>
          </Section>
          <Section title="11. Kontakt" isLast>
            <p className="text-text-secondary">Bei Fragen zu den Nutzungsbedingungen:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">Lunar Carsharing GmbH</p>
              <p className="text-text-secondary mt-1">legal@lunarcarsharing.de</p>
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