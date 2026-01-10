// components/WelcomeSection.jsx
import React from 'react';

const WelcomeSection = () => {
  return (
    <div 
      className="flex justify-center items-center min-h-[300px] w-full py-12 px-4 md:px-8"
      style={{ backgroundColor: '#7C68FF0F' }}
    >
      <div className="max-w-6xl w-full text-center space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Welcome to the<br />Matrimony Admin Panel
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto px-4">
          Manage your matrimony platform with speed, clarity, and security. This admin panel gives you
          complete control over user profiles, subscription, payments, and match-making operations—
          all from one place.
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;