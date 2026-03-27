import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardPage from "../page/dashboard/DashboardPage";
import { MyBookingPage } from "../page/my-booking/MyBookingPage";
import MakeAppointmentPage from "../page/make-appointment/MakeAppointmentPage";
import { MyBookingDetailPage } from "../page/my-booking/[id]/MyBookingDetailPage";
import { initialAppointment } from "../types/Appointment";
import DashboarAdminPage from "../page/dashboard-admin/DashboarAdminPage";
import { AllBookingsPage } from "../page/bookings-admin/AllBookingsPage";

export default function AppRoutes() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/dashboard-admin" element={<DashboarAdminPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/my-booking" element={<MyBookingPage />} />
      <Route path="/all-bookings" element={<AllBookingsPage />} />
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
