export function MobileDe() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Mobile Apps</h1>
          <p className="text-text-muted text-sm mb-8">Lunar Carsharing immer dabei — mieten und verwalten direkt vom Smartphone</p>
          <Section title="Die Lunar Carsharing App">
            <p>Die Lunar Carsharing-App ist für iOS und Android verfügbar. Alle Plattformfunktionen — Suche, Buchung, Mietverwaltung und Kommunikation mit Eigentümern — an einem Ort.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 p-5 border border-border-default rounded-xl flex flex-col gap-3">
                <p className="font-semibold text-text-base">App Store</p>
                <p className="text-sm text-text-muted">iOS 15.0 und höher</p>
                <div className="mt-auto pt-3 border-t border-border-default">
                  <p className="text-xs text-text-muted">App befindet sich in der Entwicklung</p>
                </div>
              </div>
              <div className="flex-1 p-5 border border-border-default rounded-xl flex flex-col gap-3">
                <p className="font-semibold text-text-base">Google Play</p>
                <p className="text-sm text-text-muted">Android 9.0 und höher</p>
                <div className="mt-auto pt-3 border-t border-border-default">
                  <p className="text-xs text-text-muted">App befindet sich in der Entwicklung</p>
                </div>
              </div>
            </div>
          </Section>
          <Section title="App-Funktionen">
            <div className="flex flex-col gap-4 mt-2">
              {[
                { title: 'Suche und Filter', desc: 'Suche Fahrzeuge nach Stadt, Daten, Kraftstoffart und Preis. Fotos und Bewertungen direkt in der App ansehen.' },
                { title: 'Sofortbuchung', desc: 'Anfragen senden und Eigentümerbestätigung in Echtzeit erhalten. Benachrichtigungen kommen sofort.' },
                { title: 'Mietverwaltung', desc: 'Aktive und abgeschlossene Mieten ansehen, Buchungen stornieren und Bewertungen hinterlassen.' },
                { title: 'Sichere Zahlung', desc: 'Miete in der App per Karte oder Apple Pay / Google Pay bezahlen.' },
                { title: 'Chat mit Eigentümer', desc: 'Direkt Fragen an den Eigentümer stellen und Details zur Fahrzeugübergabe vereinbaren.' },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                  <div><p className="font-semibold text-text-base mb-1">{title}</p><p className="text-text-secondary text-sm leading-relaxed">{desc}</p></div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Für Fahrzeugeigentümer">
            <p>Eigentümer können ihre Anzeigen direkt in der App verwalten: Verfügbarkeitskalender aktualisieren, Mietanfragen annehmen und Auszahlungen verfolgen.</p>
            <ul className="space-y-2 mt-3">
              {['Anzeigen mit Fotos hinzufügen und bearbeiten.', 'Verfügbarkeitskalender verwalten.', 'Anfragen bestätigen und ablehnen.', 'Auszahlungshistorie und Statistiken.'].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>{item}</span></li>
              ))}
            </ul>
          </Section>
          <Section title="Webversion">
            <p>Wenn Sie die Plattform lieber im Browser nutzen möchten, ist die Lunar Carsharing-Webversion vollständig für mobile Geräte optimiert und funktioniert auf jedem Smartphone ohne App-Installation.</p>
          </Section>
          <Section title="Noch Fragen?" isLast>
            <p className="text-text-secondary">Bei Fragen zur App wenden Sie sich an:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">Lunar Carsharing Support</p>
              <p className="text-text-secondary mt-1">support@lunarcarsharing.de</p>
              <p className="text-text-secondary">Antwort innerhalb von 2 Stunden</p>
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