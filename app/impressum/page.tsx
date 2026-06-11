export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">

          <h1 className="text-3xl font-bold text-text-base mb-2">Impressum</h1>
          <p className="text-text-muted text-sm mb-8">
            Angaben gemäß § 5 TMG (Telemediengesetz)
          </p>

          <Section title="Anbieter">
            <div className="space-y-1">
              <p className="text-text-base font-semibold">Lunar Carsharing GmbH</p>
              <p>Musterstraße 12</p>
              <p>76131 Karlsruhe</p>
              <p>Deutschland</p>
            </div>
          </Section>

          <Section title="Kontakt">
            <div className="space-y-2">
              <div className="flex gap-3">
                <span className="text-text-muted w-24 shrink-0">Telefon</span>
                <span className="text-text-base">+49 721 000 0000</span>
              </div>
              <div className="flex gap-3">
                <span className="text-text-muted w-24 shrink-0">E-Mail</span>
                <a
                  href="mailto:info@lunarcarsharing.de"
                  className="text-text-link hover:underline focus:outline-none focus:ring-2 focus:ring-brand-ring rounded"
                >
                  info@lunarcarsharing.de
                </a>
              </div>
              <div className="flex gap-3">
                <span className="text-text-muted w-24 shrink-0">Website</span>
                <span className="text-text-base">www.lunarcarsharing.de</span>
              </div>
            </div>
          </Section>

          <Section title="Handelsregister">
            <div className="space-y-2">
              <div className="flex gap-3">
                <span className="text-text-muted w-40 shrink-0">Registergericht</span>
                <span className="text-text-base">Amtsgericht Karlsruhe</span>
              </div>
              <div className="flex gap-3">
                <span className="text-text-muted w-40 shrink-0">Registernummer</span>
                <span className="text-text-base">HRB 123456</span>
              </div>
            </div>
          </Section>

          <Section title="Umsatzsteuer-Identifikationsnummer">
            <p>
              Gemäß § 27a Umsatzsteuergesetz:
            </p>
            <p className="mt-2 text-text-base font-medium">DE 123 456 789</p>
          </Section>

          <Section title="Geschäftsführung">
            <p className="text-text-base">Max Mustermann</p>
          </Section>

          <Section title="Verantwortlich für den Inhalt">
            <p>Gemäß § 55 Abs. 2 RStV:</p>
            <div className="mt-2 space-y-1">
              <p className="text-text-base font-medium">Max Mustermann</p>
              <p>Musterstraße 12</p>
              <p>76131 Karlsruhe</p>
            </div>
          </Section>

          <Section title="Streitschlichtung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) 
              bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-link hover:underline focus:outline-none focus:ring-2 focus:ring-brand-ring rounded"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              .
            </p>
            <p className="mt-3">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </Section>

          <Section title="Haftung für Inhalte">
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen 
              Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir 
              als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte 
              fremde Informationen zu überwachen.
            </p>
            <p className="mt-3">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist 
              jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
            </p>
          </Section>

          <Section title="Haftung für Links">
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir 
              keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine 
              Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige 
              Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </Section>

          <Section title="Urheberrecht" isLast>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </Section>

        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
  isLast = false,
}: {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <section className={!isLast ? "mb-8 pb-8 border-b border-border-default" : "mb-0"}>
      <h2 className="text-lg font-semibold text-text-base mb-3">{title}</h2>
      <div className="text-text-secondary leading-relaxed">{children}</div>
    </section>
  );
}