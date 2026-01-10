import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Basic",
    priceMonthly: 15,
    description: "Perfect for getting started",
    features: [
      "View up to 50 profiles",
      "Send 10 interests per month",
      "Basic search filters",
      "Profile verification",
      "Email support",
    ],
    buttonText: "Choose Basic",
  },
  {
    name: "Premium",
    priceMonthly: 39,
    description: "Best value for serious seekers",
    features: [
      "Unlimited profile views",
      "Send 100 interests per month",
      "Advanced search filters",
      "Priority profile highlighting",
      "Video calling feature",
      "24/7 priority support",
    ],
    buttonText: "Choose Premium",
    mostPopular: true,
  },
  {
    name: "Elite",
    priceMonthly: 79,
    description: "For the discerning individual",
    features: [
      "Everything in Premium",
      "Personal matchmaker",
      "Exclusive elite profiles",
      "Profile curation",
      "Background verification",
      "Dedicated relationship advisor",
    ],
    buttonText: "Choose Elite",
  },
  {
    name: "Platinum",
    priceMonthly: 159,
    description: "Ultimate luxury experience",
    features: [
      "Everything in Elite",
      "VIP concierge service",
      "Exclusive events access",
      "Professional photography",
      "Date planning assistance",
      "Success guarantee",
    ],
    buttonText: "Choose Platinum",
  },
];

const PricingPlans = () => {
  const [billing, setBilling] = useState("monthly");

  const calculateYearlyPrice = (monthly) => {
    return Math.round(monthly * 12 * 0.8);
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Heading */}
      <section className="relative w-full py-10 text-center bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2
            className="font-bold text-[42px] md:text-[48px] leading-[1.1] uppercase text-gray-900 mb-3"
            style={{ fontFamily: "Garamond, serif" }}
          >
            Membership Plan
          </h2>
          <p
            className="text-[17px] md:text-[19px] leading-[26px] text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            All plans include verified profiles, privacy protection, and our
            commitment to your success.
          </p>
        </div>
      </section>

      {/* Billing Toggle */}
      <div className="text-center mt-8 mb-10">
        <div className="flex justify-center items-center gap-4">
          <span
            className={`cursor-pointer font-medium transition ${
              billing === "monthly" ? "text-[#7C68FF]" : "text-gray-500"
            }`}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </span>

          <div
            className="relative w-12 h-6 bg-gray-300 rounded-full cursor-pointer"
            onClick={() =>
              setBilling(billing === "monthly" ? "yearly" : "monthly")
            }
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                billing === "yearly" ? "translate-x-6" : "translate-x-0"
              }`}
              style={{
                backgroundColor: billing === "yearly" ? "#7C68FF" : "#ffffff",
              }}
            ></div>
          </div>

          <span
            className={`cursor-pointer font-medium transition ${
              billing === "yearly" ? "text-[#7C68FF]" : "text-gray-500"
            }`}
            onClick={() => setBilling("yearly")}
          >
            Yearly{" "}
            <span className="ml-1 bg-[#7C68FF1A] text-[#7C68FF] text-xs px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 pb-16">
        {plans.map((plan) => {
          const yearlyPrice = calculateYearlyPrice(plan.priceMonthly);
          const displayPrice =
            billing === "monthly" ? plan.priceMonthly : yearlyPrice;

          return (
            <div
              key={plan.name}
              className={`relative bg-white rounded-xl border p-6 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-md ${
                plan.mostPopular
                  ? "border-[#7C68FF] shadow-lg scale-[1.01]"
                  : "border-gray-200"
              }`}
            >
              {plan.mostPopular && (
                <div className="absolute -top-3 bg-[#7C68FF] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-4 text-center">
                {plan.description}
              </p>

              <div className="text-3xl font-bold text-[#7C68FF] mb-1">
                ₹{displayPrice}
                <span className="text-base font-normal text-gray-500">
                  /{billing === "monthly" ? "month" : "year"}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-5">
                Billed {billing === "monthly" ? "monthly" : "annually"}
              </p>

              <ul className="space-y-2 mb-6 text-sm text-gray-700 w-full">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 justify-start"
                  >
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2 rounded-full font-medium transition duration-300 ${
                  plan.mostPopular
                    ? "bg-[#7C68FF] text-white hover:opacity-90"
                    : "border border-[#7C68FF] text-[#7C68FF] hover:bg-[#7C68FF0F]"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingPlans;
