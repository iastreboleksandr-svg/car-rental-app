import { create } from "zustand";
import { persist } from "zustand/middleware";
import Booking from "@/lib/types/booking";
import { mockBookings } from "@/lib/mocks/bookings";

type BookingStore = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (id: string) => void;
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookings: mockBookings,
      addBooking: (booking) =>
        set((state) => ({ bookings: [...state.bookings, booking] })),
      cancelBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status: 2 } : b
          ),
        })),
    }),
    { name: "bookings" },
  ),
);