// components/DashboardStats.jsx
import React from "react";
import dashboardImage from "../../assets/Home/PlatformStats/PlatformStats.jpg"; 

const DashboardStats = () => {
  return (
    <div className="mb-10 flex justify-center">
      <img
        src={dashboardImage}
        alt="Dashboard Banner"
        className="w-full max-w-5xl rounded-2xl shadow-lg object-cover"
      />
    </div>
  );
};

export default DashboardStats;
