interface TabItem<T extends string> {
  id: T;
  label: string;
  badge?: number;
}

interface BookingsTabsProps<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
}

export function BookingsTabs<T extends string>({ tabs, activeTab, onChange }: BookingsTabsProps<T>) {
  return (
    <div className="flex border-b border-border-default">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`pb-2 px-4 text-sm font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === tab.id
              ? 'text-brand border-b-2 border-brand'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {tab.label}
          {tab.badge !== undefined && tab.badge > 0 && (
            <span className="bg-brand-subtle text-brand text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
