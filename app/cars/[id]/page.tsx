import CarGallery from '@/components/cars/CarGallery';
import CarInfo from '@/components/cars/CarInfo';
import CarOwner from '@/components/cars/CarOwner';
import CarReviews from '@/components/cars/CarReviews';
import { BookingCard } from '@/components/booking/BookingCard';

const CAR = {
  id: '1',
  name: 'Mercedes-Benz S-Class',
  year: 2024,
  pricePerDay: 50,
  deposit: 200,
  rating: 4.2,
  reviewsCount: 12,
  fuel: 'Бензин',
  transmission: 'Автомат',
  seats: 5,
  description:
    'Флагманский седан Mercedes-Benz S-Class сочетает в себе безупречный стиль и передовые технологии. Просторный салон с кожаной отделкой, адаптивная подвеска Magic Body Control и мощный двигатель обеспечат вам незабываемое путешествие в любую точку.',
  owner: { firstName: 'Олег', lastName: 'В.', rating: 4.9, totalRentals: 38 },
  reviews: [
    {
      id: 1,
      firstName: 'Алина',
      lastName: 'И.',
      rating: 5,
      date: 'Май 2026',
      text: 'Отличный автомобиль, всё как на фото. Хозяин очень отзывчивый, передача прошла без проблем.',
    },
    {
      id: 2,
      firstName: 'Максим',
      lastName: 'Р.',
      rating: 4,
      date: 'Апрель 2026',
      text: 'Хороший автомобиль, комфортная поездка. Рекомендую.',
    },
  ],
};

export default function CarDetailPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 flex flex-col gap-5">
            <CarGallery />
            <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-5">

              <CarInfo
                name={CAR.name}
                year={CAR.year}
                rating={CAR.rating}
                reviewsCount={CAR.reviewsCount}
                fuel={CAR.fuel}
                transmission={CAR.transmission}
                seats={CAR.seats}
                description={CAR.description}  
              />

              <CarOwner
                firstName={CAR.owner.firstName}
                lastName={CAR.owner.lastName}
                rating={CAR.owner.rating}
                totalRentals={CAR.owner.totalRentals}
              />

              <CarReviews reviews={CAR.reviews} totalCount={CAR.reviewsCount} />
            </div>
          </div>

          <BookingCard
            pricePerDay={CAR.pricePerDay}
            deposit={CAR.deposit}
            fuel={CAR.fuel}
            transmission={CAR.transmission}
            seats={CAR.seats}
            rating={CAR.rating}
          />
        </div>
      </main>
    </div>
  );
}
// "use client";

// import BookingCard from './BookingCard';

// export default function App() {
//   return (
//     <div style={{ padding: 40 }}>
//       <BookingCard
//         pricePerDay={89}
//         deposit={500}
//         fuel="Бензин"
//         transmission="Автомат"
//         seats={5}
//         rating={4.9}
//       />
//     </div>
//   );
// }
