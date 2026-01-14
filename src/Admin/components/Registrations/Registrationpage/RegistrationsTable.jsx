import React from "react";
import { FiEye, FiCheckCircle, FiCalendar } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
 
export default function RegistrationsTable({ data }) {
  const currentPage = 1;
  const totalPages = 4;
 
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {/* Top bar */}
      <div className="px-5 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center gap-6 text-sm">
          <span className="font-medium text-gray-800 border-b-2 border-purple-600 pb-1">
            All Profiles
          </span>
 
          <span className="flex items-center gap-2 text-green-600">
            <FiCheckCircle />
            82 Profiles verified
          </span>
 
          <span className="flex items-center gap-2 text-purple-600">
            <HiUserGroup />
            45 Brides
          </span>
 
          <span className="flex items-center gap-2 text-orange-500">
            <HiUserGroup />
            37 Grooms
          </span>
        </div>
 
        <div className="flex gap-2 items-center">
          <select className="border rounded-md px-3 py-1.5 text-sm bg-white">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
 
          <div className="relative">
            <input
              type="date"
              className="border rounded-md px-3 py-1.5 pr-9 text-sm bg-white"
            />
           
          </div>
        </div>
      </div>
 
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#F6F7FB] text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Profile ID</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Gender</th>
              <th className="px-4 py-3 text-left font-medium">Age</th>
              <th className="px-4 py-3 text-left font-medium">City</th>
              <th className="px-4 py-3 text-left font-medium">Religion</th>
              <th className="px-4 py-3 text-left font-medium">Caste</th>
              <th className="px-4 py-3 text-left font-medium">Profession</th>
              <th className="px-4 py-3 text-left font-medium">Membership</th>
              <th className="px-4 py-3 text-left font-medium">Verification</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
 
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3">MAT10231</td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.gender}</td>
                <td className="px-4 py-3">{row.age}</td>
                <td className="px-4 py-3">{row.city}</td>
                <td className="px-4 py-3">{row.religion}</td>
                <td className="px-4 py-3">{row.caste}</td>
                <td className="px-4 py-3">{row.profession}</td>
 
                <td className="px-4 py-3 text-purple-600 font-medium">
                  {row.membership}
                </td>
 
                <td className="px-4 py-3">{row.verification}</td>
 
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                    {row.status}
                  </span>
                </td>
 
                <td className="px-4 py-3">
                  <button className="p-2 rounded-full bg-[#EEF2FF] text-blue-600 hover:bg-blue-100">
                    <FiEye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {/* Pagination – LEFT SIDE */}
      <div className="flex items-center gap-2 py-4 border-t border-gray-200 px-5">
        <button className="p-2 rounded hover:bg-gray-100">
          <MdKeyboardArrowLeft size={18} />
        </button>
 
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
 
          return (
            <button
              key={page}
              className={`w-7 h-7 rounded text-sm flex items-center justify-center
                ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          );
        })}
 
        <button className="p-2 rounded hover:bg-gray-100">
          <MdKeyboardArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
 
 