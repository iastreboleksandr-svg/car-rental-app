import Booking from "@/lib/types/booking";

export const mockBookings: Booking[] = [
  {
    id: "1",
    carId: "1",
    renterId: "user1",
    startAt: "2024-06-01",
    endAt: "2024-06-05",
    totalPrice: 260,
    depositAmount: 200,
    status: 0,
    createdAt: "2024-01-01",
  },
];

export let mockNextId = 1;
