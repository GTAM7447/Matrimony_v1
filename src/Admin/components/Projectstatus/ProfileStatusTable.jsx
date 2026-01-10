import React, { useState } from "react";
import { FiMoreVertical, FiEye, FiEdit, FiCheckCircle } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
 
const headers = [
  "",
  "Sr No.",
  "Profile ID",
  "Name",
  "Gender",
  "Age",
  "City",
  "Religion",
  "Caste",
  "Profession",
  "Membership",
  "Verification",
  "Send Request",
  "Receive Request",
  "Status",
  "Actions",
];
 
export default function ProfileStatusTable() {
  const data = [
    {
      profileId: "MAT10231",
      name: "Priya Sharma",
      gender: "Female",
      age: 26,
      city: "Delhi",
      religion: "Hindu",
      caste: "Kayastha",
      profession: "Financial Analyst",
      membership: "Premium",
      verification: "Verified",
      sendRequests: 7,
      receiveRequests: 12,
    },
    {
      profileId: "MAT10232",
      name: "Rahul Verma",
      gender: "Male",
      age: 29,
      city: "Mumbai",
      religion: "Hindu",
      caste: "Brahmin",
      profession: "Software Engineer",
      membership: "Gold",
      verification: "Verified",
      sendRequests: 10,
      receiveRequests: 5,
    },
    {
      profileId: "MAT10233",
      name: "Neha Patil",
      gender: "Female",
      age: 25,
      city: "Pune",
      religion: "Hindu",
      caste: "Maratha",
      profession: "HR Manager",
      membership: "Free",
      verification: "Pending",
      sendRequests: 3,
      receiveRequests: 8,
    },
  ];
 
  const [statusMap, setStatusMap] = useState(
    data.reduce((acc, _, i) => ({ ...acc, [i]: true }), {})
  );
  const [openMenu, setOpenMenu] = useState(null);
 
  const toggleStatus = (index) => {
    setStatusMap((prev) => ({ ...prev, [index]: !prev[index] }));
  };
 
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {/* TOP BAR */}
      <div className="px-5 py-4 flex flex-wrap gap-6 items-center border-b border-gray-200 text-sm">
        <span className="font-medium text-gray-800 border-b-2 border-purple-600 pb-1">
          All Profiles
        </span>
 
        <span className="flex items-center gap-2 text-green-600">
          <FiCheckCircle />
          82 Profiles Verified
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
 
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1500px] text-sm whitespace-nowrap">
          <thead className="bg-[#F6F7FB] text-gray-600">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
 
          <tbody>
            {data.map((row, index) => {
              const isActive = statusMap[index];
 
              return (
                <tr
                  key={index}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" />
                  </td>
                  
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{row.profileId}</td>
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
 
                  <td className="px-4 py-3 text-center text-blue-600 font-medium">
                    {row.sendRequests}
                  </td>
 
                  <td className="px-4 py-3 text-center text-blue-600 font-medium">
                    {row.receiveRequests}
                  </td>
 
                  {/* STATUS */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(index)}
                      className="relative w-21 h-7 rounded-full flex items-center transition"
                      style={{
                        backgroundColor: isActive
                          ? "#3CDD1C17"
                          : "#FF000026",
                      }}
                    >
                      <span
                        className={`absolute w-5 h-5 rounded-full transition ${
                          isActive ? "right-1" : "left-1"
                        }`}
                        style={{
                          backgroundColor: isActive ? "#1BA96B" : "#FF0000",
                        }}
                      />
                      <span
                        className={`w-full text-[11px] font-semibold ${
                          isActive ? "text-left pl-2" : "text-right pr-2"
                        }`}
                        style={{
                          color: isActive ? "#1BA96B" : "#FF0000",
                        }}
                      >
                        {isActive ? "Activate" : "Deactivate"}
                      </span>
                    </button>
                  </td>
 
                  {/* ACTIONS */}
                  <td className="px-4 py-3 relative">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === index ? null : index)
                      }
                    >
                      <FiMoreVertical />
                    </button>
 
                    {openMenu === index && (
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-md z-20">
                        <button className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm">
                          <FiEye /> View
                        </button>
                        <button className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm">
                          <FiEdit /> Edit
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
 
      {/* PAGINATION */}
      <div className="flex items-center gap-2 py-4 px-5 border-t border-gray-200">
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            className="w-7 h-7 rounded text-sm border border-gray-300 hover:bg-gray-800 hover:text-white"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}