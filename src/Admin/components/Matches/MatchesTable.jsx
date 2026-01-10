import React from "react";
import { FiEye } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
 
export default function MatchesTable({ data }) {
  const currentPage = 1;
  const totalPages = 4;
 
  return (
    <div className="bg-white rounded-xl w-full overflow-hidden">
      {/* Top label */}
      <div className="px-5 py-4 text-sm text-gray-700 font-medium border-b border-gray-200">
        All Profiles
      </div>
 
      {/* Table wrapper */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full w-full text-sm table-auto">
          <thead className="bg-[#F6F7FB] text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Sr. No.
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Match ID
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Bride Name (ID)
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Groom Name (ID)
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Match Date
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Marriage Status
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Verification
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                City
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
 
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 whitespace-nowrap">{i + 1}</td>
                <td className="px-4 py-3 whitespace-nowrap">{row.matchId}</td>
                <td className="px-4 py-3 whitespace-nowrap">{row.bride}</td>
                <td className="px-4 py-3 whitespace-nowrap">{row.groom}</td>
                <td className="px-4 py-3 whitespace-nowrap">{row.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">{row.status}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {row.verification}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{row.city}</td>
 
                <td className="px-4 py-3 whitespace-nowrap">
                  <button className="p-2 rounded-full bg-[#EEF2FF] text-blue-600 hover:bg-blue-100">
                    <FiEye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {/* Pagination */}
      <div className="flex items-center gap-2 py-4 border-t border-gray-200 px-5 flex-wrap">
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
 
 