import CarsList from "@/components/cars/CarsList";
import mockCars from "@/lib/mocks/cars";

export default function CarsPage() {
  return (
    <div>
      <h1>Car Rental App</h1>
      <CarsList cars={mockCars} />
    </div>);
}
