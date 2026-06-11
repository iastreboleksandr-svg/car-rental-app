export function HelpEn() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Help Center</h1>
          <p className="text-text-muted text-sm mb-8">Answers to frequently asked questions and support contacts</p>
          <Section title="Registration and Account">
            <div className="flex flex-col gap-5">
              {[
                { q: 'How do I register on the platform?', a: 'Click "Get started" on the homepage, fill in the registration form and confirm your email. Document verification takes up to 24 hours.' },
                { q: 'I forgot my password — what should I do?', a: 'On the login page click "Forgot password?" and enter your email. We will send you a password reset link.' },
                { q: 'How do I delete my account?', a: 'Go to Settings → Account → Delete account. Note: active bookings must be completed before deletion.' },
              ].map(({ q, a }) => (
                <div key={q}><p className="font-semibold text-text-base mb-1">{q}</p><p className="text-text-secondary text-sm leading-relaxed">{a}</p></div>
              ))}
            </div>
          </Section>
          <Section title="Booking">
            <div className="flex flex-col gap-5">
              {[
                { q: 'How do I book a car?', a: 'Find a suitable car via search, select dates and click "Book". The owner will receive a notification and confirm the request within an hour.' },
                { q: 'Can I change dates after booking?', a: 'Date changes are only possible by cancelling the current booking and creating a new one. Please contact the owner in advance.' },
                { q: 'What if the owner does not respond?', a: 'If the owner has not responded within 2 hours, contact support. We will help resolve the situation.' },
                { q: 'How do I cancel a booking?', a: 'Go to "My bookings", select the booking and click "Cancel". Refund terms depend on the time before rental start.' },
              ].map(({ q, a }) => (
                <div key={q}><p className="font-semibold text-text-base mb-1">{q}</p><p className="text-text-secondary text-sm leading-relaxed">{a}</p></div>
              ))}
            </div>
          </Section>
          <Section title="Payment and Refunds">
            <div className="flex flex-col gap-5">
              {[
                { q: 'What payment methods are available?', a: 'We accept Visa and Mastercard bank cards as well as Apple Pay and Google Pay.' },
                { q: 'When is the charge made?', a: 'Funds are frozen at the time of booking and transferred to the owner only after the rental starts.' },
                { q: 'How quickly will I receive a refund?', a: 'Refunds are processed within 3–5 business days depending on your bank.' },
              ].map(({ q, a }) => (
                <div key={q}><p className="font-semibold text-text-base mb-1">{q}</p><p className="text-text-secondary text-sm leading-relaxed">{a}</p></div>
              ))}
            </div>
          </Section>
          <Section title="For Owners">
            <div className="flex flex-col gap-5">
              {[
                { q: 'How do I add my car?', a: 'After registering as an owner go to "My cars" and click "Add car". Fill in the description, upload photos and set your price.' },
                { q: 'How do I manage my car availability?', a: 'Under "My cars" select the car and click "Availability". There you can block the dates you need.' },
                { q: 'When will I receive payment?', a: 'Payment is automatically transferred to your account after the rental starts. This usually takes 1–2 business days.' },
              ].map(({ q, a }) => (
                <div key={q}><p className="font-semibold text-text-base mb-1">{q}</p><p className="text-text-secondary text-sm leading-relaxed">{a}</p></div>
              ))}
            </div>
          </Section>
          <Section title="Disputes">
            <div className="flex flex-col gap-5">
              {[
                { q: 'What to do in case of an accident?', a: 'Call the police immediately, document the incident and contact our support at +49 721 000 0000.' },
                { q: 'The car does not match the description — what to do?', a: 'Photograph the discrepancies and contact support immediately before starting the trip. We will sort out the situation.' },
                { q: 'How do I file a complaint against a renter or owner?', a: 'Write to support@carrental.de with a description of the situation and evidence. We will review the request within 24 hours.' },
              ].map(({ q, a }) => (
                <div key={q}><p className="font-semibold text-text-base mb-1">{q}</p><p className="text-text-secondary text-sm leading-relaxed">{a}</p></div>
              ))}
            </div>
          </Section>
          <Section title="Contact Support" isLast>
            <p className="text-text-secondary">Did not find the answer to your question? Write to us:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">CarRental Support</p>
              <p className="text-text-secondary mt-1">support@carrental.de</p>
              <p className="text-text-secondary">+49 721 000 0000</p>
              <p className="text-text-secondary mt-2 text-xs">Available 24/7, reply within 2 hours</p>
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