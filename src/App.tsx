import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import DashboardPage from "./dashboard/DashboardPage";
import MakeAppointmentPage from "./make-appointment/MakeAppointmentPage";
import { Sidebar } from "./components";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <main className="min-h-screen bg-gray-50 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/my-booking" element={<MakeAppointmentPage />} />
          </Routes>
        </main>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
