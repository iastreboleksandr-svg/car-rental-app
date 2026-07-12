'use client';

import Link from 'next/link';
import { Car, Shield, Star, Clock, MapPin, ChevronRight, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import StarRating from '@/components/atoms/StarRating';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function HomePage() {
  const t = useTranslations('landing');
  const { theme, toggleTheme } = useTheme();

  const stats = [
    { value: '2,400+', label: t('stats.cars') },
    { value: '18,000+', label: t('stats.trips') },
    { value: '4.8', label: t('stats.rating') },
    { value: '12', label: t('stats.cities') },
  ];

  const steps = [
    { num: '01', title: t('how.step1Title'), desc: t('how.step1Desc') },
    { num: '02', title: t('how.step2Title'), desc: t('how.step2Desc') },
    { num: '03', title: t('how.step3Title'), desc: t('how.step3Desc') },
  ];

  const features = [
    { icon: <Shield size={20} />, title: t('features.f1Title'), desc: t('features.f1Desc') },
    { icon: <Clock size={20} />, title: t('features.f2Title'), desc: t('features.f2Desc') },
    { icon: <MapPin size={20} />, title: t('features.f3Title'), desc: t('features.f3Desc') },
    { icon: <Star size={20} />, title: t('features.f4Title'), desc: t('features.f4Desc') },
  ];

  const cars = [
    {
      name: 'BMW 3 Series',
      year: 2022,
      price: 65,
      rating: 4.9,
      reviews: 34,
      fuel: 'Benzin',
      city: 'Berlin',
    },
    {
      name: 'Volkswagen Golf',
      year: 2023,
      price: 45,
      rating: 4.7,
      reviews: 21,
      fuel: 'Elektro',
      city: 'München',
    },
    {
      name: 'Mercedes C-Class',
      year: 2021,
      price: 80,
      rating: 5.0,
      reviews: 18,
      fuel: 'Diesel',
      city: 'Hamburg',
    },
  ];

  const ownerStats = [
    { value: t('owners.stat1Value'), label: t('owners.stat1Label'), sub: t('owners.stat1Sub') },
    { value: t('owners.stat2Value'), label: t('owners.stat2Label'), sub: t('owners.stat2Sub') },
    { value: t('owners.stat3Value'), label: t('owners.stat3Label'), sub: t('owners.stat3Sub') },
    { value: t('owners.stat4Value'), label: t('owners.stat4Label'), sub: t('owners.stat4Sub') },
  ];

  return (
    <div className="min-h-screen bg-bg-card">
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
            <a
              href="#how"
              className="text-sm text-text-muted hover:text-text-base transition-colors"
            >
              {t('nav.how')}
            </a>
            <a
              href="#cars"
              className="text-sm text-text-muted hover:text-text-base transition-colors"
            >
              {t('nav.cars')}
            </a>
            <a
              href="#owners"
              className="text-sm text-text-muted hover:text-text-base transition-colors"
            >
              {t('nav.owners')}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-border-default text-text-muted hover:text-text-base hover:bg-bg-page transition-colors"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <Link
              href="/login"
              className="text-sm text-text-secondary hover:text-text-base transition-colors"
            >
              {t('nav.login')}
            </Link>

            <Link
              href="/login?tab=register"
              className="bg-landing-cta-bg text-text-base text-sm font-semibold px-4 py-2 rounded-lg hover:bg-landing-cta-hover transition-colors"
            >
              {t('nav.start')}
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-subtle text-landing-cta-text text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-landing-cta-bg animate-pulse" />
                {t('hero.badge')}
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-text-base leading-tight tracking-tight mb-6">
                {t('hero.titleStart')}{' '}
                <span className="text-landing-cta-text relative">
                  {t('hero.titleAccent')}
                  <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6">
                    <path
                      d="M0 5 Q100 0 200 5"
                      stroke="var(--landing-cta-bg)"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                {t('hero.titleEnd')}
              </h1>

              <p className="text-lg text-text-muted leading-relaxed mb-8 max-w-lg">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/search"
                  className="flex items-center justify-center gap-2 bg-landing-cta-bg text-text-base font-semibold px-6 py-3.5 rounded-xl hover:bg-landing-cta-hover transition-colors"
                >
                  {t('hero.findCar')}
                  <ChevronRight size={18} />
                </Link>
                <Link
                  href="/login?tab=register"
                  className="flex items-center justify-center gap-2 border border-border-default text-text-secondary font-semibold px-6 py-3.5 rounded-xl hover:bg-bg-page transition-colors"
                >
                  {t('hero.rentOut')}
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
                  <div className="mb-0.5">
                    <StarRating value={5} size="sm" readonly />
                  </div>
                  <p className="text-xs text-text-muted">
                    <strong className="text-text-base">18,000+</strong> {t('hero.happyRenters')}
                  </p>
                </div>
              </div>
            </div>

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
                      <p className="text-sm text-text-muted">{t('hero.cardLocation')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-landing-cta-text">€65</p>
                      <p className="text-xs text-text-muted">{t('hero.perDay')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating value={4.9} size="sm" readonly />
                    <span className="text-xs text-text-muted">
                      {t('hero.reviews', { rating: '4.9', count: 34 })}
                    </span>
                  </div>
                  <Link
                    href="/search"
                    className="mt-4 w-full flex items-center justify-center bg-landing-cta-bg text-text-base font-semibold py-3 rounded-xl hover:bg-landing-cta-hover transition-colors"
                  >
                    {t('hero.book')}
                  </Link>
                </div>

                <div className="absolute -top-4 -right-4 bg-bg-card rounded-xl shadow-lg border border-border-default px-4 py-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-landing-cta-bg" />
                  <span className="text-xs font-semibold text-text-base">{t('hero.verified')}</span>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-bg-card rounded-xl shadow-lg border border-border-default px-4 py-3">
                  <p className="text-xs text-text-muted">{t('hero.responseTime')}</p>
                  <p className="text-xs font-semibold text-text-base">{t('hero.responseValue')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-bg-page border-y border-border-default">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-text-base mb-1">{value}</p>
                <p className="text-sm text-text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-landing-cta-text uppercase tracking-widest mb-3">
              {t('how.label')}
            </p>
            <h2 className="text-4xl font-bold text-text-base mb-4">{t('how.title')}</h2>
            <p className="text-text-muted max-w-md mx-auto">{t('how.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(({ num, title, desc }) => (
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

      <section id="cars" className="py-20 px-6 bg-bg-page">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-landing-cta-text uppercase tracking-widest mb-3">
                {t('popular.label')}
              </p>
              <h2 className="text-4xl font-bold text-text-base">{t('popular.title')}</h2>
            </div>
            <Link
              href="/search"
              className="hidden md:flex items-center gap-1 text-sm text-landing-cta-text font-semibold hover:gap-2 transition-all"
            >
              {t('popular.viewAll')} <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car.name}
                className="bg-bg-card rounded-2xl border border-border-default overflow-hidden hover:shadow-lg hover:border-brand transition-all group"
              >
                <div className="h-44 bg-brand-subtle flex items-center justify-center">
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
                    <StarRating value={car.rating} size="sm" readonly />
                    <span className="text-xs text-text-muted">
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
              className="inline-flex items-center gap-1 text-sm text-landing-cta-text font-semibold"
            >
              {t('popular.viewAllMobile')} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-landing-cta-text uppercase tracking-widest mb-3">
              {t('features.label')}
            </p>
            <h2 className="text-4xl font-bold text-text-base">{t('features.title')}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon, title, desc }) => (
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

      <section id="owners" className="py-20 px-6 bg-landing-dark-bg">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-landing-cta-bg uppercase tracking-widest mb-4">
                {t('owners.label')}
              </p>
              <h2 className="text-4xl font-bold text-landing-dark-text mb-6">
                {t('owners.title')}
              </h2>
              <p className="text-landing-dark-muted leading-relaxed mb-8">{t('owners.subtitle')}</p>
              <div className="flex flex-col gap-3 mb-8">
                {[t('owners.benefit1'), t('owners.benefit2'), t('owners.benefit3')].map((item) => (
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
                {t('owners.addCar')}
                <ChevronRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {ownerStats.map(({ value, label, sub }) => (
                <div
                  key={label}
                  className="bg-landing-dark-card border border-landing-dark-border rounded-2xl p-5"
                >
                  <p className="text-2xl font-bold text-landing-cta-bg mb-1">{value}</p>
                  <p className="text-sm font-semibold text-landing-dark-text mb-1">{label}</p>
                  <p className="text-xs text-landing-dark-muted">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-landing-cta-bg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-text-base mb-4">{t('cta.title')}</h2>
          <p className="text-text-base mb-8 text-lg">{t('cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/search"
              className="flex items-center justify-center gap-2 bg-bg-card text-landing-cta-text font-bold px-8 py-4 rounded-xl hover:bg-bg-page transition-colors"
            >
              {t('cta.findCar')}
              <ChevronRight size={18} />
            </Link>
            <Link
              href="/login?tab=register"
              className="flex items-center justify-center gap-2 bg-landing-cta-btn-bg text-text-base font-bold px-8 py-4 rounded-xl hover:bg-landing-cta-btn-hover transition-colors border border-landing-cta-btn-border"
            >
              {t('cta.register')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
