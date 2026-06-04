import { useAuthStore } from '@/store/auth.store';

export function RoleCard() {
  const { user } = useAuthStore();

  return (
    <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-6">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Аккаунт
      </h2>
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-base">Роль</span>
        <span className={`
          text-xs font-semibold px-3 py-1 rounded-full
          ${user?.role === 'owner'
            ? 'bg-brand-subtle text-brand'
            : 'bg-bg-info text-status-info'}
        `}>
          {user?.role === 'owner' ? 'Владелец' : 'Арендатор'}
        </span>
      </div>
    </div>
  );
}