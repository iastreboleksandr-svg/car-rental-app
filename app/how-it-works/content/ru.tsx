export function HowItWorksRu() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">

          <h1 className="text-3xl font-bold text-text-base mb-2">Как это работает</h1>
          <p className="text-text-muted text-sm mb-8">
            Аренда автомобиля напрямую у владельца — просто и безопасно
          </p>

          <Section title="Для арендаторов">
            <div className="flex flex-col gap-6 mt-2">
              {[
                {
                  num: '01',
                  title: 'Найди автомобиль',
                  desc: 'Укажи город, даты аренды и желаемые параметры. Платформа покажет доступные автомобили рядом с тобой с реальными отзывами и фотографиями.',
                },
                {
                  num: '02',
                  title: 'Отправь заявку',
                  desc: 'Выбери подходящий автомобиль и отправь запрос на бронирование. Владелец получит уведомление и ответит в течение часа.',
                },
                {
                  num: '03',
                  title: 'Оплати аренду',
                  desc: 'После подтверждения владельца оплати аренду через защищённую платёжную систему. Средства заморожены до начала аренды.',
                },
                {
                  num: '04',
                  title: 'Получи автомобиль',
                  desc: 'Встреться с владельцем в оговорённом месте, осмотри автомобиль и получи ключи. Удачной поездки!',
                },
                {
                  num: '05',
                  title: 'Верни и оставь отзыв',
                  desc: 'Верни автомобиль в срок и в том же состоянии. После завершения аренды ты можешь оставить честный отзыв о владельце.',
                },
              ].map(({ num, title, desc }) => (
                <div key={num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-subtle flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand">{num}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-text-base mb-1">{title}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Для владельцев">
            <div className="flex flex-col gap-6 mt-2">
              {[
                {
                  num: '01',
                  title: 'Зарегистрируйся и верифицируйся',
                  desc: 'Создай учётную запись владельца и пройди верификацию документов. Это занимает не более 10 минут.',
                },
                {
                  num: '02',
                  title: 'Добавь автомобиль',
                  desc: 'Заполни описание автомобиля, загрузи фотографии и установи свою цену за день аренды. Ты сам решаешь, кому сдавать.',
                },
                {
                  num: '03',
                  title: 'Управляй бронированиями',
                  desc: 'Получай заявки от арендаторов, подтверждай или отклоняй их. Настраивай календарь доступности под свой график.',
                },
                {
                  num: '04',
                  title: 'Получай оплату',
                  desc: 'После начала аренды средства автоматически поступают на твой счёт. Никаких задержек и скрытых комиссий.',
                },
              ].map(({ num, title, desc }) => (
                <div key={num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-subtle flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand">{num}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-text-base mb-1">{title}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Безопасность сделки">
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-brand font-bold mt-0.5">—</span>
                <span>Средства арендатора заморожены до начала аренды и поступают владельцу только после её старта.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand font-bold mt-0.5">—</span>
                <span>Все участники платформы проходят верификацию личности.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand font-bold mt-0.5">—</span>
                <span>В случае спорных ситуаций наша служба поддержки разберётся в течение 24 часов.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand font-bold mt-0.5">—</span>
                <span>Каждая аренда сопровождается базовой страховкой.</span>
              </li>
            </ul>
          </Section>

          <Section title="Часто задаваемые вопросы">
            <div className="flex flex-col gap-5 mt-2">
              {[
                {
                  q: 'Нужно ли водительское удостоверение для регистрации?',
                  a: 'Да, для аренды автомобиля необходимо действующее водительское удостоверение. Оно проверяется при верификации учётной записи.',
                },
                {
                  q: 'Как отменить бронирование?',
                  a: 'Отменить бронирование можно в личном кабинете в разделе «Мои брони». Условия возврата зависят от времени до начала аренды — подробнее в Условиях использования.',
                },
                {
                  q: 'Что делать при ДТП?',
                  a: 'Немедленно свяжитесь с нашей службой поддержки и вызовите полицию. Все инциденты должны быть задокументированы.',
                },
                {
                  q: 'Можно ли арендовать автомобиль в другом городе?',
                  a: 'Да, платформа работает в 12 городах Германии. Место передачи автомобиля указывается в описании каждого объявления.',
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <p className="font-semibold text-text-base mb-1">{q}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Остались вопросы?" isLast>
            <p className="text-text-secondary">Наша служба поддержки готова помочь в любое время.</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">Центр помощи</p>
              <p className="text-text-secondary mt-1">support@lunarcarsharing.de</p>
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