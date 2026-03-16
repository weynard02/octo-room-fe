import MakeAppointmentPage from "../page/make-appointment/MakeAppointmentPage";
import type AppointmentType from "../types/Appointment";

type Props = {
  slotInfo?: AppointmentType | null;
  onClose: () => void;
};

export function AppointmentModal({ slotInfo, onClose }: Props) {
  if (!slotInfo) return null;

  return (
    <div className="fixed overflow-auto inset-0 bg-black/60 flex-auto items-center justify-center z-50">
      <MakeAppointmentPage
        formInfo={slotInfo}
        onClick={onClose}
      />
    </div>
  )
}