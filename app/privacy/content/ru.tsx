export function PrivacyRu() {
  return (
    <main className="min-h-screen bg-bg-page py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-bg-card rounded-2xl border border-border-default p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-text-base mb-2">
            Политика конфиденциальности
          </h1>
          <p className="text-text-muted text-sm mb-8">
            Последнее обновление: 1 января 2025 г.
          </p>
          <Section title="1. Общие положения">
            <p>
              Настоящая Политика конфиденциальности описывает, как Lunar Carsharing («мы», «наш», «нас»)
              собирает, использует и защищает ваши персональные данные при использовании нашей
              платформы аренды автомобилей.
            </p>
            <p className="mt-3">
              Используя наш сервис, вы соглашаетесь с условиями настоящей политики.
              Если вы не согласны с этими условиями, пожалуйста, не используйте платформу.
            </p>
          </Section>
          <Section title="2. Какие данные мы собираем">
            <p className="mb-3">Мы собираем следующие категории персональных данных:</p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Регистрационные данные:</strong> имя, фамилия, адрес электронной почты, номер телефона, дата рождения.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Данные удостоверения личности:</strong> номер водительского удостоверения, срок его действия.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Платёжные данные:</strong> реквизиты банковской карты (обрабатываются защищёнными платёжными провайдерами).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Данные об использовании:</strong> история бронирований, предпочтения, отзывы.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span><strong className="text-text-base">Технические данные:</strong> IP-адрес, тип браузера, cookies, данные о посещаемых страницах.</span></li>
            </ul>
          </Section>
          <Section title="3. Цели обработки данных">
            <p className="mb-3">Ваши данные используются для:</p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Регистрации и управления вашей учётной записью.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Обработки бронирований и платежей.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Связи с вами по вопросам аренды и поддержки.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Улучшения качества нашего сервиса.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Соблюдения требований законодательства.</span></li>
            </ul>
          </Section>
          <Section title="4. Правовые основания обработки">
            <ul className="space-y-2 text-text-secondary mt-3">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Исполнения договора аренды (ст. 6 п. 1 b GDPR).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Вашего согласия (ст. 6 п. 1 a GDPR) — например, для маркетинговых рассылок.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Законных интересов (ст. 6 п. 1 f GDPR) — для улучшения сервиса и безопасности.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Выполнения правовых обязательств (ст. 6 п. 1 c GDPR).</span></li>
            </ul>
          </Section>
          <Section title="5. Передача данных третьим лицам">
            <ul className="space-y-2 text-text-secondary mt-3">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Платёжным провайдерам для обработки транзакций.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Партнёрам — владельцам автомобилей в рамках оформления аренды.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Государственным органам при наличии законного требования.</span></li>
            </ul>
          </Section>
          <Section title="6. Cookies">
            <p className="text-text-secondary">
              Мы используем файлы cookies для обеспечения работы платформы, анализа трафика и
              персонализации контента. Вы можете управлять настройками cookies в вашем браузере.
              Отключение cookies может повлиять на функциональность сайта.
            </p>
          </Section>
          <Section title="7. Хранение данных">
            <p className="text-text-secondary">
              Ваши данные хранятся в течение срока действия вашей учётной записи и
              дополнительно до 3 лет после её удаления. Платёжные документы хранятся 10 лет
              согласно требованиям немецкого налогового законодательства (§ 147 AO).
            </p>
          </Section>
          <Section title="8. Ваши права">
            <ul className="space-y-2 text-text-secondary">
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Получить доступ к вашим персональным данным (ст. 15 GDPR).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Исправить неточные данные (ст. 16 GDPR).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Удалить ваши данные (ст. 17 GDPR).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Ограничить обработку (ст. 18 GDPR).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Перенести данные (ст. 20 GDPR).</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Отозвать согласие в любой момент.</span></li>
              <li className="flex gap-2"><span className="text-brand font-bold mt-0.5">—</span><span>Подать жалобу в надзорный орган (в Германии — LfDI или BfDI).</span></li>
            </ul>
          </Section>
          <Section title="9. Контакты" isLast>
            <p className="text-text-secondary">По всем вопросам, связанным с обработкой персональных данных:</p>
            <div className="mt-4 p-4 bg-brand-subtle rounded-xl border border-border-default">
              <p className="text-text-base font-medium">Lunar Carsharing GmbH</p>
              <p className="text-text-secondary mt-1">privacy@lunarcarsharing.de</p>
              <p className="text-text-secondary">Karlsruhe, Deutschland</p>
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