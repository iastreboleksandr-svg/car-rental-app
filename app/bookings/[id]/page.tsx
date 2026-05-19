import { mockBookings } from "@/lib/mocks/bookings";
import mockCars from "@/lib/mocks/cars";

type BookingDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookingDetailsPage({
  params,
}: BookingDetailsPageProps) {
  const { id } = await params;
  const booking = mockBookings.find((booking) => booking.id === id);

  if (!booking) {
    return <div>Booking not found</div>;
  }

  const car = mockCars.find((c) => c.id === booking.carId);

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div>
      <h1>Бронирование #{booking.id}</h1>
      {car.carPhotoUrl && (
        <img
          src={car.carPhotoUrl}
          alt={`${car.brand} ${car.model}`}
          width={600}
          height={400}
        />
      )}
      <h2>
        {car?.brand} {car?.model}
      </h2>
      <p>
        {booking.startAt} — {booking.endAt}
      </p>
      <p>Итого: {booking.totalPrice} $</p>
      <p>Депозит: {booking.depositAmount} $</p>
      <p>Статус: {booking.status}</p>
    </div>
  );
}
