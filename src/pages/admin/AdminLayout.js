import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const AdminLayout = () => {
  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
