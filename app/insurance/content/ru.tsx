export  function InsuranceRu() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">

          <h1 className="text-3xl font-bold text-text-base mb-2">Страхование</h1>
          <p className="text-text-muted text-sm mb-8">
            Каждая аренда на платформе CarRental защищена страховкой
          </p>

          <Section title="Базовое страхование">
            <p>
              Каждая аренда автоматически включает базовое страховое покрытие. Оно действует
              на весь период аренды и распространяется на обоих участников сделки — арендатора
              и владельца автомобиля.
            </p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-semibold mb-2">Что входит в базовое покрытие:</p>
              <ul className="space-y-2">
                {[
                  'Гражданская ответственность перед третьими лицами',
                  'Частичное КАСКО — защита от угона, стихийных бедствий, пожара',
                  'Юридическая помощь при ДТП',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand font-bold mt-0.5">—</span>
                    <span className="text-text-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section title="Расширенное страхование">
            <p>
              Для дополнительной защиты арендатор может подключить расширенное страховое
              покрытие при оформлении бронирования.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-brand-subtle">
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Пакет</th>
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Покрытие</th>
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default">Стоимость</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-border-default text-text-secondary font-medium">Базовый</td>
                    <td className="p-3 border border-border-default text-text-secondary">Включён автоматически</td>
                    <td className="p-3 border border-border-default text-text-secondary">Бесплатно</td>
                  </tr>
                  <tr className="bg-bg-page">
                    <td className="p-3 border border-border-default text-text-secondary font-medium">Стандарт</td>
                    <td className="p-3 border border-border-default text-text-secondary">Базовый + полное КАСКО</td>
                    <td className="p-3 border border-border-default text-text-secondary">€5 / день</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border-default text-text-secondary font-medium">Премиум</td>
                    <td className="p-3 border border-border-default text-text-secondary">Стандарт + нулевая франшиза</td>
                    <td className="p-3 border border-border-default text-text-secondary">€10 / день</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Франшиза">
            <p>
              При базовом и стандартном покрытии действует франшиза — сумма, которую арендатор
              оплачивает самостоятельно в случае страхового случая.
            </p>
            <ul className="space-y-2 mt-3">
              <li className="flex gap-2">
                <span className="text-brand font-bold mt-0.5">—</span>
                <span><strong className="text-text-base">Базовый пакет:</strong> франшиза до €1 500.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand font-bold mt-0.5">—</span>
                <span><strong className="text-text-base">Стандарт:</strong> франшиза до €500.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand font-bold mt-0.5">—</span>
                <span><strong className="text-text-base">Премиум:</strong> нулевая франшиза.</span>
              </li>
            </ul>
          </Section>

          <Section title="Что не покрывает страховка">
            <ul className="space-y-2">
              {[
                'Ущерб, причинённый в состоянии алкогольного или наркотического опьянения.',
                'Повреждения, возникшие при использовании автомобиля не по назначению (гонки, бездорожье).',
                'Утрата личных вещей арендатора.',
                'Штрафы за нарушение правил дорожного движения.',
                'Ущерб, умышленно причинённый арендатором.',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand font-bold mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="При наступлении страхового случая">
            <div className="flex flex-col gap-4 mt-2">
              {[
                { num: '01', text: 'Немедленно остановитесь и убедитесь в безопасности всех участников.' },
                { num: '02', text: 'Вызовите полицию и зафиксируйте происшествие документально.' },
                { num: '03', text: 'Сфотографируйте повреждения и место происшествия.' },
                { num: '04', text: 'Свяжитесь с нашей службой поддержки по номеру +49 721 000 0000.' },
                { num: '05', text: 'Заполните форму страхового случая в личном кабинете в течение 24 часов.' },
              ].map(({ num, text }) => (
                <div key={num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-subtle flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand">{num}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed self-center">{text}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Контакты страховой службы" isLast>
            <p className="text-text-secondary">По вопросам страхования обращайтесь:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">CarRental — страховая служба</p>
              <p className="text-text-secondary mt-1">insurance@carrental.de</p>
              <p className="text-text-secondary">+49 721 000 0000 (круглосуточно)</p>
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