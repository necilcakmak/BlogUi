import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminLayout = () => {
  return (
    <div className="container">
      <AdminNav />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
