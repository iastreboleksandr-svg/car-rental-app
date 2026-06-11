export function HelpRu() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">Центр помощи</h1>
          <p className="text-text-muted text-sm mb-8">
            Ответы на часто задаваемые вопросы и контакты поддержки
          </p>

          <Section title="Регистрация и аккаунт">
            <div className="flex flex-col gap-5">
              {[
                {
                  q: 'Как зарегистрироваться на платформе?',
                  a: 'Нажмите кнопку «Начать» на главной странице, заполните форму регистрации и подтвердите email. Верификация документов занимает до 24 часов.',
                },
                {
                  q: 'Забыл пароль — что делать?',
                  a: 'На странице входа нажмите «Забыли пароль?» и введите email. Мы пришлём ссылку для сброса пароля.',
                },
                {
                  q: 'Как удалить аккаунт?',
                  a: 'Перейдите в Настройки → Аккаунт → Удалить аккаунт. Обратите внимание: активные бронирования должны быть завершены перед удалением.',
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <p className="font-semibold text-text-base mb-1">{q}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Бронирование">
            <div className="flex flex-col gap-5">
              {[
                {
                  q: 'Как забронировать автомобиль?',
                  a: 'Найдите подходящий автомобиль через поиск, выберите даты и нажмите «Забронировать». Владелец получит уведомление и подтвердит заявку в течение часа.',
                },
                {
                  q: 'Можно ли изменить даты после бронирования?',
                  a: 'Изменение дат возможно только через отмену текущего бронирования и создание нового. Свяжитесь с владельцем заранее.',
                },
                {
                  q: 'Что делать, если владелец не отвечает?',
                  a: 'Если владелец не ответил в течение 2 часов, обратитесь в службу поддержки. Мы поможем решить ситуацию.',
                },
                {
                  q: 'Как отменить бронирование?',
                  a: 'Перейдите в раздел «Мои брони», выберите бронирование и нажмите «Отменить». Условия возврата зависят от времени до начала аренды.',
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <p className="font-semibold text-text-base mb-1">{q}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Оплата и возврат средств">
            <div className="flex flex-col gap-5">
              {[
                {
                  q: 'Какие способы оплаты доступны?',
                  a: 'Принимаются банковские карты Visa, Mastercard, а также Apple Pay и Google Pay.',
                },
                {
                  q: 'Когда списываются деньги?',
                  a: 'Средства замораживаются в момент бронирования и поступают владельцу только после начала аренды.',
                },
                {
                  q: 'Как быстро придёт возврат?',
                  a: 'Возврат средств обрабатывается в течение 3–5 рабочих дней в зависимости от вашего банка.',
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <p className="font-semibold text-text-base mb-1">{q}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Для владельцев">
            <div className="flex flex-col gap-5">
              {[
                {
                  q: 'Как добавить свой автомобиль?',
                  a: 'После регистрации как владелец перейдите в раздел «Мои машины» и нажмите «Добавить машину». Заполните описание, загрузите фото и установите цену.',
                },
                {
                  q: 'Как настроить доступность автомобиля?',
                  a: 'В разделе «Мои машины» выберите автомобиль и нажмите «Доступность». Там вы можете заблокировать нужные даты.',
                },
                {
                  q: 'Когда я получу оплату?',
                  a: 'Выплата поступает на ваш счёт автоматически после начала аренды. Обычно это занимает 1–2 рабочих дня.',
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <p className="font-semibold text-text-base mb-1">{q}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Спорные ситуации">
            <div className="flex flex-col gap-5">
              {[
                {
                  q: 'Что делать при ДТП?',
                  a: 'Немедленно вызовите полицию, зафиксируйте происшествие и свяжитесь с нашей службой поддержки по номеру +49 721 000 0000.',
                },
                {
                  q: 'Автомобиль не соответствует описанию — что делать?',
                  a: 'Сфотографируйте расхождения и немедленно свяжитесь с поддержкой до начала поездки. Мы разберёмся в ситуации.',
                },
                {
                  q: 'Как подать жалобу на арендатора или владельца?',
                  a: 'Напишите на support@carrental.de с описанием ситуации и приложите доказательства. Мы рассмотрим обращение в течение 24 часов.',
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <p className="font-semibold text-text-base mb-1">{q}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Связаться с поддержкой" isLast>
            <p className="text-text-secondary">Не нашли ответ на свой вопрос? Напишите нам:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">Служба поддержки CarRental</p>
              <p className="text-text-secondary mt-1">support@carrental.de</p>
              <p className="text-text-secondary">+49 721 000 0000</p>
              <p className="text-text-secondary mt-2 text-xs">
                Работаем круглосуточно, ответим в течение 2 часов
              </p>
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
