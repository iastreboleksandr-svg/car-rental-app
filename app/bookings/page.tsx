import { mockBookings } from "@/lib/mocks/bookings";
import mockCars from "@/lib/mocks/cars";
import { mockCurrentUser } from "@/lib/mocks/users";
import Link from "next/link";

export default function BookingPage() {
  const myBookings = mockBookings.filter(
    (booking) => booking.renterId === mockCurrentUser.id,
  );

  if (myBookings.length === 0) {
    return <div>You have no bookings</div>;
  }

  return (
    <div>
      <h1>Мои бронирования</h1>
      {myBookings.map((booking) => {
        const car = mockCars.find((c) => c.id === booking.carId);
        return (
          <Link key={booking.id} href={`/bookings/${booking.id}`}>
            <div key={booking.id}>
              <h2>
                {car?.brand} {car?.model}
              </h2>
              <p>
                {booking.startAt} — {booking.endAt}
              </p>
              <p>Итого: {booking.totalPrice} $</p>
              <p>Статус: {booking.status}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
