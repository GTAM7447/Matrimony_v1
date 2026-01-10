import React from 'react';
import ActiveUsers from '../components/Dashboard/ActiveUsersStats';
import RevenueStats from '../components/Dashboard/RevenueStats';
import NewUsers from '../components/Dashboard/NewUsers';
import ChartSection from '../components/Dashboard/ChartSection';
import Verifications from '../components/Dashboard/Verifications';
import RecentRegistration from '../components/Dashboard/RecentRegistration';
import ReviewsRightBox from '../components/Dashboard/ReviewsRightBox';
 
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F2F7FF] p-6 pt-[80px]">
      {/* Top Stats Row - Changed sequence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <NewUsers />
        <ActiveUsers />
        <RevenueStats />
      </div>
 
      {/* Main Content Row - 3 columns with charts in right column */}
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