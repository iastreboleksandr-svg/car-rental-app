export function HowItWorksDe() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">So funktioniert's</h1>
          <p className="text-text-muted text-sm mb-8">Fahrzeugvermietung direkt vom Eigentümer — einfach und sicher</p>
          <Section title="Für Mieter">
            <div className="flex flex-col gap-6 mt-2">
              {[
                { num: '01', title: 'Fahrzeug finden', desc: 'Gib Stadt, Mietdaten und gewünschte Parameter ein. Die Plattform zeigt verfügbare Fahrzeuge in deiner Nähe mit echten Bewertungen und Fotos.' },
                { num: '02', title: 'Anfrage senden', desc: 'Wähle ein passendes Fahrzeug und sende eine Buchungsanfrage. Der Eigentümer erhält eine Benachrichtigung und antwortet innerhalb einer Stunde.' },
                { num: '03', title: 'Miete bezahlen', desc: 'Nach Bestätigung durch den Eigentümer bezahle die Miete über das sichere Zahlungssystem. Die Gelder werden bis zum Mietbeginn eingefroren.' },
                { num: '04', title: 'Fahrzeug abholen', desc: 'Triff den Eigentümer am vereinbarten Ort, überprüfe das Fahrzeug und nimm die Schlüssel. Gute Fahrt!' },
                { num: '05', title: 'Zurückgeben und bewerten', desc: 'Gib das Fahrzeug pünktlich und im gleichen Zustand zurück. Nach Abschluss der Miete kannst du eine ehrliche Bewertung hinterlassen.' },
              ].map(({ num, title, desc }) => (
                <div key={num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-subtle flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand">{num}</span>
                  </div>
                  <div><p className="font-semibold text-text-base mb-1">{title}</p><p className="text-text-secondary text-sm leading-relaxed">{desc}</p></div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Für Eigentümer">
            <div className="flex flex-col gap-6 mt-2">
              {[
                { num: '01', title: 'Registrieren und verifizieren', desc: 'Erstelle ein Eigentümerkonto und lass deine Dokumente verifizieren. Das dauert nicht mehr als 10 Minuten.' },
                { num: '02', title: 'Fahrzeug hinzufügen', desc: 'Fülle die Fahrzeugbeschreibung aus, lade Fotos hoch und lege deinen Tagespreis fest. Du entscheidest selbst, an wen du vermietest.' },
                { num: '03', title: 'Buchungen verwalten', desc: 'Erhalte Anfragen von Mietern, bestätige oder lehne sie ab. Verwalte den Verfügbarkeitskalender nach deinem Zeitplan.' },
                { num: '04', title: 'Zahlung erhalten', desc: 'Nach Mietbeginn wird der Betrag automatisch auf dein Konto überwiesen. Keine Verzögerungen, keine versteckten Gebühren.' },
              ].map(({ num, title, desc }) => (
                <div key={num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-subtle flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand">{num}</span>
                  </div>
                  <div><p className="font-semibold text-text-base mb-1">{title}</p><p className="text-text-secondary text-sm leading-relaxed">{desc}</p></div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Transaktionssicherheit">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Die Gelder des Mieters werden bis zum Mietbeginn eingefroren und gehen erst danach an den Eigentümer.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Alle Plattformteilnehmer werden persönlich verifiziert.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Bei Streitigkeiten klärt unser Support die Situation innerhalb von 24 Stunden.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Jede Miete wird durch eine Basisversicherung abgedeckt.</span></li>
            </ul>
          </Section>
          <Section title="Häufig gestellte Fragen">
            <div className="flex flex-col gap-5 mt-2">
              {[
                { q: 'Brauche ich einen Führerschein zur Registrierung?', a: 'Ja, für die Fahrzeugmiete ist ein gültiger Führerschein erforderlich. Er wird bei der Kontoverifizierung geprüft.' },
                { q: 'Wie storniere ich eine Buchung?', a: 'Eine Buchung kann im persönlichen Konto unter „Meine Buchungen" storniert werden. Die Rückerstattungsbedingungen hängen von der Zeit bis zum Mietbeginn ab.' },
                { q: 'Was tun bei einem Unfall?', a: 'Kontaktieren Sie sofort unseren Support und rufen Sie die Polizei. Alle Vorfälle müssen dokumentiert werden.' },
                { q: 'Kann ich ein Auto in einer anderen Stadt mieten?', a: 'Ja, die Plattform ist in 12 deutschen Städten verfügbar. Der Übergabeort ist in der jeweiligen Anzeige angegeben.' },
              ].map(({ q, a }) => (
                <div key={q}><p className="font-semibold text-text-base mb-1">{q}</p><p className="text-text-secondary text-sm leading-relaxed">{a}</p></div>
              ))}
            </div>
          </Section>
          <Section title="Noch Fragen?" isLast>
            <p className="text-text-secondary">Unser Support ist jederzeit für Sie da.</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">Hilfecenter</p>
              <p className="text-text-secondary mt-1">support@carrental.de</p>
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