import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export function RenterDashboardHeader() {
  const router = useRouter();
  const { user } = useAuthStore();

  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <div className="flex items-center justify-between">
      <div className="h-4 w-24 bg-border-default rounded" />
      <div className="flex items-center gap-2">
        <Button variant="green" onClick={() => router.push('/search')}>
          Найти машину
        </Button>

        <div className="w-9 h-9 rounded-full bg-brand-subtle text-brand border border-brand-subtle flex items-center justify-center text-sm font-bold">
          {initials}
        </div>
      </div>
    </div>
  );
}