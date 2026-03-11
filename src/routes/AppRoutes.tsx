import { Route, Routes } from "react-router-dom";
import DashboardPage from "../page/dashboard/DashboardPage";
import { MyBookingPage } from "../page/my-booking/MyBookingPage";
import MakeAppointmentPage from "../page/make-appointment/MakeAppointmentPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/my-booking" element={<MyBookingPage />} />
      <Route path="/make-appointment" element={<MakeAppointmentPage />} />
    </Routes>
  );
}
