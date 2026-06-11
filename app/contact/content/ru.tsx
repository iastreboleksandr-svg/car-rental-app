export function ContactRu() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Связаться с нами</h1>
          <p className="text-text-muted text-sm mb-8">
            Мы всегда рады помочь — выберите удобный способ связи
          </p>

          <Section title="Способы связи">
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              {[
                {
                  title: 'Электронная почта',
                  value: 'support@carrental.de',
                  desc: 'Ответим в течение 2 часов',
                },
                {
                  title: 'Телефон',
                  value: '+49 721 000 0000',
                  desc: 'Пн–Пт, 9:00–18:00',
                },
                {
                  title: 'По вопросам страхования',
                  value: 'insurance@carrental.de',
                  desc: 'Круглосуточно',
                },
                {
                  title: 'По юридическим вопросам',
                  value: 'legal@carrental.de',
                  desc: 'Ответим в течение 24 часов',
                },
              ].map(({ title, value, desc }) => (
                <div key={title} className="p-4 border border-border-default rounded-xl">
                  <p className="text-xs text-text-muted mb-1">{title}</p>
                  <p className="font-semibold text-text-base">{value}</p>
                  <p className="text-xs text-text-muted mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Адрес офиса">
            <div className="p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-semibold">CarRental GmbH</p>
              <p className="text-text-secondary mt-2">Musterstraße 12</p>
              <p className="text-text-secondary">76131 Karlsruhe</p>
              <p className="text-text-secondary">Deutschland</p>
            </div>
            <p className="text-sm text-text-muted mt-3">
              Офис работает по предварительной записи. Пожалуйста, свяжитесь с нами заранее.
            </p>
          </Section>

          <Section title="Написать нам">
            <p className="mb-4">Заполните форму ниже и мы свяжемся с вами в ближайшее время.</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">Имя</label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-base bg-bg-card outline-none focus:border-brand transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-base bg-bg-card outline-none focus:border-brand transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">Тема</label>
                <input
                  type="text"
                  placeholder="Тема обращения"
                  className="border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-base bg-bg-card outline-none focus:border-brand transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-muted">Сообщение</label>
                <textarea
                  rows={5}
                  placeholder="Опишите ваш вопрос или проблему"
                  className="border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-base bg-bg-card outline-none focus:border-brand transition-colors resize-none"
                />
              </div>
              <button className="w-full bg-brand text-text-inverse font-semibold py-3 rounded-xl hover:bg-brand-hover transition-colors text-sm">
                Отправить сообщение
              </button>
              <p className="text-xs text-text-muted text-center">
                Отправляя форму, вы соглашаетесь с нашей{' '}
                <a href="/privacy" className="text-brand hover:underline">
                  Политикой конфиденциальности
                </a>
              </p>
            </div>
          </Section>

          <Section title="Часто задаваемые вопросы" isLast>
            <p className="text-text-secondary">
              Прежде чем писать нам, возможно вы найдёте ответ в нашем{' '}
              <a href="/help" className="text-brand hover:underline">
                Центре помощи
              </a>
              . Там собраны ответы на самые частые вопросы об аренде, оплате и страховании.
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
    <section className={!isLast ? 'mb-8 pb-8 border-b border-border-default' : 'mb-0'}>
      <h2 className="text-lg font-semibold text-text-base mb-3">{title}</h2>
      <div className="text-text-secondary leading-relaxed">{children}</div>
    </section>
  );
}
