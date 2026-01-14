import React from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ADMIN NAVBAR */}
      <AdminNavbar />

      {/* ADMIN CONTENT */}
      <main className="flex-grow px-4 py-6">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default AdminLayout;