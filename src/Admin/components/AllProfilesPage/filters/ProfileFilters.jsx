import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";

const filters = [
  "Gender",
  "Age",
  "City",
  "Status",
  "Verification",
  "Membership",
  "Religion",
  "Caste",
  "Subscription Expiry",
  "Marital Status",
  "Photo Uploaded",
  "Last Login",
];

const ProfileFilters = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= MOBILE / TABLET FILTER BUTTON ================= */}
      <div className="lg:hidden mb-3">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm"
        >
          <FiFilter />
          Filters
        </button>
      </div>

      {/* ================= OVERLAY (MOBILE) ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= FILTER PANEL ================= */}
      <div
        className={`
          fixed lg:static z-50
          top-0 left-0 h-full lg:h-[calc(100vh-160px)]
          w-[260px] bg-white border border-gray-200 rounded-xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col
        `}
      >
        {/* ================= HEADER ================= */}
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
            Filter
          </h3>

          {/* CLOSE (Mobile only) */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-gray-500 text-lg"
          >
            ✕
          </button>
        </div>

        {/* ================= SCROLLABLE CONTENT ================= */}
        <div className="px-5 py-4 overflow-y-auto flex-grow space-y-4">
          {/* SEARCH */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Name / ID / Email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#7C68FF] outline-none"
              />
              <span className="absolute right-3 top-2.5 text-gray-400 text-sm">
                🔍
              </span>
            </div>
          </div>

          {/* FILTER DROPDOWNS */}
          {filters.map((filter, index) => (
            <div key={index}>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {filter}
              </label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:ring-1 focus:ring-[#7C68FF] outline-none">
                <option>Select {filter}</option>
              </select>
            </div>
          ))}
        </div>

        {/* ================= FOOTER ACTIONS ================= */}
        <div className="px-5 py-4 border-t space-y-3">
          <button
            onClick={() => setOpen(false)}
            className="w-full bg-[#991CDD] text-white py-2 rounded-lg text-sm font-medium"
          >
            Apply Filter
          </button>

          <button
            onClick={() => setOpen(false)}
            className="w-full text-[#7C68FF] border border-[#7C68FF] py-2 rounded-lg text-sm font-medium"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileFilters;
