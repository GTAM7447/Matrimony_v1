import React from "react";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <AdminNavbar /> 
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
};

export default PublicLayout;
