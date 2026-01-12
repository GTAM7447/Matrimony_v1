// components/PlatformStats.jsx
import React from 'react';
import { 
  FaHeart, 
  FaUsers, 
  FaCheckCircle, 
  FaChartLine,
  FaShieldAlt,
  FaCertificate
} from 'react-icons/fa';

const PlatformStats = () => {
  return (
    <div className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Stat Card 1 */}
          <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <FaHeart className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
            </div>
            <p className="text-gray-700 text-lg">
              Successful marriages facilitated through our platform
            </p>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <FaUsers className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">1.5L+</h3>
            </div>
            <p className="text-gray-700 text-lg">
              Active profiles with detailed compatibility matching
            </p>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <FaCheckCircle className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">98%</h3>
            </div>
            <p className="text-gray-700 text-lg">
              Verified profiles ensuring authenticity and security
            </p>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShieldAlt className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Secure Platform</h4>
            <p className="text-gray-700">
              Advanced security measures to protect your privacy and data
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaChartLine className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Smart Matching</h4>
            <p className="text-gray-700">
              AI-powered compatibility algorithm for better matches
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCertificate className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Verified Profiles</h4>
            <p className="text-gray-700">
              Rigorous verification process for genuine connections
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformStats;