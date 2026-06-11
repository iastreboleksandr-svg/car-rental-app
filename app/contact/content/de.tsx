export function ContactDe() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Kontakt</h1>
          <p className="text-text-muted text-sm mb-8">Wir helfen gerne — wählen Sie Ihre bevorzugte Kontaktmethode</p>
          <Section title="Kontaktmöglichkeiten">
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              {[
                { title: 'E-Mail', value: 'support@carrental.de', desc: 'Antwort innerhalb von 2 Stunden' },
                { title: 'Telefon', value: '+49 721 000 0000', desc: 'Mo–Fr, 9:00–18:00' },
                { title: 'Versicherungsfragen', value: 'insurance@carrental.de', desc: 'Rund um die Uhr' },
                { title: 'Rechtliche Fragen', value: 'legal@carrental.de', desc: 'Antwort innerhalb von 24 Stunden' },
              ].map(({ title, value, desc }) => (
                <div key={title} className="p-4 border border-border-default rounded-xl">
                  <p className="text-xs text-text-muted mb-1">{title}</p>
                  <p className="font-semibold text-text-base">{value}</p>
                  <p className="text-xs text-text-muted mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Büroadresse">
            <div className="p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-semibold">CarRental GmbH</p>
              <p className="text-text-secondary mt-2">Musterstraße 12</p>
              <p className="text-text-secondary">76131 Karlsruhe</p>
              <p className="text-text-secondary">Deutschland</p>
            </div>
            <p className="text-sm text-text-muted mt-3">Das Büro ist nur nach vorheriger Terminvereinbarung zugänglich. Bitte kontaktieren Sie uns im Voraus.</p>
          </Section>
          <Section title="Schreiben Sie uns">
            <p className="mb-4">Füllen Sie das Formular aus und wir melden uns so bald wie möglich.</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">Name</label>
                <input type="text" placeholder="Ihr Name" className="border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-base bg-bg-card outline-none focus:border-brand transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">E-Mail</label>
                <input type="email" placeholder="your@email.com" className="border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-base bg-bg-card outline-none focus:border-brand transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">Betreff</label>
                <input type="text" placeholder="Betreff Ihrer Anfrage" className="border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-base bg-bg-card outline-none focus:border-brand transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">Nachricht</label>
                <textarea rows={5} placeholder="Beschreiben Sie Ihre Frage oder Ihr Problem" className="border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-base bg-bg-card outline-none focus:border-brand transition-colors resize-none" />
              </div>
              <button className="w-full bg-brand text-text-inverse font-semibold py-3 rounded-xl hover:bg-brand-hover transition-colors text-sm">Nachricht senden</button>
              <p className="text-xs text-text-muted text-center">Mit dem Absenden stimmen Sie unserer <a href="/privacy" className="text-brand hover:underline">Datenschutzrichtlinie</a> zu</p>
            </div>
          </Section>
          <Section title="Häufig gestellte Fragen" isLast>
            <p className="text-text-secondary">Bevor Sie uns schreiben, finden Sie vielleicht die Antwort in unserem <a href="/help" className="text-brand hover:underline">Hilfecenter</a>. Dort finden Sie Antworten auf die häufigsten Fragen zu Miete, Zahlung und Versicherung.</p>
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