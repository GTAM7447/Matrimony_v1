import React from 'react';
 
const Verifications = () => {
  const verifications = [
    { id: 'MAT10231', name: 'Arjun Mehta', gender: 'Male', age: 29, status: 'Complete' },
    { id: 'MAT10231', name: 'Arjun Mehta', gender: 'Male', age: 29, status: 'Pending' },
    { id: 'MAT10231', name: 'Arjun Mehta', gender: 'Male', age: 29, status: 'On Hold' },
    { id: 'MAT10231', name: 'Arjun Mehta', gender: 'Male', age: 29, status: 'Complete' },
    { id: 'MAT10231', name: 'Arjun Mehta', gender: 'Male', age: 29, status: 'On Hold' },
    { id: 'MAT10231', name: 'Arjun Mehta', gender: 'Male', age: 29, status: 'In Review' },
    { id: 'MAT10231', name: 'Arjun Mehta', gender: 'Male', age: 29, status: 'On Hold' },
    { id: 'MAT10231', name: 'Arjun Mehta', gender: 'Male', age: 29, status: 'Pending' },
    { id: 'MAT10231', name: 'Arjun Mehta', gender: 'Male', age: 29, status: 'In Review' },
  ];
 
  const getStatusColor = (status) => {
    switch(status) {
      case 'Complete': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'On Hold': return 'bg-red-100 text-red-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
 
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Purple heading background */}
      <div className="bg-[#7C68FF] px-6 py-4">
        <h2 className="text-lg font-bold text-white">VERIFICATIONS</h2>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {verifications.map((user, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "" : "bg-[#7C68FF0D]"} // Alternative rows with #7C68FF0D (5% opacity)
                >
                  <td className="px-4 py-3 text-sm text-gray-800">{user.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.gender}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.age}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
 
export default Verifications;