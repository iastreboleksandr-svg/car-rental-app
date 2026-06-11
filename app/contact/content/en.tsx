export function ContactEn() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Contact us</h1>
          <p className="text-text-muted text-sm mb-8">We are always happy to help — choose your preferred contact method</p>
          <Section title="Contact Options">
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              {[
                { title: 'Email', value: 'support@carrental.de', desc: 'Reply within 2 hours' },
                { title: 'Phone', value: '+49 721 000 0000', desc: 'Mon–Fri, 9:00–18:00' },
                { title: 'Insurance inquiries', value: 'insurance@carrental.de', desc: 'Around the clock' },
                { title: 'Legal inquiries', value: 'legal@carrental.de', desc: 'Reply within 24 hours' },
              ].map(({ title, value, desc }) => (
                <div key={title} className="p-4 border border-border-default rounded-xl">
                  <p className="text-xs text-text-muted mb-1">{title}</p>
                  <p className="font-semibold text-text-base">{value}</p>
                  <p className="text-xs text-text-muted mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Office Address">
            <div className="p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-semibold">CarRental GmbH</p>
              <p className="text-text-secondary mt-2">Musterstraße 12</p>
              <p className="text-text-secondary">76131 Karlsruhe</p>
              <p className="text-text-secondary">Deutschland</p>
            </div>
            <p className="text-sm text-text-muted mt-3">The office is open by appointment only. Please contact us in advance.</p>
          </Section>
          <Section title="Write to us">
            <p className="mb-4">Fill in the form below and we will get back to you as soon as possible.</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">Name</label>
                <input type="text" placeholder="Your name" className="border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-base bg-bg-card outline-none focus:border-brand transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">Email</label>
                <input type="email" placeholder="your@email.com" className="border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-base bg-bg-card outline-none focus:border-brand transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">Subject</label>
                <input type="text" placeholder="Subject of your inquiry" className="border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-base bg-bg-card outline-none focus:border-brand transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">Message</label>
                <textarea rows={5} placeholder="Describe your question or problem" className="border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-base bg-bg-card outline-none focus:border-brand transition-colors resize-none" />
              </div>
              <button className="w-full bg-brand text-text-inverse font-semibold py-3 rounded-xl hover:bg-brand-hover transition-colors text-sm">Send message</button>
              <p className="text-xs text-text-muted text-center">By submitting you agree to our <a href="/privacy" className="text-brand hover:underline">Privacy Policy</a></p>
            </div>
          </Section>
          <Section title="Frequently Asked Questions" isLast>
            <p className="text-text-secondary">Before writing to us, you may find the answer in our <a href="/help" className="text-brand hover:underline">Help Center</a>. There you will find answers to the most common questions about rental, payment and insurance.</p>
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