import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardPage from "../page/dashboard/DashboardPage";
import { MyBookingPage } from "../page/my-booking/MyBookingPage";
import MakeAppointmentPage from "../page/make-appointment/MakeAppointmentPage";
import { MyBookingDetailPage } from "../page/my-booking/[id]/MyBookingDetailPage";
import { initialAppointment } from "../types/Appointment";
import DashboarAdminPage from "../page/dashboard-admin/DashboarAdminPage";

export default function AppRoutes() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard-admin" element={<DashboarAdminPage />} />
      <Route path="/my-booking" element={<MyBookingPage />} />
      <Route path="/my-booking/:id" element={<MyBookingDetailPage />} />
      <Route
        path="/make-appointment"
        element={
          <MakeAppointmentPage
            formInfo={initialAppointment}
            onClick={() => navigate("/dashboard")}
          />
        }
      />
    </Routes>
  );
}
