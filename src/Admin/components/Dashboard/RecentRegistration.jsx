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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Heading with purple background */}
      <div className="bg-[#7C68FF] px-6 py-4">
        <h2 className="text-lg font-bold text-white">RECENT REGISTRATION</h2>
      </div>
     
      {/* Table with alternating row colors */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profile ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((user, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "" : "bg-[#7C68FF0D]"} // Alternative rows with #7C68FF0D (5% opacity)
                >
                  <td className="px-4 py-3 text-sm text-gray-800">{user.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.gender}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.age}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.city}</td>
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