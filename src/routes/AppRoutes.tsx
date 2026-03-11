import { Route, Routes } from "react-router-dom";
import LoginPage from "../page/login/LoginPage";
import DashboardPage from "../page/dashboard/DashboardPage";
import MakeAppointmentPage from "../page/make-appointment/MakeAppointmentPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/my-booking" element={<MakeAppointmentPage />} />
    </Routes>
  );
}
