import { Calendar } from 'lucide-react';

interface DateInputProps {
  label: string;
  value: string;
  min?: string;
  onChange: (value: string) => void;
}

export function DateInput({ label, value, min, onChange }: DateInputProps) {
  return (
    <div className="flex-1 flex flex-col gap-1.5">
      <label className="text-sm text-text-secondary">{label}</label>
      <div className="relative">
        <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <input
          type="date"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border-default bg-bg-card pl-9 pr-3 py-2.5 text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-border-focus transition-colors"
        />
      </div>
    </div>
  );
}