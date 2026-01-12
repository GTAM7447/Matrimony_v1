import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
 
const NewUsers = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-start justify-between">
        {/* Left: Icon and text */}
        <div className="flex items-start">
          <div className="w-12 h-12 bg-[#7C68FF] rounded-full flex items-center justify-center mr-4">
            <FiUserPlus className="text-white text-xl" />
          </div>
         
          <div>
            <h2 className="text-lg font-bold text-gray-800">New Users</h2>
            <p className="text-gray-600 text-sm mt-1 max-w-xs">
              Lorem ipsum dolor sit amet consectetur. Est nullam tempus diam duis sit aliquet sed.
              Utricies interdum amet consectetur.
            </p>
          </div>
        </div>
         
        {/* Right: Number in corner */}
        <div className="text-right">
          <div className="text-2xl font-bold text-[#7C68FF]">1.5L</div>
          {/* Today with light background #7C68FF with 21% opacity */}
          <div className="text-xs font-medium text-[#7C68FF] px-2 py-1 rounded inline-block mt-1"
               style={{ backgroundColor: 'rgba(124, 104, 255, 0.13)' }}>
            Today
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default NewUsers;