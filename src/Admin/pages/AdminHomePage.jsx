// components/AdminHomePage.jsx
import React from 'react';
import WelcomeSection from '../components/Home/WelcomeSection';
import DashboardStats from '../components/Home/DashboardStats';
import FeaturesGrid from '../components/Home/FeaturesGrid';
import SuccessStories from '../components/Home/SuccessStories';
import HowItWorks from "../components/Home/HowItWorks";
import PricingPlans from "../components/Home/PricingPlans";
import FaqSection from"../components/Home/FaqSection";


const AdminHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
      <WelcomeSection />
      <DashboardStats />
      <FeaturesGrid />
       <SuccessStories />
      <HowItWorks />
      <PricingPlans />
      < FaqSection/>

    </div>
  );
};

export default AdminHomePage;