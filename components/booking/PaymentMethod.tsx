import { Banknote } from 'lucide-react';

export function PaymentMethod() {
  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-4">
      <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
        <Banknote size={18} className="text-green-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">Наличными при получении</p>
        <p className="text-xs text-gray-400">Оплата напрямую владельцу</p>
      </div>
    </div>
  );
}