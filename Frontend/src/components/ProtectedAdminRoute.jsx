// src/components/ProtectedAdminRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedAdminRoute = () => {
  const { isLoaded, user } = useUser();
  
  // Show loading state while Clerk loads user data
  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  // Check if user has admin role in publicMetadata
  const isAdmin = user?.publicMetadata?.role === "admin";
  
  // Redirect to home if not an admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  // Render child routes if user is admin
  return <Outlet />;
};

export default ProtectedAdminRoute;
