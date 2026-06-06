import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-landing-dark-bg text-landing-dark-muted mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Лого и описание */}
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold text-landing-dark-text">
            Car<span className="text-brand-ring">Rental</span>
          </span>
          <p className="text-sm text-landing-dark-muted leading-relaxed">
            Самая быстрорастущая платформа аренды авто в Европе. Найди машину, забронируй и поезжай.
          </p>
        </div>

        {/* Компания */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold text-landing-dark-text uppercase tracking-widest">Компания</p>
          <Link href="#" className="text-sm hover:text-landing-dark-text transition-colors">О нас</Link>
          <Link href="#" className="text-sm hover:text-landing-dark-text transition-colors">Как это работает</Link>
          <Link href="#" className="text-sm hover:text-landing-dark-text transition-colors">Надёжный сервис</Link>
        </div>

        {/* Ресурсы */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold text-landing-dark-text uppercase tracking-widest">Ресурсы</p>
          <Link href="#" className="text-sm hover:text-landing-dark-text transition-colors">Страхование</Link>
          <Link href="#" className="text-sm hover:text-landing-dark-text transition-colors">Мобильные приложения</Link>
          <Link href="#" className="text-sm hover:text-landing-dark-text transition-colors">Центр помощи</Link>
        </div>

        {/* Контакты */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold text-landing-dark-text uppercase tracking-widest">Контакты</p>
          <Link href="#" className="text-sm hover:text-landing-dark-text transition-colors">Связаться с нами</Link>
          <Link href="#" className="text-sm hover:text-landing-dark-text transition-colors">Политика конфиденциальности</Link>
          <Link href="#" className="text-sm hover:text-landing-dark-text transition-colors">Условия использования</Link>
        </div>

      </div>

      {/* Нижняя строка */}
      <div className="border-t border-landing-dark-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-landing-dark-muted">© CarRental 2024–2025. Все права защищены.</p>
          <div className="flex items-center gap-3">
            {['X', 'f', '▶', '📷', 'in'].map((icon) => (
              <button
                key={icon}
                className="w-8 h-8 rounded-lg bg-landing-dark-card hover:bg-landing-dark-border flex items-center justify-center text-xs text-landing-dark-muted hover:text-landing-dark-text transition-colors"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}