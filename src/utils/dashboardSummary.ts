import type { Booking } from "../services/bookingService";

export const sumSuccess = (booking: Booking[]) => {
  const resultSuccess = booking.filter(
    (item) => item.status === "booked",
  ).length;

  return resultSuccess;
};

export const sumCancled = (booking: Booking[]) => {
  const resultCancel = booking.filter(
    (item) => item.status === "cancelled",
  ).length;

  return resultCancel;
};

export const rateSuccess = (booking: Booking[]) => {
  const resultRate = (sumSuccess(booking) / booking.length) * 100;

  return resultRate;
};

export const monthlyTotal = (booking: Booking[]) => {
  const monthly = new Array(12).fill(0);

  const resultTotal = booking.forEach((item) => {
    const month = new Date(item.date).getMonth();

    monthly[month]++;

    return resultTotal;
  });
};
