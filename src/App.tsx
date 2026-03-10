import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./register/RegisterPage";
import DashboardPage from "./dashboard/DashboardPage";
import MakeAppointmentPage from "./make-appointment/MakeAppointmentPage";
import { Sidebar } from "./components";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes - No Sidebar */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes - With Sidebar */}
        <Route element={<Sidebar />}>
          <Route
            path="/dashboard"
            element={
              <main className="min-h-screen bg-gray-50 p-4 md:p-8">
                <DashboardPage />
              </main>
            }
          />
          <Route
            path="/my-booking"
            element={
              <main className="min-h-screen bg-gray-50 p-4 md:p-8">
                <MakeAppointmentPage />
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
