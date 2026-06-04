import { PrivateRoute } from '@/components/layout/PrivateRoute';
import { SettingsForm } from '@/components/settings/SettingsForm';

export default function SettingsPage() {
  return (
    <PrivateRoute>
      <div className="min-h-screen bg-bg-page">
        <main className="max-w-lg mx-auto px-4 py-6">
          <SettingsForm />
        </main>
      </div>
    </PrivateRoute>
  );
}