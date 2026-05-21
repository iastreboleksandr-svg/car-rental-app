'use client';

import { use } from 'react';
import Button from '@/components/atoms/Button';
import Avatar from '@/components/atoms/Avatar';
import StarRating from '@/components/atoms/StarRating';
import Spinner from '@/components/atoms/Spinner';
import {
  Fuel, Settings2, Users, ChevronDown, ChevronUp,
  ArrowLeft, ShieldCheck, MessageCircle,
} from 'lucide-react';
import { useCarDetailPage } from '@/hooks/useCarDetailPage';

const fuelLabel: Record<string, string> = {
  petrol: 'Бензин', diesel: 'Дизель', electric: 'Электро', hybrid: 'Гибрид',
};
const transmissionLabel: Record<string, string> = {
  automatic: 'Автомат', manual: 'Механика',
};

function Tag({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
      {label}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-gray-100 pt-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{title}</p>
      {children}
    </div>
  );
}

function CarImagePlaceholder() {
  return (
    <div className="w-full aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-gray-300">
        <path
          d="M5 11l1.5-4.5h11L19 11M3 11h18v7H3v-7zm2 7v2h2v-2H5zm12 0v2h2v-2h-2zM5.5 15a1 1 0 100-2 1 1 0 000 2zm13 0a1 1 0 100-2 1 1 0 000 2z"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const {
    car, isLoading, isError,
    activeImg, setActiveImg,
    expanded, toggleExpanded,
    booked, loading, handleBook,
  } = useCarDetailPage(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-2 text-gray-400">
        <Spinner size="sm" /> Загрузка...
      </div>
    );
  }

  if (isError || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-sm">
        Машина не найдена
      </div>
    );
  }

  const fuel = fuelLabel[car.fuelType] ?? car.fuelType;
  const transmission = transmissionLabel[car.transmission] ?? car.transmission;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ── Body ── */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center mb-4 w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ─── Left Column ─── */}
          <div className="flex-1 flex flex-col gap-5">

            {/* Gallery Card */}
            <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3">
              <CarImagePlaceholder />
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-12 rounded-lg border-2 transition-colors flex items-center justify-center bg-gray-50 ${
                      activeImg === i ? 'border-blue-500' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-300">
                      <path d="M5 11l1.5-4.5h11L19 11M3 11h18v7H3v-7zm2 7v2h2v-2H5zm12 0v2h2v-2h-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-5">

              {/* Name & Rating */}
              <div>
                <p className="text-xs text-gray-400 mb-1">{car.year}</p>
                <h1 className="text-xl font-semibold text-gray-800 mb-2">{car.brand} {car.model}</h1>
                <div className="flex items-center gap-2">
                  <StarRating value={car.averageRating ?? 0} size="sm" readonly />
                  {car.averageRating
                    ? <span className="text-sm text-gray-400">{car.averageRating.toFixed(1)}</span>
                    : <span className="text-sm text-gray-400">нет отзывов</span>
                  }
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                <Tag label={fuel} />
                <Tag label={transmission} />
                {car.seats && <Tag label={`${car.seats} мест`} />}
              </div>

              {/* Description */}
              {car.description && (
                <Section title="Описание">
                  <p className={`text-sm text-gray-500 leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
                    {car.description}
                  </p>
                  <button
                    onClick={toggleExpanded}
                    className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 mt-2 transition-colors"
                  >
                    {expanded ? 'Скрыть' : 'Показать больше'}
                    {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </Section>
              )}

              {/* Owner — заглушка пока нет API */}
              <Section title="Владелец">
                <div className="flex items-center gap-3">
                  <Avatar firstName="?" lastName="" size="md" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Владелец</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <StarRating value={0} size="sm" readonly />
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors">
                    <MessageCircle size={13} />
                    Написать
                  </button>
                </div>
              </Section>

            </div>
          </div>

          {/* ─── Sidebar ─── */}
          <div className="w-full lg:w-72 lg:sticky lg:top-20 flex flex-col gap-3">

            {/* Booking Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Бронирование</p>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-800">${car.pricePerDay}</span>
                  <span className="text-sm text-gray-400">/ день</span>
                </div>
                <p className="text-sm text-gray-400 mt-0.5">Депозит: ${car.deposit}</p>
              </div>

              {/* Feature chips */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Fuel size={14} />, label: 'Топливо', value: fuel },
                  { icon: <Settings2 size={14} />, label: 'КПП', value: transmission },
                  { icon: <Users size={14} />, label: 'Мест', value: car.seats ?? '—' },
                  { icon: <StarRating value={0} size="sm" readonly />, label: 'Рейтинг', value: car.averageRating?.toFixed(1) ?? '—' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
                    <span className="text-gray-400">{icon}</span>
                    <div>
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-medium text-gray-700">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full" onClick={handleBook} disabled={loading || booked}>
                {booked ? '✓ Забронировано' : loading ? 'Обработка...' : 'Забронировать'}
              </Button>
            </div>

            {/* Safety note */}
            <div className="bg-white rounded-2xl shadow-sm p-4 flex gap-3 items-start">
              <ShieldCheck size={16} className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-400 leading-relaxed">
                Ваш платёж защищён. Средства поступают владельцу только после начала аренды.
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
