import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export function DashboardHeader() {
  const router = useRouter();
  const { user } = useAuthStore();

  // Берём инициалы из store, не хардкодим
  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <div className="flex items-center justify-between">
      <div className="h-4 w-24 bg-[#e4eaf0] rounded" />
      <div className="flex items-center gap-2">
        <Button variant="green" onClick={() => router.push('/cars/new')}>
          + Добавить машину
        </Button>

        <div className="w-9 h-9 rounded-full bg-[#f0fdf3] text-[#32a84d] border border-[#d4f5dc] flex items-center justify-center text-sm font-bold">
          {initials}
        </div>
      </div>
    </div>
  );
}