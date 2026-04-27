import React from "react";
import { CheckCircle } from "lucide-react";

const PlanCard = ({ plan, billingCycle, isSelected, onSelect }) => {
    // Determine price based on billing cycle
    const pricing = billingCycle === "MONTHLY" ? plan.monthly : plan.yearly;
    const price = pricing?.discountedPrice || pricing?.price || 0;
    const originalPrice = pricing?.price || 0;
    const hasDiscount = pricing?.discountedPrice && pricing?.discountedPrice < pricing?.price;
    const discountPercentage = pricing?.discountPercentage;

    return (
        <div
            onClick={() => onSelect(plan)}
            className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 select-none h-full flex flex-col
        ${isSelected
                    ? "border-orange-500 bg-orange-50 shadow-xl scale-[1.02]"
                    : "border-gray-100 bg-white hover:border-orange-200 hover:shadow-lg"
                }`}
        >
            {/* Popular Badge */}
            {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    Most Popular
                </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
            </div>

            {/* Price Display */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-gray-900">
                        ₹{Math.floor(price)}
                    </span>
                    <span className="text-gray-500 font-medium">
                        /{billingCycle === "MONTHLY" ? "month" : "year"}
                    </span>
                </div>

                {hasDiscount && (
                    <div className="mt-2 text-sm text-gray-400 line-through">
                        ₹{originalPrice} due
                    </div>
                )}

                {hasDiscount && discountPercentage > 0 && (
                    <div className="mt-1 text-xs font-bold text-green-600 bg-green-50 inline-block px-2 py-0.5 rounded">
                        Save {discountPercentage}%
                    </div>
                )}
            </div>

            {/* Features Divider */}
            <div className="w-full h-px bg-gray-100 mb-6"></div>

            {/* Features List */}
            <ul className="space-y-4 flex-grow">
                {plan.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                        <CheckCircle
                            className={`w-5 h-5 flex-shrink-0 ${feature.included ? 'text-green-500' : 'text-gray-300'}`}
                        />
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                            {feature.name} {feature.value ? `- ${feature.value}` : ''}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Select Button */}
            <div className="mt-8">
                <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
            ${isSelected
                            ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                            : "bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50"
                        }`}
                >
                    {isSelected ? "Selected" : `Choose ${plan.name}`}
                </button>
            </div>
        </div>
    );
};

export default PlanCard;
