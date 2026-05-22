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
      <label className="text-sm text-gray-600">{label}</label>
      <div className="relative">
        <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="date"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
        />
      </div>
    </div>
  );
}