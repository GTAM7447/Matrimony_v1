import React from 'react';
import { FiUser } from 'react-icons/fi';
 
const Revenue = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-[#D06A0A] rounded-full flex items-center justify-center mr-4">
            <FiUser className="text-white text-xl" />
          </div>
         
          <div>
            <h2 className="text-lg font-bold text-gray-800">Revenue</h2>
            <p className="text-gray-600 text-sm mt-1 max-w-xs">
              Lorem ipsum dolor sit amet consectetur. Est nullam tempus diam duis sit aliquet sed.
              Utridies interdum amat consectetur.
            </p>
          </div>
        </div>
       
        <div className="text-right">
          <div className="text-2xl font-bold text-[#D06A0A]">₹30L</div>
          {/* Removed background color - just text */}
          <div className="text-xs font-medium text-gray-500 mt-1">
            This Month
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Revenue;
 