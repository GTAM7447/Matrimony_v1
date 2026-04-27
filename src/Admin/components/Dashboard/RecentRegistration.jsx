import React from 'react';

const RecentRegistration = () => {
  const registrations = [
    { id: 'MAT10231', name: 'Arjun Merko', gender: 'Mole', age: 20, city: 'Mumbai' },
    { id: 'MAT10231', name: 'Arjun Merko', gender: 'Mole', age: 20, city: 'Mumbai' },
    { id: 'MAT10231', name: 'Arjun Merko', gender: 'Mole', age: 20, city: 'Mumbai' },
    { id: 'MAT10231', name: 'Arjun Merko', gender: 'Mole', age: 20, city: 'Mumbai' },
    { id: 'MAT10231', name: 'Arjun Merko', gender: 'Mole', age: 20, city: 'Mumbai' },
    { id: 'MAT10231', name: 'Arjun Merko', gender: 'Mole', age: 20, city: 'Mumbai' },
    { id: 'MAT10231', name: 'Arjun Merko', gender: 'Mole', age: 20, city: 'Mumbai' },
    { id: 'MAT10231', name: 'Arjun Merko', gender: 'Mole', age: 20, city: 'Mumbai' },
    { id: 'MAT10231', name: 'Arjun Merko', gender: 'Mole', age: 20, city: 'Mumbai' },
    { id: 'MAT10231', name: 'Arjun Merko', gender: 'Mole', age: 20, city: 'Mumbai' },
    { id: 'MAT10231', name: 'Arjun Merko', gender: 'Mole', age: 20, city: 'Mumbai' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
      {/* Heading with purple background */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white tracking-wide">Recent Registrations</h2>
          <button className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-colors">View All</button>
        </div>
      </div>

      {/* Table with alternating row colors */}
      <div className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Profile ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">City</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {registrations.map((user, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-purple-50/30"}`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{user.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.gender}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.age}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentRegistration;