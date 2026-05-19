import BookingForm from "@/components/booking/BookingForm";
import { FUEL_TYPE, TRANSMISSION } from "@/lib/constants/car";
import mockCars from "@/lib/mocks/cars";

type CarDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { id } = await params;
  const car = mockCars.find((car) => car.id === id);

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div>
      {car.carPhotoUrl && (
        <img
          src={car.carPhotoUrl}
          alt={`${car.brand} ${car.model}`}
          width={600}
          height={400}
        />
      )}
      <h1>
        {car.brand} {car.model} ({car.year})
      </h1>
      <p>
        {car.seats} мест · {FUEL_TYPE[car.fuelType]} ·{" "}
        {TRANSMISSION[car.transmission]}
      </p>
      <p>{car.address}</p>
      <p>{car.description}</p>
      <p>{car.pricePerDay} $ / день</p>
      <p>Депозит: {car.deposit} $</p>
      <BookingForm carId={car.id} pricePerDay={car.pricePerDay} />
    </div>
  );
}
