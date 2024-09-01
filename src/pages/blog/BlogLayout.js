import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
