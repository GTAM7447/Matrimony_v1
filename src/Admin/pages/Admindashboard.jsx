// import React from 'react';
// import ActiveUsers from '../components/Dashboard/ActiveUsersStats';
// import RevenueStats from '../components/Dashboard/RevenueStats';
// import NewUsers from '../components/Dashboard/NewUsers';
// import ChartSection from '../components/Dashboard/ChartSection';
// import Verifications from '../components/Dashboard/Verifications';
// import RecentRegistration from '../components/Dashboard/RecentRegistration';
// import ReviewsRightBox from '../components/Dashboard/ReviewsRightBox';
 
// const AdminDashboard = () => {
//   return (
//     <div className="min-h-screen bg-[#F2F7FF] p-6 pt-[80px]">
//       {/* Top Stats Row - Changed sequence */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <NewUsers />
//         <ActiveUsers />
//         <RevenueStats />
//       </div>
 
//       {/* Main Content Row - 3 columns with charts in right column */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Recent Registration */}
//         <div className="lg:col-span-1">
//           <RecentRegistration />
//         </div>
       
//         {/* Middle Column - Verifications */}
//         <div className="lg:col-span-1">
//           <Verifications />
//         </div>
       
//         {/* Right Column - Both charts stacked vertically */}
//         <div className="lg:col-span-1">
//           {/* Pie Chart - Top */}
//           <div className="mb-6">
//             <ChartSection />
//           </div>
         
//           {/* Bar Chart - Bottom */}
//           <div>
//             <ReviewsRightBox />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;























import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import ActiveUsers from '../components/Dashboard/ActiveUsersStats';
import RevenueStats from '../components/Dashboard/RevenueStats';
import NewUsers from '../components/Dashboard/NewUsers';
import ChartSection from '../components/Dashboard/ChartSection';
import Verifications from '../components/Dashboard/Verifications';
import RecentRegistration from '../components/Dashboard/RecentRegistration';
import ReviewsRightBox from '../components/Dashboard/ReviewsRightBox';
import { Plus } from 'lucide-react'; // Optional: for icon

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F2F7FF] p-6 pt-[80px]">
      {/* Dashboard Header with Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        
        {/* Add Registration Button */}
        <Link
          to="/admin/create-profile"
          className="flex items-center gap-2 bg-[#991CDD] hover:opacity-90 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>New Registration</span>
        </Link>
      </div>
  
      {/* Top Stats Row - Changed sequence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <NewUsers />
        <ActiveUsers />
        <RevenueStats />
      </div>

      {/* Rest of your dashboard code remains the same */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Recent Registration */}
        <div className="lg:col-span-1">
          <RecentRegistration />
        </div>
       
        {/* Middle Column - Verifications */}
        <div className="lg:col-span-1">
          <Verifications />
        </div>
        
        {/* Right Column - Both charts stacked vertically */}
        <div className="lg:col-span-1">
          {/* Pie Chart - Top */}
          <div className="mb-6">
            <ChartSection /> 
          </div>
        
          {/* Bar Chart - Bottom */}
          <div>
            <ReviewsRightBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;