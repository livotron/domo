import { ReactElement, ReactNode } from "react";
import { Link, Navigate, Route } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface Props {
  children: ReactElement
}

export const ProtectedRoutes = ({ children }: Props):ReactElement => {
  const token = cookies.get("TOKEN");
  if (!token) {
    return <Navigate to="/" replace />
  }
  return children
}
