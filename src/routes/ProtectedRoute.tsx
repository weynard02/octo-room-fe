import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService";

type Props = {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly }: Props) {
  const token = localStorage.getItem("token");
  const user = authService.getUser();
  const isAdmin = user?.isAdmin;

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }
  return <>{children}</>;
};