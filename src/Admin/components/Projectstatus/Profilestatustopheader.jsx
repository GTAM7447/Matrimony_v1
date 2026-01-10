import React from "react";
import { FiGrid, FiUsers } from "react-icons/fi";
 
export default function RegistrationTabs() {
  return (
    <div className="bg-white rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
      {/* Dashboard */}
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
        style={{ backgroundColor: "#F9F2FD", color: "#991CDD" }}
      >
        <FiGrid className="text-sm" />
        <span>Dashboard</span>
      </div>
 
      {/* Separator */}
      <span style={{ color: "#991CDD" }} className="font-medium">
        /
      </span>
 
      {/* Registrations */}
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
        style={{ backgroundColor: "#F9F2FD", color: "#991CDD" }}
      >
        <FiUsers className="text-sm" />
        <span>ProfileStatus</span>
      </div>
    </div>
  );
}