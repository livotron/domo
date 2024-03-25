import { ReactElement, ReactNode } from "react";
import { Link, Navigate, Route } from "react-router-dom";

interface Props {
  children: ReactElement
}

export const ProtectedRoutes = ({ children }: Props):ReactElement => {
  const token = localStorage.getItem("TOKEN");
  if (!token) {
    return <Navigate to="/" replace />
  }
  return children
}
