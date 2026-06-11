export function AboutRu() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">

          <h1 className="text-3xl font-bold text-text-base mb-2">О нас</h1>
          <p className="text-text-muted text-sm mb-8">
            CarRental — платформа для аренды автомобилей напрямую у владельцев
          </p>

          <Section title="Наша миссия">
            <p>
              CarRental создана с одной целью — сделать аренду автомобиля простой, честной и
              доступной. Мы убираем посредников и соединяем арендаторов напрямую с владельцами
              автомобилей по всей Германии.
            </p>
            <p className="mt-3">
              Никаких скрытых комиссий, никакой бюрократии. Только люди, которые хотят
              поехать — и люди, у которых есть машина.
            </p>
          </Section>

          <Section title="Как мы работаем">
            <p>
              Платформа работает как маркетплейс: владельцы размещают свои автомобили,
              арендаторы выбирают подходящий вариант и бронируют напрямую. Мы обеспечиваем
              безопасность сделки, верификацию участников и поддержку на всех этапах аренды.
            </p>
          </Section>

          <Section id="reliability" title="Надёжный сервис">
            <p className="mb-3">Мы делаем всё, чтобы каждая аренда прошла без проблем:</p>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-brand font-bold mt-0.5">—</span>
                <span><strong className="text-text-base">Верификация владельцев.</strong> Каждый владелец проходит проверку документов перед публикацией автомобиля.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand font-bold mt-0.5">—</span>
                <span><strong className="text-text-base">Реальные отзывы.</strong> Только арендаторы, завершившие поездку, могут оставить отзыв.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand font-bold mt-0.5">—</span>
                <span><strong className="text-text-base">Защита платежей.</strong> Средства поступают владельцу только после начала аренды.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand font-bold mt-0.5">—</span>
                <span><strong className="text-text-base">Поддержка 24/7.</strong> Наша команда доступна в любое время для решения вопросов.</span>
              </li>
            </ul>
          </Section>

          <Section title="Цифры">
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { value: '2 400+', label: 'Автомобилей на платформе' },
                { value: '18 000+', label: 'Завершённых поездок' },
                { value: '4.8 ★', label: 'Средний рейтинг владельцев' },
                { value: '12', label: 'Городов Германии' },
              ].map(({ value, label }) => (
                <div key={label} className="p-4 bg-brand-subtle rounded-xl border border-border-default">
                  <p className="text-2xl font-bold text-brand mb-1">{value}</p>
                  <p className="text-sm text-text-muted">{label}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Команда">
            <p>
              Мы — небольшая команда разработчиков и предпринимателей из Карлсруэ. Мы сами
              сталкивались с проблемами аренды автомобилей и решили создать платформу, которой
              доверяем сами.
            </p>
            <p className="mt-3">
              CarRental — это портфельный проект, который развивается и улучшается каждый день.
              Мы открыты к обратной связи и всегда рады вашим предложениям.
            </p>
          </Section>

          <Section title="Контакты" isLast>
            <p className="text-text-secondary">Есть вопросы или предложения?</p>
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

function Section({
  title,
  children,
  isLast = false,
  id,
}: {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={!isLast ? 'mb-8 pb-8 border-b border-border-default' : 'mb-0'}>
      <h2 className="text-lg font-semibold text-text-base mb-3">{title}</h2>
      <div className="text-text-secondary leading-relaxed">{children}</div>
    </section>
  );
}