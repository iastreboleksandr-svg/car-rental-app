'use client';

import { useState } from 'react';
import { NotificationItem } from './NotificationItem';

type NotificationType = 'booking' | 'confirmed' | 'cancelled' | 'system';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'booking',
    title: 'Новая бронь',
    message: 'Максим Р. хочет арендовать вашу машину с 01.06 по 05.06',
    date: 'Сегодня',
    isRead: false,
  },
  {
    id: 2,
    type: 'confirmed',
    title: 'Бронь подтверждена',
    message: 'Владелец подтвердил вашу бронь Mercedes-Benz S-Class',
    date: 'Вчера',
    isRead: false,
  },
  {
    id: 3,
    type: 'cancelled',
    title: 'Бронь отменена',
    message: 'Бронь Toyota Camry на 10.06 - 12.06 была отменена',
    date: '2 дня назад',
    isRead: true,
  },
  {
    id: 4,
    type: 'system',
    title: 'Добро пожаловать!',
    message: 'Ваш аккаунт успешно создан. Начните поиск авто.',
    date: '5 дней назад',
    isRead: true,
  },
];

export function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const handleRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleReadAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          {unreadCount > 0 ? `Непрочитанных: ${unreadCount}` : 'Все прочитаны'}
        </p>
        {unreadCount > 0 && (
          <button
            onClick={handleReadAll}
            className="text-sm text-brand hover:text-brand-hover transition-colors"
          >
            Прочитать все
          </button>
        )}
      </div>

      <div className="bg-bg-card rounded-2xl shadow-sm overflow-hidden divide-y divide-border-default">
        {notifications.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-8">Нет уведомлений</p>
        ) : (
          notifications.map((n) => (
            <NotificationItem key={n.id} {...n} onRead={handleRead} />
          ))
        )}
      </div>
    </div>
  );
}