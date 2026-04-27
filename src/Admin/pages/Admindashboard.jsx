<<<<<<< HEAD
=======
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























>>>>>>> 5a22e7dbca958a4e03acb42f137d3f10a9e70ea4
import React from 'react';
import { Link } from 'react-router-dom';
import ActiveUsers from '../components/Dashboard/ActiveUsersStats';
import RevenueStats from '../components/Dashboard/RevenueStats';
import NewUsers from '../components/Dashboard/NewUsers';
import ChartSection from '../components/Dashboard/ChartSection';
import Verifications from '../components/Dashboard/Verifications';
import RecentRegistration from '../components/Dashboard/RecentRegistration';
import ReviewsRightBox from '../components/Dashboard/ReviewsRightBox';
<<<<<<< HEAD
import { FiPlus, FiGrid } from 'react-icons/fi';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 p-6 pt-[100px] font-sans">

      {/* 
        Injecting custom keyframes for animations directly here 
        since we cannot modify global css easily.
      */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.5s ease-out forwards;
          }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
        `}
      </style>

      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
=======
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
>>>>>>> 5a22e7dbca958a4e03acb42f137d3f10a9e70ea4
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiGrid className="w-6 h-6 text-purple-600" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Dashboard Overview</h1>
            </div>
            <p className="text-gray-500 font-medium ml-1">Welcome back, get an update on your platform.</p>
          </div>

          {/* ACTION BUTTON */}
          <Link
            to="/admin/create-profile"
            className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-purple-200 hover:shadow-purple-300 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="bg-white/20 p-1 rounded-full group-hover:rotate-90 transition-transform duration-300">
              <FiPlus className="w-4 h-4" />
            </div>
            <span>New Registration</span>
          </Link>
        </div>

        {/* STATS ROW - Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="opacity-0 animate-fade-in-up delay-100 hover:scale-[1.02] transition-transform duration-300">
            <NewUsers />
          </div>
          <div className="opacity-0 animate-fade-in-up delay-200 hover:scale-[1.02] transition-transform duration-300">
            <ActiveUsers />
          </div>
          <div className="opacity-0 animate-fade-in-up delay-300 hover:scale-[1.02] transition-transform duration-300">
            <RevenueStats />
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>

          {/* LEFT COLUMN (Table & Verifications) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <RecentRegistration />
            </div>

            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <Verifications />
            </div>
          </div>

          {/* RIGHT COLUMN (Charts) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <ChartSection />
            </div>

            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <ReviewsRightBox />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;