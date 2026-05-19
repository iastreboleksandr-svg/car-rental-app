import Car from "@/lib/types/car";
import CarCard from "./CarCard/CarCard";

type CarsListProps = {
  cars: Car[];
};

export default function CarsList({ cars }: CarsListProps) {
  if (cars.length === 0) {
    return <div>No cars found</div>;
  }

  return (
    <div>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
