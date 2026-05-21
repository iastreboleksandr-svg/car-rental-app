import Car from "@/lib/types/car";
import CarCard from "./CarCard/CarCard";

type CarsListProps = {
  cars: Car[];
  isOwnerView?: boolean;
};

export default function CarsList({ cars, isOwnerView }: CarsListProps) {
  if (cars.length === 0) {
    return <div>Машины не найдены</div>;
  }

  return (
    <div>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} isOwnerView={isOwnerView} />
      ))}
    </div>
  );
}