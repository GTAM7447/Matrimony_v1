import React from 'react';
import { FiUsers } from 'react-icons/fi';
 
const ActiveUsers = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-start justify-between">
        {/* Left: Icon and text */}
        <div className="flex items-start">
          <div className="w-12 h-12 bg-[#1E9863] rounded-full flex items-center justify-center mr-4">
            <FiUsers className="text-white text-xl" />
          </div>
         
          <div>
            <h2 className="text-lg font-bold text-gray-800">Active Users</h2>
            <p className="text-gray-600 text-sm mt-1 max-w-xs">
              Lorem ipsum dolor sit amet consectetur. Est nullam tempus diam duis sit aliquet sed.
              Utirides interdum amet consectetur.
            </p>
          </div>
        </div>
       
        {/* Right: Number in corner */}
        <div className="text-right">
          <div className="text-2xl font-bold text-[#1E9863]">50k</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
      </div>
    </div>
  );
};
 
export default ActiveUsers;
 