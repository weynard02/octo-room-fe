import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import LoginPage from "./page/login/LoginPage";
import RegisterPage from "./page/register/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes without sidebar */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Application routes with sidebar */}
        <Route
          path="*"
          element={
            <Sidebar>
              <main className="min-h-screen bg-gray-50 p-4 md:p-8">
                <AppRoutes />
              </main>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
