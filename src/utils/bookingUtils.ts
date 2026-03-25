import { rooms, bookings, bookingSlots, customers } from "../data/mockData";
import type MergedBooking from "../types/MergedBooking";
import type { Booking } from "../services/bookingService";
import { formatDateKey } from "../helpers/dataFormatter";

export const isBookingCompleted = (booking: Booking): boolean => {
  if (booking.status === "cancelled") return false;
  if (booking.status === "completed") return true;

  const now = new Date();

  // If we have slots, check the end time of the last slot
  if (booking.slots && booking.slots.length > 0) {
    const lastSlot = booking.slots[booking.slots.length - 1];
    const endHour = lastSlot.end_hour; // e.g., "08:00"

    // Construct "YYYY-MM-DDTHH:mm:00+07:00" for comparison in WIB
    const endDateTimeStr = `${booking.date}T${endHour}:00+07:00`;
    const endTime = new Date(endDateTimeStr);

    return endTime < now;
  }

  // Fallback to date comparison in WIB
  const todayInWIB = formatDateKey(now);
  return booking.date < todayInWIB;
};

export const getEffectiveStatus = (booking: Booking): string => {
  if (booking.status === "cancelled") return "cancelled";
  if (isBookingCompleted(booking)) return "completed";
  return booking.status;
};

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
