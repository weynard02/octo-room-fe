import { rooms, bookings, bookingSlots, customers } from "../data/mockData";
import type MergedBooking from "../types/MergedBooking";

export function getMergedBookings(date: string) {
  const result: MergedBooking[] = [];

  const bookingsToday = bookings.filter((booking) => booking.date === date);

  bookingsToday.forEach((booking) => {
    const room = rooms.find((r) => r.room_id === booking.room_id);
    const customer = customers.find(
      (c) => c.customer_id === booking.customer_id
    );

    const slots = bookingSlots
      .filter((slot) => slot.booking_id === booking.booking_id)
      .sort(
        (a, b) =>
          new Date(a.start_hour).getTime() - new Date(b.end_hour).getTime()
      );

    if (slots.length === 0) return;

    const start = new Date(slots[0].start_hour);
    const end = new Date(slots[slots.length - 1].end_hour);

    result.push({
      booking_id: booking.booking_id,
      room_id: room?.room_id,
      room_name: room?.name,
      customer_name: customer?.name,
      start,
      end,
      duration: end.getHours() - start.getHours(),
    });
  });

  return result;
}
