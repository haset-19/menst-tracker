import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
  const { currentUser } = useAuth(); // useAuth() returns true or false based on localStorage

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
