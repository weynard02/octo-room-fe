export default interface AppointmentType {
  room: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  notes?: string;
}

export const initialAppointment: AppointmentType = {
  room: "",
  date: '',
  timeStart: '',
  timeEnd: '',
  notes: ''
}