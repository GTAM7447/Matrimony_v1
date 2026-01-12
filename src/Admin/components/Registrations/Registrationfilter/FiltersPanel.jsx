import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";

export default function FiltersPanel({ filters, setFilters, onApply, onReset }) {
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
          w-[260px] bg-white border border-gray-200 rounded-xl p-4
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* HEADER (Mobile Close) */}
        <div className="flex items-center justify-between mb-3 lg:hidden">
          <h3 className="text-sm font-semibold text-gray-700">FILTER</h3>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 text-lg"
          >
            ✕
          </button>
        </div>

        {/* DESKTOP HEADER */}
        <h3 className="hidden lg:block text-sm font-semibold text-gray-700 mb-3">
          FILTER
        </h3>

        <input
          type="text"
          placeholder="Search"
          className="w-full mb-3 px-3 py-2 border rounded-md text-sm"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />

        <p className="text-xs text-gray-500 mb-3">
          Summary bar: <span className="text-orange-500">243 Results</span>
        </p>

        <Select
          label="Gender"
          value={filters.gender}
          options={["Male", "Female"]}
          onChange={(v) => setFilters({ ...filters, gender: v })}
        />

        <Select
          label="Membership"
          value={filters.membership}
          options={["Free", "Premium"]}
          onChange={(v) => setFilters({ ...filters, membership: v })}
        />

        <Select
          label="City"
          value={filters.city}
          options={["Delhi", "Mumbai"]}
          onChange={(v) => setFilters({ ...filters, city: v })}
        />

        <Select
          label="Verification"
          value={filters.verification}
          options={["Verified", "Unverified"]}
          onChange={(v) =>
            setFilters({ ...filters, verification: v })
          }
        />

        <button
          onClick={() => {
            onApply();
            setOpen(false);
          }}
          className="w-full mt-4 border border-purple-500 text-purple-600 py-2 rounded-md text-sm"
        >
          Apply Filter
        </button>

        <button
          onClick={() => {
            onReset();
            setOpen(false);
          }}
          className="w-full mt-2 bg-purple-600 text-white py-2 rounded-md text-sm"
        >
          Reset Filter
        </button>
      </div>
    </>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <div className="mb-3">
      <label className="text-xs text-gray-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
