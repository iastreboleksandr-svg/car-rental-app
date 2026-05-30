import { NotificationsList } from '@/components/notifications/NotificationsList';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-lg mx-auto px-4 py-6">
        <NotificationsList />
      </main>
    </div>
  );
}