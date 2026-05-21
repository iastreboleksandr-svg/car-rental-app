'use client';

import { useState } from 'react';
import Button from '@/components/atoms/Button';
import {
  Star,
  Fuel,
  Settings2,
  Users,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CAR = {
  id: '1',
  name: 'Mercedes-Benz S-Class',
  year: 2024,
  pricePerDay: 50,
  deposit: 200,
  rating: 4.2,
  reviewsCount: 12,
  fuel: 'Бензин',
  transmission: 'Автомат',
  seats: 5,
  description:
    'Флагманский седан Mercedes-Benz S-Class сочетает в себе безупречный стиль и передовые технологии. Просторный салон с кожаной отделкой, адаптивная подвеска Magic Body Control и мощный двигатель обеспечат вам незабываемое путешествие в любую точку.',
  owner: {
    name: 'Олег В.',
    initials: 'ОВ',
    rating: 4.9,
    totalRentals: 38,
  },
  reviews: [
    {
      id: 1,
      author: 'Алина И.',
      initials: 'АИ',
      rating: 5,
      date: 'Май 2026',
      text: 'Отличный автомобиль, всё как на фото. Хозяин очень отзывчивый, передача прошла без проблем.',
    },
    {
      id: 2,
      author: 'Максим Р.',
      initials: 'МР',
      rating: 4,
      date: 'Апрель 2026',
      text: 'Хороший автомобиль, комфортная поездка. Рекомендую.',
    },
  ],
};

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={
            rating >= s
              ? 'fill-yellow-400 text-yellow-400'
              : rating >= s - 0.5
              ? 'fill-yellow-200 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }
        />
      ))}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ initials, size = 'md' }) {
  const cls = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-10 h-10 text-sm';
  return (
    <div className={`${cls} rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center shrink-0`}>
      {initials}
    </div>
  );
}

// ─── Tag ─────────────────────────────────────────────────────────────────────
function Tag({ label }) {
  return (
    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
      {label}
    </span>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="border-t border-gray-100 pt-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{title}</p>
      {children}
    </div>
  );
}

// ─── Car Image Placeholder ────────────────────────────────────────────────────
function CarImagePlaceholder() {
  return (
    <div className="w-full aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-gray-300">
        <path
          d="M5 11l1.5-4.5h11L19 11M3 11h18v7H3v-7zm2 7v2h2v-2H5zm12 0v2h2v-2h-2zM5.5 15a1 1 0 100-2 1 1 0 000 2zm13 0a1 1 0 100-2 1 1 0 000 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CarDetailPage() {
  const [activeImg, setActiveImg] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBook = () => {
    setLoading(true);
    setTimeout(() => {
      setBooked(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="flex items-center gap-1.5 text-sm text-gray-400">
              <span>Car Detail</span>
              <span>·</span>
              <span className="text-gray-300 text-xs">/cars/:id</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex items-center justify-center">
            АП
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ─── Left Column ─── */}
          <div className="flex-1 flex flex-col gap-5">

            {/* Gallery Card */}
            <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3">
              <CarImagePlaceholder />
              {/* Thumbnails */}
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
                      <path
                        d="M5 11l1.5-4.5h11L19 11M3 11h18v7H3v-7zm2 7v2h2v-2H5zm12 0v2h2v-2h-2z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-5">
              {/* Name & Rating */}
              <div>
                <p className="text-xs text-gray-400 mb-1">{CAR.year}</p>
                <h1 className="text-xl font-semibold text-gray-800 mb-2">{CAR.name}</h1>
                <div className="flex items-center gap-2">
                  <StarRating rating={CAR.rating} />
                  <span className="text-sm text-gray-400">({CAR.reviewsCount} отзывов)</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                <Tag label={CAR.fuel} />
                <Tag label={CAR.transmission} />
                <Tag label={`${CAR.seats} мест`} />
              </div>

              {/* Description */}
              <Section title="Описание">
                <p className={`text-sm text-gray-500 leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
                  {CAR.description}
                </p>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 mt-2 transition-colors"
                >
                  {expanded ? 'Скрыть' : 'Показать больше'}
                  {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </Section>

              {/* Owner */}
              <Section title="Владелец">
                <div className="flex items-center gap-3">
                  <Avatar initials={CAR.owner.initials} size="lg" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">{CAR.owner.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <StarRating rating={CAR.owner.rating} size={13} />
                      <span className="text-xs text-gray-400">{CAR.owner.rating} · {CAR.owner.totalRentals} аренд</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors">
                    <MessageCircle size={13} />
                    Написать
                  </button>
                </div>
              </Section>

              {/* Reviews */}
              <Section title={`Отзывы (${CAR.reviewsCount})`}>
                <div className="flex flex-col divide-y divide-gray-100">
                  {CAR.reviews.map((r) => (
                    <div key={r.id} className="py-4 first:pt-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar initials={r.initials} size="sm" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">{r.author}</p>
                            <StarRating rating={r.rating} size={12} />
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0">{r.date}</span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>

                {CAR.reviewsCount > CAR.reviews.length && (
                  <button className="w-full mt-2 py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-gray-300 hover:text-gray-600 transition-colors">
                    Ещё {CAR.reviewsCount - CAR.reviews.length} отзывов
                  </button>
                )}
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
                  <span className="text-3xl font-bold text-gray-800">${CAR.pricePerDay}</span>
                  <span className="text-sm text-gray-400">/ день</span>
                </div>
                <p className="text-sm text-gray-400 mt-0.5">Депозит: ${CAR.deposit}</p>
              </div>

              {/* Feature chips */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Fuel size={14} />, label: 'Топливо', value: CAR.fuel },
                  { icon: <Settings2 size={14} />, label: 'КПП', value: CAR.transmission },
                  { icon: <Users size={14} />, label: 'Мест', value: CAR.seats },
                  { icon: <Star size={14} />, label: 'Рейтинг', value: CAR.rating },
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

              <Button
                className="w-full"
                onClick={handleBook}
                disabled={loading || booked}
              >
                {booked ? '✓ Забронировано' : loading ? 'Обработка...' : 'Забронировать'}
              </Button>

              <p className="text-center text-xs text-gray-400">Sticky на десктопе</p>
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







// import { PrivateRoute } from '@/components/layout/PrivateRoute';

// export default function CarFormPage() {
//   return (
//     <PrivateRoute>
//       <div>CarFormPage (new)</div>
//     </PrivateRoute>
//   );
// }
