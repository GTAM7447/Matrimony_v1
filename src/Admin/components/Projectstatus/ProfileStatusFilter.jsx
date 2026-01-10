import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
 
export default function ProfileStatusFilter({
  filters,
  setFilters,
  onApply,
  onReset,
}) {
  const [open, setOpen] = useState(false);
 
  return (
    <>
      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden mb-3">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
        >
          <FiFilter />
          Filters
        </button>
      </div>
 
      {/* OVERLAY (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
 
      {/* FILTER PANEL */}
      <div
        className={`
          fixed lg:static z-50
          top-0 left-0 h-full lg:h-auto
          w-[260px] bg-white border border-blue-100 rounded-2xl
          px-6 py-7
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* HEADER (Mobile) */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h3 className="text-sm font-semibold text-gray-800">
            FILTER
          </h3>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 text-lg"
          >
            ✕
          </button>
        </div>
 
        {/* HEADER (Desktop) */}
        <h3 className="hidden lg:block text-sm font-semibold text-gray-800 mb-6">
          FILTER
        </h3>
 
        {/* SEARCH */}
        <div className="mb-7">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />
        </div>
 
        {/* SUMMARY */}
        <div className="mb-8">
          <p className="text-xs text-gray-500">Summary bar</p>
          <p className="text-sm font-medium text-orange-500 mt-1">
            243 Results
          </p>
        </div>
 
        {/* FILTERS */}
        <div className="space-y-7">
          <Select
            label="Gender"
            value={filters.gender}
            options={["Male", "Female"]}
            onChange={(v) =>
              setFilters({ ...filters, gender: v })
            }
          />
 
          <Select
            label="Membership"
            value={filters.membership}
            options={["Free", "Premium"]}
            onChange={(v) =>
              setFilters({ ...filters, membership: v })
            }
          />
 
          <Select
            label="City"
            value={filters.city}
            options={["Delhi", "Mumbai"]}
            onChange={(v) =>
              setFilters({ ...filters, city: v })
            }
          />
 
          <Select
            label="Verification"
            value={filters.verification}
            options={["Verified", "Unverified"]}
            onChange={(v) =>
              setFilters({ ...filters, verification: v })
            }
          />
        </div>
 
        {/* ACTIONS */}
        <div className="mt-10 space-y-4">
          <button
            onClick={() => {
              onApply();
              setOpen(false);
            }}
            className="w-full border border-purple-500 text-purple-600 py-3 rounded-lg text-sm hover:bg-purple-50"
          >
            Apply Filter
          </button>
 
          <button
            onClick={() => {
              onReset();
              setOpen(false);
            }}
            className="w-full bg-purple-600 text-white py-3 rounded-lg text-sm hover:bg-purple-700"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </>
  );
}
 
function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-purple-400"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}