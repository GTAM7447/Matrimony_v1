import React from 'react';
import { FiUserPlus } from 'react-icons/fi';

const NewUsers = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col justify-center">
      <div className="flex items-start justify-between">
        {/* Left: Icon and text */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200">
            <FiUserPlus className="text-white text-2xl" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 tracking-tight">New Users</h2>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed max-w-[160px]">
              Daily registration metrics and growth statistics.
            </p>
          </div>
        </div>

        {/* Right: Number in corner */}
        <div className="text-right">
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">1.5L</div>
          {/* Today with light background */}
          <div className="inline-block px-2 py-1 mt-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-md border border-purple-100">
            Today
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUsers;