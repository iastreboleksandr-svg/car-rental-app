'use client';

import Link from 'next/link';
import { Car, Shield, Star, Clock, MapPin, ChevronRight, CheckCircle } from 'lucide-react';

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
  { name: 'BMW 3 Series', year: 2022, price: 65, rating: 4.9, reviews: 34, fuel: 'Бензин', city: 'Берлин' },
  { name: 'Volkswagen Golf', year: 2023, price: 45, rating: 4.7, reviews: 21, fuel: 'Электро', city: 'Мюнхен' },
  { name: 'Mercedes C-Class', year: 2021, price: 80, rating: 5.0, reviews: 18, fuel: 'Дизель', city: 'Гамбург' },
];

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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-card">

      {/* ── Навигация ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-card/90 backdrop-blur-md border-b border-border-default">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-landing-cta-bg flex items-center justify-center">
              <Car size={16} className="text-text-inverse" />
            </div>
            <span className="text-lg font-bold text-text-base">
              Car<span className="text-brand">Rental</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#how" className="text-sm text-text-muted hover:text-text-base transition-colors">Как это работает</a>
            <a href="#cars" className="text-sm text-text-muted hover:text-text-base transition-colors">Машины</a>
            <a href="#owners" className="text-sm text-text-muted hover:text-text-base transition-colors">Владельцам</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-text-secondary hover:text-text-base transition-colors">
              Войти
            </Link>
            <Link
              href="/login?tab=register"
              className="bg-landing-cta-bg text-text-base text-sm font-semibold px-4 py-2 rounded-lg hover:bg-landing-cta-hover transition-colors"
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
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-subtle text-landing-cta-text text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-landing-cta-bg animate-pulse" />
                Доступно в 12 городах Германии
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-text-base leading-tight tracking-tight mb-6">
                Арендуй машину{' '}
                <span className="text-landing-cta-text relative">
                  напрямую
                  <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6">
                    <path d="M0 5 Q100 0 200 5" stroke="var(--landing-cta-bg)" strokeWidth="3" fill="none" opacity="0.4" strokeLinecap="round" />
                  </svg>
                </span>{' '}
                у владельца
              </h1>

              <p className="text-lg text-text-muted leading-relaxed mb-8 max-w-lg">
                Без посредников. Без лишних комиссий. Тысячи машин от проверенных владельцев по всей Германии.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/search"
                  className="flex items-center justify-center gap-2 bg-landing-cta-bg text-text-base font-semibold px-6 py-3.5 rounded-xl hover:bg-landing-cta-hover transition-colors"
                >
                  Найти машину
                  <ChevronRight size={18} />
                </Link>
                <Link
                  href="/login?tab=register"
                  className="flex items-center justify-center gap-2 border border-border-default text-text-secondary font-semibold px-6 py-3.5 rounded-xl hover:bg-bg-page transition-colors"
                >
                  Сдать свою машину
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {['ОВ', 'АП', 'МР', 'ДС'].map((init) => (
                    <div
                      key={init}
                      className="w-8 h-8 rounded-full bg-brand-subtle border-2 border-bg-card flex items-center justify-center text-xs font-bold text-landing-cta-text"
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
                          fill="var(--color-star)" stroke="var(--color-star)" strokeWidth="1"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-text-muted">
                    <strong className="text-text-base">18,000+</strong> довольных арендаторов
                  </p>
                </div>
              </div>
            </div>

            {/* Правая колонка */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-subtle rounded-3xl" />
              <div className="relative p-8">
                <div className="bg-bg-card rounded-2xl shadow-xl border border-border-default p-5 mb-4">
                  <div className="w-full h-40 bg-brand-subtle rounded-xl flex items-center justify-center mb-4">
                    <Car size={64} className="text-landing-cta-bg" />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-text-base">BMW 3 Series 2022</p>
                      <p className="text-sm text-text-muted">Берлин · Бензин · Автомат</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-landing-cta-text">€65</p>
                      <p className="text-xs text-text-muted">/ день</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRow rating={4.9} />
                    <span className="text-xs text-text-muted">4.9 (34 отзыва)</span>
                  </div>
                  <Link
                    href="/search"
                    className="mt-4 w-full flex items-center justify-center bg-landing-cta-bg text-text-base font-semibold py-3 rounded-xl hover:bg-landing-cta-hover transition-colors"
                  >
                    Забронировать
                  </Link>
                </div>

                <div className="absolute -top-4 -right-4 bg-bg-card rounded-xl shadow-lg border border-border-default px-4 py-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-landing-cta-bg" />
                  <span className="text-xs font-semibold text-text-base">Владелец верифицирован</span>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-bg-card rounded-xl shadow-lg border border-border-default px-4 py-3">
                  <p className="text-xs text-text-muted">Ответ владельца</p>
                  <p className="text-xs font-semibold text-text-base">~45 минут</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Статистика ── */}
      <section className="py-12 bg-bg-page border-y border-border-default">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-text-base mb-1">{value}</p>
                <p className="text-sm text-text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Как это работает ── */}
      <section id="how" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-landing-cta-text uppercase tracking-widest mb-3">
              Как это работает
            </p>
            <h2 className="text-4xl font-bold text-text-base mb-4">Три простых шага</h2>
            <p className="text-text-muted max-w-md mx-auto">Найди машину, забронируй и поезжай. Всё просто.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num}>
                <div className="w-12 h-12 rounded-2xl bg-brand-subtle flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-landing-cta-text">{num}</span>
                </div>
                <h3 className="text-xl font-bold text-text-base mb-2">{title}</h3>
                <p className="text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Популярные машины ── */}
      <section id="cars" className="py-20 px-6 bg-bg-page">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-landing-cta-text uppercase tracking-widest mb-3">
                Популярные
              </p>
              <h2 className="text-4xl font-bold text-text-base">Машины рядом с тобой</h2>
            </div>
            <Link
              href="/search"
              className="hidden md:flex items-center gap-1 text-sm text-landing-cta-text font-semibold hover:gap-2 transition-all"
            >
              Смотреть все <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CARS.map((car) => (
              <div
                key={car.name}
                className="bg-bg-card rounded-2xl border border-border-default overflow-hidden hover:shadow-lg hover:border-brand transition-all group"
              >
                <div className="h-44 bg-brand-subtle flex items-center justify-center group-hover:bg-brand-subtle transition-colors">
                  <Car size={56} className="text-landing-cta-bg" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-bold text-text-base">{car.name}</p>
                    <p className="text-lg font-bold text-landing-cta-text">
                      €{car.price}
                      <span className="text-xs font-normal text-text-muted">/д</span>
                    </p>
                  </div>
                  <p className="text-sm text-text-muted mb-3">
                    {car.city} · {car.year} · {car.fuel}
                  </p>
                  <div className="flex items-center gap-2">
                    <StarRow rating={car.rating} />
                    <span className="text-xs text-text-muted">{car.rating} ({car.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/search" className="inline-flex items-center gap-1 text-sm text-landing-cta-text font-semibold">
              Смотреть все машины <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Преимущества ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-landing-cta-text uppercase tracking-widest mb-3">
              Почему мы
            </p>
            <h2 className="text-4xl font-bold text-text-base">Надёжно и удобно</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-border-default hover:border-brand hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-subtle flex items-center justify-center text-landing-cta-bg mb-4">
                  {icon}
                </div>
                <h3 className="font-bold text-text-base mb-2">{title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Для владельцев — намеренно тёмная секция ── */}
      <section id="owners" className="py-20 px-6 bg-landing-dark-bg">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-landing-cta-bg uppercase tracking-widest mb-4">
                Для владельцев
              </p>
              <h2 className="text-4xl font-bold text-landing-dark-text mb-6">
                Твоя машина стоит — она могла бы зарабатывать
              </h2>
              <p className="text-landing-dark-muted leading-relaxed mb-8">
                Сдавай машину когда не пользуешься. Ты сам устанавливаешь цену и выбираешь арендаторов. Мы берём минимальную комиссию.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  'Ты сам выбираешь кому сдавать',
                  'Устанавливаешь свои цены',
                  'Получаешь оплату наличными',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-landing-cta-bg shrink-0" />
                    <span className="text-landing-dark-muted text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/login?tab=register"
                className="inline-flex items-center gap-2 bg-landing-cta-bg text-text-base font-semibold px-6 py-3.5 rounded-xl hover:bg-landing-cta-hover transition-colors"
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
                <div key={label} className="bg-landing-dark-card border border-landing-dark-border rounded-2xl p-5">
                  <p className="text-2xl font-bold text-landing-cta-bg mb-1">{value}</p>
                  <p className="text-sm font-semibold text-landing-dark-text mb-1">{label}</p>
                  <p className="text-xs text-landing-dark-muted">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA — намеренно зелёная секция ── */}
      <section className="py-20 px-6 bg-landing-cta-bg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-text-base mb-4">Готов к поездке?</h2>
          <p className="text-text-base mb-8 text-lg">
            Тысячи машин ждут тебя. Найди свою за 2 минуты.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/search"
              className="flex items-center justify-center gap-2 bg-bg-card text-landing-cta-text font-bold px-8 py-4 rounded-xl hover:bg-bg-page transition-colors"
            >
              Найти машину
              <ChevronRight size={18} />
            </Link>
            <Link
              href="/login?tab=register"
              className="flex items-center justify-center gap-2 bg-landing-cta-btn-bg text-text-base font-bold px-8 py-4 rounded-xl hover:bg-landing-cta-btn-hover transition-colors border border-landing-cta-btn-border"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}