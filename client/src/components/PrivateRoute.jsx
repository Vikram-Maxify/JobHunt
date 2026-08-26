import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();

  // Get logged-in user/token from localStorage
  const token = localStorage.getItem("token");

  // If user is not logged in
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // User is logged in
  return <Outlet />;
};

export default PrivateRoute;