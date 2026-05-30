'use client';

import Link from 'next/link';
import { Car, Shield, Star, Clock, MapPin, ChevronRight, CheckCircle } from 'lucide-react';

// ─── Данные ──────────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: '01',
    title: 'Найди машину',
    desc: 'Укажи город, даты и фильтры. Мы покажем доступные машины рядом с тобой.',
  },
  {
    num: '02',
    title: 'Забронируй',
    desc: 'Отправь заявку владельцу. Оплата наличными при получении — никаких скрытых комиссий.',
  },
  {
    num: '03',
    title: 'Поезжай',
    desc: 'Встреться с владельцем, получи ключи и отправляйся в путь.',
  },
];

const STATS = [
  { value: '2,400+', label: 'Автомобилей' },
  { value: '18,000+', label: 'Поездок' },
  { value: '4.8', label: 'Средний рейтинг' },
  { value: '12', label: 'Городов Германии' },
];

const FEATURES = [
  {
    icon: <Shield size={20} />,
    title: 'Проверенные владельцы',
    desc: 'Каждый владелец верифицирован. Отзывы реальных арендаторов.',
  },
  {
    icon: <Clock size={20} />,
    title: 'Быстрое бронирование',
    desc: 'Заявка за 2 минуты. Владельцы отвечают в течение часа.',
  },
  {
    icon: <MapPin size={20} />,
    title: 'По всей Германии',
    desc: 'Берлин, Мюнхен, Гамбург, Франкфурт и ещё 8 городов.',
  },
  {
    icon: <Star size={20} />,
    title: 'Честные отзывы',
    desc: 'Только реальные оценки от арендаторов после поездки.',
  },
];

const CARS = [
  {
    name: 'BMW 3 Series',
    year: 2022,
    price: 65,
    rating: 4.9,
    reviews: 34,
    fuel: 'Бензин',
    city: 'Берлин',
  },
  {
    name: 'Volkswagen Golf',
    year: 2023,
    price: 45,
    rating: 4.7,
    reviews: 21,
    fuel: 'Электро',
    city: 'Мюнхен',
  },
  {
    name: 'Mercedes C-Class',
    year: 2021,
    price: 80,
    rating: 5.0,
    reviews: 18,
    fuel: 'Дизель',
    city: 'Гамбург',
  },
];

// ─── Компоненты ───────────────────────────────────────────────────────────────

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={s <= Math.round(rating) ? '#f59e0b' : '#e5e7eb'}
            stroke={s <= Math.round(rating) ? '#f59e0b' : '#d1d5db'}
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

// ─── Страница ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Навигация ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#48C964] flex items-center justify-center">
              <Car size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              Car<span className="text-[#48C964]">Rental</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#how" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Как это работает
            </a>
            <a href="#cars" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Машины
            </a>
            <a
              href="#owners"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Владельцам
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Войти
            </Link>
            <Link
              href="/login?tab=register"
              className="bg-[#48C964] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#32a84d] transition-colors"
            >
              Начать
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Левая колонка */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#48C964]/10 text-[#2a9043] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#48C964] animate-pulse" />
                Доступно в 12 городах Германии
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
                Арендуй машину{' '}
                <span className="text-[#48C964] relative">
                  напрямую
                  <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6">
                    <path
                      d="M0 5 Q100 0 200 5"
                      stroke="#48C964"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                у владельца
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                Без посредников. Без лишних комиссий. Тысячи машин от проверенных владельцев по всей
                Германии.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/search"
                  className="flex items-center justify-center gap-2 bg-[#48C964] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#32a84d] transition-colors"
                >
                  Найти машину
                  <ChevronRight size={18} />
                </Link>
                <Link
                  href="/login?tab=register"
                  className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Сдать свою машину
                </Link>
              </div>

              {/* Соц. доказательство */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {['ОВ', 'АП', 'МР', 'ДС'].map((init) => (
                    <div
                      key={init}
                      className="w-8 h-8 rounded-full bg-[#48C964]/20 border-2 border-white flex items-center justify-center text-xs font-bold text-[#2a9043]"
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="14" height="14" viewBox="0 0 24 24">
                        <polygon
                          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                          fill="#f59e0b"
                          stroke="#f59e0b"
                          strokeWidth="1"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    <strong className="text-gray-800">18,000+</strong> довольных арендаторов
                  </p>
                </div>
              </div>
            </div>

            {/* Правая колонка — карточка машины */}
            <div className="relative">
              {/* Декоративный круг */}
              <div className="absolute inset-0 bg-[#48C964]/5 rounded-3xl" />

              <div className="relative p-8">
                {/* Карточка машины */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 mb-4">
                  <div className="w-full h-40 bg-[#f0fdf3] rounded-xl flex items-center justify-center mb-4">
                    <Car size={64} className="text-[#48C964]" />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-gray-900">BMW 3 Series 2022</p>
                      <p className="text-sm text-gray-400">Берлин · Бензин · Автомат</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#48C964]">€65</p>
                      <p className="text-xs text-gray-400">/ день</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRow rating={4.9} />
                    <span className="text-xs text-gray-400">4.9 (34 отзыва)</span>
                  </div>
                  <Link
                    href="/search"
                    className="mt-4 w-full flex items-center justify-center bg-[#48C964] text-white font-semibold py-3 rounded-xl hover:bg-[#32a84d] transition-colors"
                  >
                    Забронировать
                  </Link>
                </div>

                {/* Флоат карточка */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#48C964]" />
                  <span className="text-xs font-semibold text-gray-700">
                    Владелец верифицирован
                  </span>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
                  <p className="text-xs text-gray-400">Ответ владельца</p>
                  <p className="text-xs font-semibold text-gray-700">~45 минут</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Статистика ── */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Как это работает ── */}
      <section id="how" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#48C964] uppercase tracking-widest mb-3">
              Как это работает
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Три простых шага</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Найди машину, забронируй и поезжай. Всё просто.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="relative">
                <div className="w-12 h-12 rounded-2xl bg-[#48C964]/10 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-[#48C964]">{num}</span>
                </div>
                {/* Линия между шагами */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Популярные машины ── */}
      <section id="cars" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-[#48C964] uppercase tracking-widest mb-3">
                Популярные
              </p>
              <h2 className="text-4xl font-bold text-gray-900">Машины рядом с тобой</h2>
            </div>
            <Link
              href="/search"
              className="hidden md:flex items-center gap-1 text-sm text-[#48C964] font-semibold hover:gap-2 transition-all"
            >
              Смотреть все <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CARS.map((car) => (
              <div
                key={car.name}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#48C964]/30 transition-all group"
              >
                <div className="h-44 bg-[#f0fdf3] flex items-center justify-center group-hover:bg-[#48C964]/10 transition-colors">
                  <Car size={56} className="text-[#48C964]" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-bold text-gray-900">{car.name}</p>
                    <p className="text-lg font-bold text-[#48C964]">
                      €{car.price}
                      <span className="text-xs font-normal text-gray-400">/д</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    {car.city} · {car.year} · {car.fuel}
                  </p>
                  <div className="flex items-center gap-2">
                    <StarRow rating={car.rating} />
                    <span className="text-xs text-gray-400">
                      {car.rating} ({car.reviews})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/search"
              className="inline-flex items-center gap-1 text-sm text-[#48C964] font-semibold"
            >
              Смотреть все машины <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Преимущества ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#48C964] uppercase tracking-widest mb-3">
              Почему мы
            </p>
            <h2 className="text-4xl font-bold text-gray-900">Надёжно и удобно</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-[#48C964]/30 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#48C964]/10 flex items-center justify-center text-[#48C964] mb-4">
                  {icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Для владельцев ── */}
      <section id="owners" className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-[#48C964] uppercase tracking-widest mb-4">
                Для владельцев
              </p>
              <h2 className="text-4xl font-bold text-white mb-6">
                Твоя машина стоит — она могла бы зарабатывать
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Сдавай машину когда не пользуешься. Ты сам устанавливаешь цену и выбираешь
                арендаторов. Мы берём минимальную комиссию.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  'Ты сам выбираешь кому сдавать',
                  'Устанавливаешь свои цены',
                  'Получаешь оплату наличными',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#48C964] shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/login?tab=register"
                className="inline-flex items-center gap-2 bg-[#48C964] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#32a84d] transition-colors"
              >
                Добавить машину
                <ChevronRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '€800', label: 'Средний доход в месяц', sub: 'при 16 днях аренды' },
                { value: '< 1ч', label: 'Время ответа', sub: 'среднее по платформе' },
                { value: '4.8★', label: 'Рейтинг платформы', sub: 'от владельцев' },
                { value: '0%', label: 'Скрытых комиссий', sub: 'только честные условия' },
              ].map(({ value, label, sub }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-2xl font-bold text-[#48C964] mb-1">{value}</p>
                  <p className="text-sm font-semibold text-white mb-1">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-[#48C964]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Готов к поездке?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Тысячи машин ждут тебя. Найди свою за 2 минуты.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/search"
              className="flex items-center justify-center gap-2 bg-white text-[#2a9043] font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Найти машину
              <ChevronRight size={18} />
            </Link>
            <Link
              href="/login?tab=register"
              className="flex items-center justify-center gap-2 bg-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/30 transition-colors border border-white/30"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </section>

      {/* ── Футер ── */}
      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#48C964] flex items-center justify-center">
              <Car size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-900">
              Car<span className="text-[#48C964]">Rental</span>
            </span>
          </div>
          <p className="text-sm text-gray-400">© 2025 CarRental. Германия.</p>
          <div className="flex gap-6">
            <Link
              href="/search"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Поиск
            </Link>
            <Link
              href="/login"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Войти
            </Link>
            <Link
              href="/login?tab=register"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
