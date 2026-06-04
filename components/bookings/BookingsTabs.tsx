type Tab = 'all' | 'active' | 'completed' | 'cancelled';

interface BookingsTabsProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
  activeCounts: number;
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'active', label: 'Активные' },
  { id: 'completed', label: 'Завершённые' },
  { id: 'cancelled', label: 'Отменённые' },
];

export function BookingsTabs({ activeTab, onChange, activeCounts }: BookingsTabsProps) {
  return (
    <div className="flex border-b border-border-default">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`pb-2 px-4 text-sm font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === tab.id
              ? 'text-brand border-b-2 border-brand'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {tab.label}
          {tab.id === 'active' && activeCounts > 0 && (
            <span className="bg-brand-subtle text-brand text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {activeCounts}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}