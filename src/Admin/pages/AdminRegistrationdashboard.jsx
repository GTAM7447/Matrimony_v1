import React, { useState } from "react";
import FiltersPanel from "../components/Registrations/Registrationfilter/FiltersPanel";
import RegistrationsTable from "../components/Registrations/Registrationpage/RegistrationsTable";
import CompletedRegistrationsHeader from "../components/Registrations/CompletedRegistrationsHeader";
import RegistrationsTopBar from "../components/Registrations/AdminTopTabs";
import { FiEye } from "react-icons/fi";

const mockData = Array.from({ length: 15 }).map(() => ({
  name: "Priya Sharma",
  gender: "Female",
  age: 26,
  city: "Delhi",
  religion: "Hindu",
  caste: "Kayastha",
  profession: "Financial Analyst",
  membership: "Premium",
  verification: "Verified",
  status: "Active",
}));

export default function AdminRegistrationdashboard() {
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    membership: "",
    city: "",
    verification: "",
  });

  const resetFilters = () => {
    setFilters({
      search: "",
      gender: "",
      membership: "",
      city: "",
      verification: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#F2F7FF] p-3 pt-[80px]">
      <RegistrationsTopBar />
      <CompletedRegistrationsHeader />

      {/* RESPONSIVE LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* FILTERS */}
        <div className="w-full lg:w-[260px]">
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            onApply={() => {}}
            onReset={resetFilters}
          />
        </div>

        {/* TABLE */}
        <div className="flex-1 bg-white rounded-xl overflow-hidden">
          <div className="overflow-x-auto max-h-[75vh]">
            <RegistrationsTable data={mockData} EyeIcon={FiEye} />
          </div>
        </div>
      </div>
    </div>
  );
}