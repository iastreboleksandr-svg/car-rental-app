'use client';

import { Car } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BookingIncomingItem } from '@/components/bookings/BookingIncomingItem';
import { useIncomingBookingsPage, type IncomingFilterTab } from '@/hooks/useIncomingBookingsPage';

const TABS: IncomingFilterTab[] = ['all', 'pending', 'confirmed'];

export default function IncomingBookingsPage() {
  const t = useTranslations('incomingBookings');
  const { bookings, activeTab, setActiveTab, confirmBooking, declineBooking, pendingCount } =
    useIncomingBookingsPage();

  return (
    <div className="min-h-screen bg-bg-page py-8 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">
        <h1 className="text-xl font-semibold text-text-base">{t('title')}</h1>

        <div className="flex gap-1 bg-bg-card rounded-xl p-1 shadow-sm border border-border-default">
          {TABS.map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-brand text-text-inverse shadow-sm'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {t(`tabs.${key}`)}
              {key === 'pending' && pendingCount > 0 && (
                <span
                  className={`text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center ${
                    activeTab === 'pending'
                      ? 'bg-white/30 text-text-inverse'
                      : 'bg-bg-warning text-status-warning'
                  }`}
                >
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {bookings.length === 0 ? (
          <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-10 flex flex-col items-center gap-2">
            <Car size={32} className="text-text-disabled" />
            <p className="text-sm text-text-muted">{t('empty')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {bookings.map((booking) => (
              <BookingIncomingItem
                key={booking.id}
                booking={booking}
                statusLabel={t(`status.${booking.status}`)}
                daysLabel={t('daysOfRental', { count: booking.days })}
                confirmLabel={t('confirm')}
                declineLabel={t('decline')}
                onConfirm={confirmBooking}
                onDecline={declineBooking}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
