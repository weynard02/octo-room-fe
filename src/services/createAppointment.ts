import type AppointmentType from "../types/Appointment";

export const createAppointment = async (data: AppointmentType) => {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = res.json();

  console.log("data", result);

  return result;
};
