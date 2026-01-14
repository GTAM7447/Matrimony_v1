import React from "react";
import { UserPlus, Search, MessageCircle, Calendar } from "lucide-react";

const steps = [
  {
    title: "Create Account",
    description: "Sign up for free and share basic details",
    icon: <UserPlus className="text-purple-500" />,
  },
  {
    title: "Browse & Match",
    description: "Find profiles that match your preferences",
    icon: <Search className="text-purple-500" />,
  },
  {
    title: "Connect & Communicate",
    description: "Send interests, chat and get to know your match",
    icon: <MessageCircle className="text-purple-500" />,
  },
  {
    title: "Meet & Marry",
    description: "Take the next step toward a beautiful journey",
    icon: <Calendar className="text-purple-500" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-[#7C68FF0F]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        {/* BUTTON */}
        <button className="px-6 py-2 border border-purple-400 rounded-full text-purple-600 font-medium mb-12">
          How It Works
        </button>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md text-left"
            >
              <p className="text-xs text-gray-400 mb-2 uppercase">
                Step {index + 1}
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm mb-6">
                {step.description}
              </p>

              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                {step.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
