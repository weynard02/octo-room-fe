export default interface AppointmentType {
  room: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  notes?: string;
  customer_email?: string;
}

export const initialAppointment: AppointmentType = {
  room: "",
  date: "",
  timeStart: "",
  timeEnd: "",
  notes: "",
  customer_email: "",
};
