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
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`pb-2 px-4 text-sm font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === tab.id
              ? 'text-[#48C964] border-b-2 border-[#48C964]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {tab.label}
          {tab.id === 'active' && activeCounts > 0 && (
            <span className="bg-[#48C964]/10 text-[#2a9043] text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {activeCounts}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}