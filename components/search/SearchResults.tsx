import { CarCard } from './CarCard';

interface Car {
  id: number;
  price: number;
  rating: number;
  reviews: number;
}

interface SearchResultsProps {
  cars: Car[];
}

export function SearchResults({ cars }: SearchResultsProps) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <p className="text-sm text-gray-600">Найдено: {cars.length} машин</p>
      <div className="grid grid-cols-2 gap-3">
        {cars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
      <button className="w-full border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
        Загрузить ещё
      </button>
    </div>
  );
}