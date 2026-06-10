export default function MobilePage() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">

          <h1 className="text-3xl font-bold text-text-base mb-2">Мобильные приложения</h1>
          <p className="text-text-muted text-sm mb-8">
            CarRental всегда под рукой — арендуй и управляй прямо со смартфона
          </p>

          <Section title="Приложение CarRental">
            <p>
              Мобильное приложение CarRental доступно для iOS и Android. Все функции платформы —
              поиск, бронирование, управление арендой и общение с владельцами — в одном месте.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 p-5 border border-border-default rounded-xl flex flex-col gap-3">
                <p className="font-semibold text-text-base">App Store</p>
                <p className="text-sm text-text-muted">iOS 15.0 и выше</p>
                <div className="mt-auto pt-3 border-t border-border-default">
                  <p className="text-xs text-text-muted">Приложение находится в разработке</p>
                </div>
              </div>
              <div className="flex-1 p-5 border border-border-default rounded-xl flex flex-col gap-3">
                <p className="font-semibold text-text-base">Google Play</p>
                <p className="text-sm text-text-muted">Android 9.0 и выше</p>
                <div className="mt-auto pt-3 border-t border-border-default">
                  <p className="text-xs text-text-muted">Приложение находится в разработке</p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Возможности приложения">
            <div className="flex flex-col gap-4 mt-2">
              {[
                {
                  title: 'Поиск и фильтрация',
                  desc: 'Ищи автомобили по городу, датам, типу топлива и цене. Смотри фото и отзывы прямо в приложении.',
                },
                {
                  title: 'Мгновенное бронирование',
                  desc: 'Отправляй заявки и получай подтверждение владельца в реальном времени. Уведомления приходят мгновенно.',
                },
                {
                  title: 'Управление арендами',
                  desc: 'Просматривай активные и завершённые аренды, отменяй бронирования и оставляй отзывы.',
                },
                {
                  title: 'Безопасные платежи',
                  desc: 'Оплачивай аренду через приложение с помощью карты или Apple Pay / Google Pay.',
                },
                {
                  title: 'Чат с владельцем',
                  desc: 'Задавай вопросы владельцу напрямую и договаривайся о деталях передачи автомобиля.',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                  <div>
                    <p className="font-semibold text-text-base mb-1">{title}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Для владельцев автомобилей">
            <p>
              Владельцы могут управлять своими объявлениями прямо из приложения: обновлять
              календарь доступности, принимать заявки на аренду и отслеживать выплаты.
            </p>
            <ul className="space-y-2 mt-3">
              {[
                'Добавление и редактирование объявлений с фотографиями.',
                'Управление календарём доступности.',
                'Подтверждение и отклонение заявок.',
                'История выплат и статистика.',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand font-bold mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Веб-версия">
            <p>
              Если вы предпочитаете использовать платформу через браузер, веб-версия CarRental
              полностью адаптирована для мобильных устройств и работает на любом смартфоне
              без установки приложения.
            </p>
          </Section>

          <Section title="Остались вопросы?" isLast>
            <p className="text-text-secondary">По вопросам работы приложения обращайтесь:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">Служба поддержки CarRental</p>
              <p className="text-text-secondary mt-1">support@carrental.de</p>
              <p className="text-text-secondary">Ответим в течение 2 часов</p>
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