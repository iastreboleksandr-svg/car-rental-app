import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';

export function DashboardHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="h-4 w-24 bg-[#e4eaf0] rounded" />
      <div className="flex items-center gap-2">
        {/* <Button
          className="text-sm bg-[#48C964] hover:bg-[#32a84d] text-white border-none rounded-full px-4 py-2 font-semibold transition-colors"
          onClick={() => router.push('/cars/new')}
        >
          + Добавить машину
        </Button> */}
        <Button variant="green" onClick={() => router.push('/cars/new')}>
          + Добавить машину
        </Button>

        <div className="w-9 h-9 rounded-full bg-[#f0fdf3] text-[#32a84d] border border-[#d4f5dc] flex items-center justify-center text-sm font-bold">
          ОВ
        </div>
      </div>
    </div>
  );
}
