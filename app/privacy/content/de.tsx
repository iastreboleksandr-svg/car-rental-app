export function PrivacyDe() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">
            Datenschutzrichtlinie
          </h1>
          <p className="text-text-muted text-sm mb-8">
            Letzte Aktualisierung: 1. Januar 2025
          </p>
          <Section title="1. Allgemeine Bestimmungen">
            <p>
              Diese Datenschutzrichtlinie beschreibt, wie CarRental („wir", „unser", „uns")
              Ihre personenbezogenen Daten bei der Nutzung unserer Fahrzeugvermietungsplattform
              erhebt, verwendet und schützt.
            </p>
            <p className="mt-3">
              Durch die Nutzung unseres Dienstes stimmen Sie den Bedingungen dieser Richtlinie zu.
              Wenn Sie mit diesen Bedingungen nicht einverstanden sind, nutzen Sie die Plattform bitte nicht.
            </p>
          </Section>
          <Section title="2. Welche Daten wir erheben">
            <p className="mb-3">Wir erheben folgende Kategorien personenbezogener Daten:</p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Registrierungsdaten:</strong> Vorname, Nachname, E-Mail-Adresse, Telefonnummer, Geburtsdatum.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Ausweisdaten:</strong> Führerscheinnummer und Gültigkeitsdatum.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Zahlungsdaten:</strong> Bankkartendetails (verarbeitet durch sichere Zahlungsanbieter).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Nutzungsdaten:</strong> Buchungshistorie, Präferenzen, Bewertungen.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Technische Daten:</strong> IP-Adresse, Browsertyp, Cookies, besuchte Seiten.</span></li>
            </ul>
          </Section>
          <Section title="3. Zwecke der Datenverarbeitung">
            <p className="mb-3">Ihre Daten werden verwendet für:</p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Registrierung und Verwaltung Ihres Kontos.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Verarbeitung von Buchungen und Zahlungen.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Kommunikation zu Miet- und Supportfragen.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Verbesserung der Servicequalität.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Einhaltung gesetzlicher Anforderungen.</span></li>
            </ul>
          </Section>
          <Section title="4. Rechtsgrundlagen der Verarbeitung">
            <ul className="space-y-2 text-text-secondary mt-3">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) — z. B. für Marketing-Newsletter.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO) — zur Serviceverbesserung.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Erfüllung rechtlicher Verpflichtungen (Art. 6 Abs. 1 lit. c DSGVO).</span></li>
            </ul>
          </Section>
          <Section title="5. Weitergabe an Dritte">
            <ul className="space-y-2 text-text-secondary mt-3">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>An Zahlungsanbieter zur Transaktionsverarbeitung.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>An Fahrzeugeigentümer im Rahmen der Mietabwicklung.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>An Behörden bei gesetzlicher Verpflichtung.</span></li>
            </ul>
          </Section>
          <Section title="6. Cookies">
            <p className="text-text-secondary">
              Wir verwenden Cookies für den Betrieb der Plattform, die Verkehrsanalyse und
              die Personalisierung von Inhalten. Sie können Cookie-Einstellungen in Ihrem Browser
              verwalten. Das Deaktivieren von Cookies kann die Funktionalität der Website beeinträchtigen.
            </p>
          </Section>
          <Section title="7. Datenspeicherung">
            <p className="text-text-secondary">
              Ihre Daten werden für die Dauer Ihres Kontos und zusätzlich bis zu 3 Jahre nach
              dessen Löschung gespeichert. Zahlungsbelege werden 10 Jahre gemäß deutschem
              Steuerrecht (§ 147 AO) aufbewahrt.
            </p>
          </Section>
          <Section title="8. Ihre Rechte">
            <ul className="space-y-2 text-text-secondary">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Auskunft über Ihre Daten (Art. 15 DSGVO).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Berichtigung unrichtiger Daten (Art. 16 DSGVO).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Löschung Ihrer Daten (Art. 17 DSGVO).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Einschränkung der Verarbeitung (Art. 18 DSGVO).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Datenübertragbarkeit (Art. 20 DSGVO).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Widerruf der Einwilligung jederzeit.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Beschwerde bei einer Aufsichtsbehörde (in Deutschland: LfDI oder BfDI).</span></li>
            </ul>
          </Section>
          <Section title="9. Kontakt" isLast>
            <p className="text-text-secondary">Bei Fragen zur Verarbeitung personenbezogener Daten:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">CarRental GmbH</p>
              <p className="text-text-secondary mt-1">privacy@carrental.de</p>
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