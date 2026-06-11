export function TermsRu() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">

          <h1 className="text-3xl font-bold text-text-base mb-2">
            Условия использования
          </h1>
          <p className="text-text-muted text-sm mb-8">
            Последнее обновление: 1 января 2025 г.
          </p>

          <Section title="1. Предмет соглашения">
            <p>
              Настоящие Условия использования регулируют отношения между CarRental GmbH 
              («Платформа») и пользователями — арендаторами и владельцами автомобилей. 
              Регистрируясь на платформе, вы принимаете данные условия в полном объёме.
            </p>
          </Section>

          <Section title="2. Регистрация и учётная запись">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Для регистрации необходимо быть не моложе 18 лет и иметь действующее водительское удостоверение.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Вы обязаны предоставлять достоверные данные и своевременно обновлять их.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Учётная запись является личной и не может передаваться третьим лицам.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Вы несёте ответственность за все действия, совершённые с вашей учётной записи.</span></li>
            </ul>
          </Section>

          <Section title="3. Бронирование и оплата">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Бронирование считается подтверждённым после получения уведомления от платформы и списания оплаты.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Оплата производится в евро (EUR) через защищённые платёжные сервисы.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Стоимость аренды включает базовую страховку, если иное не указано в описании автомобиля.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Дополнительные сборы (топливо, штрафы, ущерб) оплачиваются отдельно.</span></li>
            </ul>
          </Section>

          <Section title="4. Отмена и возврат средств">
            <div className="overflow-x-auto">
              <table className="w-full text-sm mt-2 border-collapse">
                <thead>
                  <tr className="bg-brand-subtle">
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default rounded-tl-lg">Срок до начала аренды</th>
                    <th className="text-left p-3 text-text-base font-semibold border border-border-default rounded-tr-lg">Возврат</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-border-default text-text-secondary">Более 48 часов</td>
                    <td className="p-3 border border-border-default text-text-secondary">100%</td>
                  </tr>
                  <tr className="bg-bg-page">
                    <td className="p-3 border border-border-default text-text-secondary">От 24 до 48 часов</td>
                    <td className="p-3 border border-border-default text-text-secondary">50%</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border-default text-text-secondary">Менее 24 часов</td>
                    <td className="p-3 border border-border-default text-text-secondary">Возврат не предусмотрен</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="5. Обязанности арендатора">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Использовать автомобиль строго в соответствии с условиями аренды.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Не передавать управление третьим лицам, не указанным в договоре.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Соблюдать правила дорожного движения и нести ответственность за штрафы.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Вернуть автомобиль в оговорённое время и в том же состоянии.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Незамедлительно сообщить о любом ДТП или повреждении автомобиля.</span></li>
            </ul>
          </Section>

          <Section title="6. Обязанности владельца автомобиля">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Предоставлять достоверное описание автомобиля и актуальные фотографии.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Передавать автомобиль в исправном, чистом состоянии с полным баком топлива.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Обеспечить наличие действующей страховки на весь период аренды.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Не отменять подтверждённые бронирования без уважительной причины.</span></li>
            </ul>
          </Section>

          <Section title="7. Ответственность платформы">
            <p>
              CarRental является посредником между арендаторами и владельцами автомобилей. 
              Платформа не несёт ответственности за действия пользователей, состояние 
              автомобилей или убытки, возникшие в процессе аренды. Максимальная ответственность 
              платформы ограничена суммой комиссии, полученной по конкретной сделке.
            </p>
          </Section>

          <Section title="8. Запрещённые действия">
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Использование автомобиля в коммерческих целях (такси, доставка) без разрешения.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Вождение в состоянии алкогольного или наркотического опьянения.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Участие в гонках или иных соревнованиях.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Курение в автомобиле, если это не разрешено владельцем.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Перевозка животных без явного согласия владельца.</span></li>
            </ul>
          </Section>

          <Section title="9. Применимое право">
            <p>
              Настоящие Условия регулируются законодательством Федеративной Республики 
              Германия. Споры рассматриваются в судах по месту нахождения CarRental GmbH — 
              г. Карлсруэ.
            </p>
          </Section>

          <Section title="10. Изменения условий">
            <p>
              Мы оставляем за собой право изменять настоящие Условия. Об изменениях мы 
              уведомим вас по электронной почте не менее чем за 14 дней до их вступления в силу. 
              Продолжение использования платформы после вступления изменений в силу означает 
              ваше согласие с новыми условиями.
            </p>
          </Section>

          <Section title="11. Контакты" isLast>
            <p className="text-text-secondary">По вопросам, связанным с условиями использования:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">CarRental GmbH</p>
              <p className="text-text-secondary mt-1">legal@carrental.de</p>
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
}: {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <section className={!isLast ? "mb-8 pb-8 border-b border-border-default" : "mb-0"}>
      <h2 className="text-lg font-semibold text-text-base mb-3">{title}</h2>
      <div className="text-text-secondary leading-relaxed">{children}</div>
    </section>
  );
}