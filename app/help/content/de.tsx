export function HelpDe() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Hilfecenter</h1>
          <p className="text-text-muted text-sm mb-8">Antworten auf häufig gestellte Fragen und Support-Kontakte</p>
          <Section title="Registrierung und Konto">
            <div className="flex flex-col gap-5">
              {[
                { q: 'Wie registriere ich mich auf der Plattform?', a: 'Klicken Sie auf „Loslegen" auf der Startseite, füllen Sie das Registrierungsformular aus und bestätigen Sie Ihre E-Mail. Die Dokumentenverifizierung dauert bis zu 24 Stunden.' },
                { q: 'Ich habe mein Passwort vergessen — was soll ich tun?', a: 'Klicken Sie auf der Anmeldeseite auf „Passwort vergessen?" und geben Sie Ihre E-Mail ein. Wir senden Ihnen einen Link zum Zurücksetzen des Passworts.' },
                { q: 'Wie lösche ich mein Konto?', a: 'Gehen Sie zu Einstellungen → Konto → Konto löschen. Bitte beachten Sie: Aktive Buchungen müssen vor der Löschung abgeschlossen sein.' },
              ].map(({ q, a }) => (
                <div key={q}><p className="font-semibold text-text-base mb-1">{q}</p><p className="text-text-secondary text-sm leading-relaxed">{a}</p></div>
              ))}
            </div>
          </Section>
          <Section title="Buchung">
            <div className="flex flex-col gap-5">
              {[
                { q: 'Wie buche ich ein Fahrzeug?', a: 'Suchen Sie ein passendes Fahrzeug über die Suche, wählen Sie die Daten und klicken Sie auf „Buchen". Der Eigentümer erhält eine Benachrichtigung und bestätigt die Anfrage innerhalb einer Stunde.' },
                { q: 'Kann ich die Daten nach der Buchung ändern?', a: 'Datumsänderungen sind nur durch Stornierung der aktuellen Buchung und Erstellung einer neuen möglich. Bitte kontaktieren Sie den Eigentümer im Voraus.' },
                { q: 'Was tun, wenn der Eigentümer nicht antwortet?', a: 'Wenn der Eigentümer nicht innerhalb von 2 Stunden geantwortet hat, wenden Sie sich an den Support. Wir helfen Ihnen, die Situation zu lösen.' },
                { q: 'Wie storniere ich eine Buchung?', a: 'Gehen Sie zum Bereich „Meine Buchungen", wählen Sie die Buchung aus und klicken Sie auf „Stornieren". Die Rückerstattungsbedingungen hängen von der Zeit bis zum Mietbeginn ab.' },
              ].map(({ q, a }) => (
                <div key={q}><p className="font-semibold text-text-base mb-1">{q}</p><p className="text-text-secondary text-sm leading-relaxed">{a}</p></div>
              ))}
            </div>
          </Section>
          <Section title="Zahlung und Erstattung">
            <div className="flex flex-col gap-5">
              {[
                { q: 'Welche Zahlungsmethoden sind verfügbar?', a: 'Wir akzeptieren Bankkarten Visa, Mastercard sowie Apple Pay und Google Pay.' },
                { q: 'Wann wird abgebucht?', a: 'Der Betrag wird bei der Buchung eingefroren und geht erst nach Mietbeginn an den Eigentümer.' },
                { q: 'Wie schnell kommt die Erstattung?', a: 'Erstattungen werden innerhalb von 3–5 Werktagen je nach Ihrer Bank bearbeitet.' },
              ].map(({ q, a }) => (
                <div key={q}><p className="font-semibold text-text-base mb-1">{q}</p><p className="text-text-secondary text-sm leading-relaxed">{a}</p></div>
              ))}
            </div>
          </Section>
          <Section title="Für Eigentümer">
            <div className="flex flex-col gap-5">
              {[
                { q: 'Wie füge ich mein Fahrzeug hinzu?', a: 'Nach der Registrierung als Eigentümer gehen Sie zu „Meine Autos" und klicken auf „Auto hinzufügen". Füllen Sie die Beschreibung aus, laden Sie Fotos hoch und legen Sie den Preis fest.' },
                { q: 'Wie verwalte ich die Verfügbarkeit meines Fahrzeugs?', a: 'Wählen Sie unter „Meine Autos" das Fahrzeug aus und klicken Sie auf „Verfügbarkeit". Dort können Sie benötigte Tage blockieren.' },
                { q: 'Wann erhalte ich die Zahlung?', a: 'Die Auszahlung erfolgt automatisch nach Mietbeginn auf Ihr Konto. Normalerweise dauert das 1–2 Werktage.' },
              ].map(({ q, a }) => (
                <div key={q}><p className="font-semibold text-text-base mb-1">{q}</p><p className="text-text-secondary text-sm leading-relaxed">{a}</p></div>
              ))}
            </div>
          </Section>
          <Section title="Streitfälle">
            <div className="flex flex-col gap-5">
              {[
                { q: 'Was tun bei einem Unfall?', a: 'Rufen Sie sofort die Polizei, dokumentieren Sie den Vorfall und kontaktieren Sie unseren Support unter +49 721 000 0000.' },
                { q: 'Das Fahrzeug entspricht nicht der Beschreibung — was tun?', a: 'Fotografieren Sie die Abweichungen und kontaktieren Sie den Support sofort vor Fahrtbeginn. Wir klären die Situation.' },
                { q: 'Wie reiche ich eine Beschwerde gegen einen Mieter oder Eigentümer ein?', a: 'Schreiben Sie an support@carrental.de mit einer Beschreibung der Situation und Beweisen. Wir bearbeiten die Anfrage innerhalb von 24 Stunden.' },
              ].map(({ q, a }) => (
                <div key={q}><p className="font-semibold text-text-base mb-1">{q}</p><p className="text-text-secondary text-sm leading-relaxed">{a}</p></div>
              ))}
            </div>
          </Section>
          <Section title="Support kontaktieren" isLast>
            <p className="text-text-secondary">Keine Antwort auf Ihre Frage gefunden? Schreiben Sie uns:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">CarRental Support</p>
              <p className="text-text-secondary mt-1">support@carrental.de</p>
              <p className="text-text-secondary">+49 721 000 0000</p>
              <p className="text-text-secondary mt-2 text-xs">Rund um die Uhr erreichbar, Antwort innerhalb von 2 Stunden</p>
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