import api from "./api";
import type AppointmentType from "../types/Appointment";

export const createAppointment = async (data: AppointmentType) => {
  const response = await api.post("/bookings", data);
  const result = response.data;

  console.log("data", result);

  return result;
};
