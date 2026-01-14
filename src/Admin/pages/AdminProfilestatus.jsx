import React, { useState } from "react";
import ProfileStatusHeader from "../components/Projectstatus/ProfileStatusHeader";
import ProfileStatusFilter from "../components/Projectstatus/ProfileStatusFilter";
import ProfileStatusTable from "../components/Projectstatus/ProfileStatusTable";
import Profilesstatustopheader from "../components/Projectstatus/Profilestatustopheader";
 
export default function ProfileStatus() {
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    membership: "",
    city: "",
    verification: "",
  });
 
  const handleApply = () => {
    console.log("Apply Filters:", filters);
  };
 
  const handleReset = () => {
    setFilters({
      search: "",
      gender: "",
      membership: "",
      city: "",
      verification: "",
    });
  };
 
  return (
    <div className="min-h-screen bg-[#F2F7FF] p-5 pt-[80px]">
      {/* Top Header */}
      <Profilesstatustopheader />
 
      {/* Page Header */}
      <ProfileStatusHeader />
 
      {/* Main Layout */}
      <div className="mt-4 flex flex-col lg:flex-row gap-5 items-start w-full">
        {/* Filter */}
        <div className="w-full lg:w-[260px] shrink-0">
          <ProfileStatusFilter
            filters={filters}
            setFilters={setFilters}
            onApply={handleApply}
            onReset={handleReset}
          />
        </div>
 
        {/* Table */}
        <div className="flex-1 w-full min-w-0 overflow-hidden">
          <ProfileStatusTable />
        </div>
      </div>
    </div>
  );
}
