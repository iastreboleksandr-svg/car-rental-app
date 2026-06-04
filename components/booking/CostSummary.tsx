interface CostSummaryProps {
  days: number;
  pricePerDay: number;
  deposit: number;
}

export function CostSummary({ days, pricePerDay, deposit }: CostSummaryProps) {
  const rentalCost = days * pricePerDay;
  const total = rentalCost + deposit;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm text-text-secondary">
        <span>{days} {days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'} × ${pricePerDay}</span>
        <span>${rentalCost}</span>
      </div>
      <div className="flex justify-between text-sm text-text-secondary">
        <span>Депозит</span>
        <span>${deposit}</span>
      </div>
      <div className="border-t border-border-disabled mt-1 pt-3 flex justify-between items-center">
        <span className="text-base font-semibold text-text-base">Итого</span>
        <span className="text-base font-semibold text-brand">${total}</span>
      </div>
    </div>
  );
}