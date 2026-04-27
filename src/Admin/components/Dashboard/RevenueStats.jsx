import React from 'react';
import { FiDollarSign } from 'react-icons/fi'; // Changed icon to DollarSign for Revenue

const Revenue = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col justify-center">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
            <FiDollarSign className="text-white text-2xl" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 tracking-tight">Revenue</h2>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed max-w-[160px]">
              Total earnings tracked for the current financial period.
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">₹30L</div>
          {/* Badge for time period */}
          <div className="inline-block px-2 py-1 mt-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-md border border-orange-100">
            This Month
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
