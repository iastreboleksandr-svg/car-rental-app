import { NotificationsList } from '@/components/notifications/NotificationsList';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-bg-page">
      <main className="max-w-lg mx-auto px-4 py-6">
        <NotificationsList />
      </main>
    </div>
  );
}