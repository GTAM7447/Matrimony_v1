import React, { useState } from "react";
import MatchesTopBar from "./MatchesTopBar";
import MatchesFiltersPanel from "./MatchesFiltersPanel";
import MatchesTable from "./MatchesTable";
 
const dummyData = Array.from({ length: 15 }, (_, i) => ({
  matchId: "MAT10231",
  bride: "Priya Sharma (MAT10231)",
  groom: "Rohan Mehta (MAT10455)",
  date: "10-Oct-2025",
  status: "Married",
  verification: i % 2 === 0 ? "Verified" : "Non-Verified",
  city: "Delhi",
}));
 
export default function MatchesPage() {
  const [filters, setFilters] = useState({
    search: "",
    bride: "",
    groom: "",
    city: "",
    membership: "",
    status: "",
  });
 
  return (
    <div className="bg-[#F5F9FF] p-4 min-h-screen">
      <MatchesTopBar />
 
      <div className="flex gap-4 mt-4">
        <MatchesFiltersPanel
          filters={filters}
          setFilters={setFilters}
        />
 
        <MatchesTable data={dummyData} />
      </div>
    </div>
  );
}
 
 