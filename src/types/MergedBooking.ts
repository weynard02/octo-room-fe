export default interface MergedBooking {
  booking_id: string;
  room_id?: string;
  room_name?: string;
  customer_name?: string;
  start: Date;
  end: Date;
  duration: number;
}
