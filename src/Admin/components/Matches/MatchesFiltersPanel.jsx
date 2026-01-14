import React, { useState } from "react";
import { FiSearch, FiCalendar, FiFilter } from "react-icons/fi";
 
const MatchesFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    bride: "",
    groom: "",
    city: "",
    date: "",
    membership: "",
    status: ""
  });
 
  const handleApply = () => {
    console.log("Applying filters:", filters);
    setIsOpen(false);
  };
 
  const handleReset = () => {
    setFilters({
      search: "",
      bride: "",
      groom: "",
      city: "",
      date: "",
      membership: "",
      status: ""
    });
    console.log("Filters reset");
    setIsOpen(false);
  };
 
  return (
    <>
      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm hover:bg-gray-50"
        >
          <FiFilter />
          Filters
        </button>
      </div>
 
      {/* OVERLAY (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
 
      {/* FILTER PANEL */}
      <div
        className={`
          fixed lg:static z-50
          top-0 left-0 h-full lg:h-auto
          w-[260px] bg-white border border-gray-200 rounded-xl p-4
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:shadow-sm
        `}
      >
        {/* HEADER (Mobile Close) */}
        <div className="flex items-center justify-between mb-3 lg:hidden">
          <h3 className="text-sm font-semibold text-gray-700">FILTER</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
 
        {/* DESKTOP HEADER */}
        <h3 className="hidden lg:block text-sm font-semibold text-gray-700 mb-3">
          FILTER
        </h3>
 
        {/* SEARCH */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search by Name / ID / Email"
            className="w-full px-3 py-2 pr-9 border rounded-lg text-sm outline-none focus:border-blue-400"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />
          <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
        </div>
 
        {/* SUMMARY */}
        <div className="text-xs text-gray-500 mb-4">
          Summary bar : <span className="text-orange-500">243 Results</span>{" "}
          &nbsp; Sort by : <span className="text-orange-500">Newest</span>
        </div>
 
        {/* FILTER OPTIONS */}
        <div className="border border-gray-200 rounded-xl p-3 grid grid-cols-2 gap-3 mb-4 bg-gray-50">
          <SelectFilter
            label="Bride"
            value={filters.bride}
            options={["All", "Option 1", "Option 2"]}
            onChange={(v) => setFilters({ ...filters, bride: v })}
          />
         
          <SelectFilter
            label="Groom"
            value={filters.groom}
            options={["All", "Option 1", "Option 2"]}
            onChange={(v) => setFilters({ ...filters, groom: v })}
          />
         
          <SelectFilter
            label="City"
            value={filters.city}
            options={["All", "Delhi", "Mumbai", "Chennai", "Bangalore"]}
            onChange={(v) => setFilters({ ...filters, city: v })}
          />
 
          {/* CALENDAR */}
          <div>
            <label className="text-xs text-gray-500">Date</label>
            <div className="relative mt-1">
              <input
                type="date"
                className="w-full px-2 py-2 border rounded-md text-xs focus:border-blue-400 outline-none"
                value={filters.date}
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />
              <FiCalendar className="absolute right-2 top-2.5 text-gray-400 text-sm" />
            </div>
          </div>
 
          <SelectFilter
            label="Membership"
            value={filters.membership}
            options={["All", "Free", "Premium", "Gold"]}
            onChange={(v) => setFilters({ ...filters, membership: v })}
          />
         
          <SelectFilter
            label="Status"
            value={filters.status}
            options={["All", "Active", "Pending", "Completed"]}
            onChange={(v) => setFilters({ ...filters, status: v })}
          />
        </div>
 
        {/* BUTTONS */}
        <div className="space-y-2">
          <button
            onClick={handleApply}
            className="w-full border border-blue-500 text-blue-600 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
          >
            Apply Filter
          </button>
 
          <button
            onClick={handleReset}
            className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </>
  );
};
 
// Updated Select component with label
const SelectFilter = ({ label, value, options, onChange }) => {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-2 py-2 border rounded-md text-xs bg-white focus:border-blue-400 outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
 
export default MatchesFilter;