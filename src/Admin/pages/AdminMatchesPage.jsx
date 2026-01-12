import React, { useState } from "react";
import MatchesTopBar from "../components/Matches/MatchesTopBar";
import MatchesFiltersPanel from "../components/Matches/MatchesFiltersPanel";
import MatchesTable from "../components/Matches/MatchesTable";
 
export default function AdminMatchesPage() {
  const [filters, setFilters] = useState({
    search: "",
    bride: "",
    groom: "",
    city: "",
    membership: "",
    status: "",
  });
 
  const matchesData = Array.from({ length: 15 }, (_, i) => ({
    matchId: "MAT10231",
    bride: "Priya Sharma (MAT10231)",
    groom: "Rohan Mehta (MAT10455)",
    date: "10-Oct-2025",
    status: "Married",
    verification: i % 2 === 0 ? "Verified" : "Non-Verified",
    city: "Delhi",
  }));
 
  return (
    <div className="bg-[#F5F9FF] min-h-screen p-4 pt-[80px]">
      {/* Top Header */}
      <MatchesTopBar />
 
      {/* Filters + Table */}
      <div className="mt-4 flex flex-col lg:flex-row gap-4 w-full">
        {/* Filters */}
        <div className="w-full lg:w-[280px] shrink-0">
          <MatchesFiltersPanel
            filters={filters}
            setFilters={setFilters}
          />
        </div>
 
        {/* Table */}
        <div className="flex-1 w-full overflow-hidden">
          <MatchesTable data={matchesData} />
        </div>
      </div>
    </div>
  );
}