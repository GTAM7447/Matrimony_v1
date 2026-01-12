// components/FeaturesGrid.jsx
import React from "react";
import {
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaCheckCircle,
  FaCreditCard,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const FeaturesGrid = () => {
  const features = [
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Monitor User Activity",
      description:
        "Track new registrations, active profiles, and engagement reports.",
    },
    {
      icon: <MdSupportAgent className="w-8 h-8" />,
      title: "Content & Complaint Management",
      description:
        "Review uploaded images, moderate content, handle support tickets.",
    },
    {
      icon: <FaCheckCircle className="w-8 h-8" />,
      title: "Approve & Verify Profiles",
      description: "Ensure genuine and authentic member onboarding.",
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Advanced Analytics",
      description:
        "Get insights on user trends, success rates, and platform growth.",
    },
    {
      icon: <FaCreditCard className="w-8 h-8" />,
      title: "Subscription Management",
      description:
        "Handle plans, payments, renewals, and revenue insights.",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure Access",
      description:
        "Authorised personnel only. All operations are logged for security.",
    },
  ];

  return (
    <section
      className="pt-16 pb-16"
      style={{ backgroundColor: "#7C68FF0F" }}
    >
      {/* CENTERED HEADING */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 inline-block pb-2 border-b-4 border-purple-600">
          Why Use the Admin Panel?
        </h2>
      </div>

      {/* FEATURES GRID */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 hover:border-purple-600 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-50 to-purple-100 mb-5 mx-auto">
              <div className="text-purple-600">{feature.icon}</div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
              {feature.title}
            </h3>

            <p className="text-gray-600 leading-relaxed text-center flex-grow">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
