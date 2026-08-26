import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminPrivateRoute = () => {
  const location = useLocation();

  // Admin login ke baad jo data localStorage me save hoga
  const admin = localStorage.getItem("careerSphereAdmin");

  let adminUser = null;

  try {
    adminUser = admin ? JSON.parse(admin) : null;
  } catch (error) {
    console.error("Admin auth data error:", error);
    adminUser = null;
  }

  // Admin login nahi hai
  if (!adminUser) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Admin authenticated hai
  return <Outlet />;
};

export default AdminPrivateRoute;