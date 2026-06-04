import { Banknote } from 'lucide-react';

export function PaymentMethod() {
  return (
    <div className="flex items-center gap-3 border border-border-default rounded-xl p-4">
      <div className="w-9 h-9 rounded-lg bg-brand-subtle flex items-center justify-center shrink-0">
        <Banknote size={18} className="text-brand" />
      </div>
      <div>
        <p className="text-sm font-medium text-text-secondary">Наличными при получении</p>
        <p className="text-xs text-text-muted">Оплата напрямую владельцу</p>
      </div>
    </div>
  );
}