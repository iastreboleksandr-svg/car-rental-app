'use client';

import { use } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import Avatar from '@/components/atoms/Avatar';
import StarRating from '@/components/atoms/StarRating';
import Spinner from '@/components/atoms/Spinner';
import { Fuel, Settings2, Users, ArrowLeft, ShieldCheck, MessageCircle } from 'lucide-react';
import { Section } from '@/components/common/Section';
import { CarGallery } from '@/components/cars/CarGallery';
import { CarDescription } from '@/components/cars/CarDescription';
import { useCarDetailPage } from '@/hooks/useCarDetailPage';
import { useTranslations } from 'next-intl';

function Tag({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
      {label}
    </span>
  );
}

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations('car.detail');
  const tCommon = useTranslations('common');
  const { car, isLoading, isError } = useCarDetailPage(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-gray-400">
        <Spinner size="sm" /> {tCommon('loading')}
      </div>
    );
  }

  if (isError || !car) {
    return (
      <div className="flex items-center justify-center py-20 text-red-500 text-sm">
        {t('notFound')}
      </div>
    );
  }

  const fuel = t(`fuel.${car.fuelType}`);
  const transmission = t(`transmission.${car.transmission}`);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <Button variant="secondary" size="sm" className="mb-4 w-8 h-8 p-0" onClick={() => window.history.back()}>
        <ArrowLeft size={16} />
      </Button>

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        <div className="flex-1 flex flex-col gap-5">

          <CarGallery />

          <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-5">

            <div>
              <p className="text-xs text-gray-400 mb-1">{car.year}</p>
              <h1 className="text-xl font-semibold text-gray-800 mb-2">
                {car.brand} {car.model}
              </h1>

              {/* РЕЙТИНГ БЛОК (закомментирован по задаче)
              <div className="flex items-center gap-2">
                <StarRating value={car.averageRating ?? 0} size="sm" readonly />
                {car.averageRating
                  ? <span className="text-sm text-gray-400">{car.averageRating.toFixed(1)}</span>
                  : <span className="text-sm text-gray-400">{t('noReviews')}</span>
                }
              </div>
              */}
            </div>

            <div className="flex gap-2 flex-wrap">
              <Tag label={fuel} />
              <Tag label={transmission} />
              {car.seats && <Tag label={t('seats', { count: car.seats })} />}
            </div>

            {car.description && (
              <CarDescription
                title={t('description')}
                description={car.description}
                showMoreLabel={t('showMore')}
                showLessLabel={t('showLess')}
              />
            )}

            {/* OWNER MESSAGE БЛОК (закомментирован по задаче)
            <Section title={t('owner')}>
              <div className="flex items-center gap-3">
                <Avatar firstName="?" lastName="" size="md" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{t('owner')}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <StarRating value={0} size="sm" readonly />
                  </div>
                </div>
                <Button variant="secondary" size="sm" leftIcon={<MessageCircle size={13} />}>
                  {t('writeMessage')}
                </Button>
              </div>
            </Section>
            */}

          </div>
        </div>

        <div className="w-full lg:w-72 lg:sticky lg:top-20 flex flex-col gap-3">

          <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              {t('booking')}
            </p>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-800">
                  ${car.pricePerDay}
                </span>
                <span className="text-sm text-gray-400">/ день</span>
              </div>
              <p className="text-sm text-gray-400 mt-0.5">
                {t('deposit', { amount: car.deposit })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: <Fuel size={14} />, label: fuel, value: fuel },
                { icon: <Settings2 size={14} />, label: 'КПП', value: transmission },
                { icon: <Users size={14} />, label: 'Мест', value: car.seats ?? '—' },
                {
                  icon: <StarRating value={0} size="sm" readonly />,
                  label: 'Рейтинг',
                  value: car.averageRating?.toFixed(1) ?? '—',
                },
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

            <Link href={`/booking/new?carId=${car.id}`} className="w-full">
              <Button className="w-full">{t('bookNow')}</Button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 flex gap-3 items-start">
            <ShieldCheck size={16} className="text-[#48C964] mt-0.5 shrink-0" />
            <p className="text-xs text-gray-400 leading-relaxed">
              Ваш платёж защищён. Средства поступают владельцу только после начала аренды.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
