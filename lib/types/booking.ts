type Booking = {
  id: string;
  carId: string;
  renterId: string;
  startAt: string;
  endAt: string;
  totalPrice: number;
  depositAmount: number;
  status: number;
  createdAt: string;
};

export default Booking;