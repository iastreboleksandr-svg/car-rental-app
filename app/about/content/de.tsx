export function AboutDe() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Über uns</h1>
          <p className="text-text-muted text-sm mb-8">CarRental — Plattform für Fahrzeugvermietung direkt vom Eigentümer</p>
          <Section title="Unsere Mission">
            <p>CarRental wurde mit einem Ziel gegründet — Fahrzeugvermietung einfach, fair und zugänglich zu machen. Wir eliminieren Zwischenhändler und verbinden Mieter direkt mit Fahrzeugeigentümern in ganz Deutschland.</p>
            <p className="mt-3">Keine versteckten Gebühren, kein Bürokratieaufwand. Nur Menschen, die fahren möchten — und Menschen, die ein Auto haben.</p>
          </Section>
          <Section title="Wie wir arbeiten">
            <p>Die Plattform funktioniert als Marktplatz: Eigentümer stellen ihre Fahrzeuge ein, Mieter wählen die passende Option und buchen direkt. Wir gewährleisten Transaktionssicherheit, Teilnehmerverifizierung und Support in allen Phasen der Miete.</p>
          </Section>
          <Section id="reliability" title="Zuverlässiger Service">
            <p className="mb-3">Wir tun alles, damit jede Miete reibungslos verläuft:</p>
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Eigentümerverifizierung.</strong> Jeder Eigentümer wird vor der Fahrzeugveröffentlichung überprüft.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Echte Bewertungen.</strong> Nur Mieter, die eine Fahrt abgeschlossen haben, können eine Bewertung hinterlassen.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Zahlungsschutz.</strong> Gelder gehen erst nach Mietbeginn an den Eigentümer.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">24/7 Support.</strong> Unser Team ist jederzeit für Fragen erreichbar.</span></li>
            </ul>
          </Section>
          <Section title="Zahlen">
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { value: '2 400+', label: 'Fahrzeuge auf der Plattform' },
                { value: '18 000+', label: 'Abgeschlossene Fahrten' },
                { value: '4.8 ★', label: 'Durchschnittliche Eigentümerbewertung' },
                { value: '12', label: 'Deutsche Städte' },
              ].map(({ value, label }) => (
                <div key={label} className="p-4 bg-brand-subtle rounded-xl border border-border-default">
                  <p className="text-2xl font-bold text-brand mb-1">{value}</p>
                  <p className="text-sm text-text-muted">{label}</p>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Team">
            <p>Wir sind ein kleines Team aus Entwicklern und Unternehmern aus Karlsruhe. Wir haben selbst Probleme mit der Fahrzeugvermietung erlebt und beschlossen, eine Plattform zu schaffen, der wir selbst vertrauen.</p>
            <p className="mt-3">CarRental ist ein Portfolio-Projekt, das täglich weiterentwickelt wird. Wir sind offen für Feedback und freuen uns über Ihre Vorschläge.</p>
          </Section>
          <Section title="Kontakt" isLast>
            <p className="text-text-secondary">Haben Sie Fragen oder Vorschläge?</p>
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