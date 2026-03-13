import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Sidebar } from "./components";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import LoginPage from "./page/login/LoginPage";
import RegisterPage from "./page/register/RegisterPage";
import { type ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes without sidebar */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Application routes with sidebar */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Sidebar>
                <main className="min-h-screen bg-gray-50 p-4 md:p-8">
                  <AppRoutes />
                </main>
              </Sidebar>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
