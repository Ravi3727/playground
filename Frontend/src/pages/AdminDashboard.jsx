// src/pages/AdminDashboard.jsx
import React from "react";
import NavBar from "../components/NavBar";
const AdminDashboard = () => {
  return (
      <div className="container mx-auto px-4 py-8">
        <NavBar></NavBar>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-600 mb-4">
        This is a placeholder for the admin dashboard that will be developed by someone else.
      </p>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md">
        <p className="font-bold">Under Construction</p>
        <p>This dashboard will contain admin controls and analytics.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
