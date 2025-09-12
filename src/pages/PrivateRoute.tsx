import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function PrivateRoute({ children, fallback }: PrivateRouteProps) {
  const { user, loading, hasValidated } = useAuth();

  if (!hasValidated || loading) {
    return fallback || <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
