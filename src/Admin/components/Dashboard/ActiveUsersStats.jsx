import React from 'react';
import { FiUsers } from 'react-icons/fi';

const ActiveUsers = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col justify-center">
      <div className="flex items-start justify-between">
        {/* Left: Icon and text */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
            <FiUsers className="text-white text-2xl" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 tracking-tight">Active Users</h2>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed max-w-[160px]">
              Track user engagement and platform activity in real-time.
            </p>
          </div>
        </div>

        {/* Right: Number in corner */}
        <div className="text-right">
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">50k</div>
          <div className="inline-block px-2 py-1 mt-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md border border-green-100">
            Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
