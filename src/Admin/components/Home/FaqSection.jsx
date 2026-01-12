// components/FaqSection.jsx
import React, { useState } from "react";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the Matrimony Admin Portal?",
      answer:
        "The Matrimony Admin Portal is a comprehensive dashboard for managing matrimony platform operations.",
    },
    {
      question: "Who can access the admin portal?",
      answer:
        "Access is restricted to authorized personnel only. All access is logged and monitored for security.",
    },
    {
      question: "How do I log in to the admin portal?",
      answer:
        "Navigate to the admin login page and enter your registered credentials.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        'Use the "Forgot Password" option on the login page to reset your password.',
    },
    {
      question: "Can I add new admin users?",
      answer:
        "Yes, super admins can add new admin users through the User Management section.",
    },
    {
      question: "How do I view user profiles?",
      answer:
        'Go to "All Profiles" section to search, filter, and view detailed user profiles.',
    },
    {
      question: "Can I review uploaded photos or documents?",
      answer:
        "Yes. All uploaded media appears in Moderation → Photo/ID Verification for approval or rejection.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="w-full py-8 px-4 md:px-8"
      style={{ backgroundColor: "#7C68FF0F" }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
          Frequently Asked Questions (FAQ)
        </h2>

        <p className="text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet consectetur. Vell pellentesque quisque
          imperdiet bibendum. Leo eu nunc justo amet eget et tellus nisi
          tristique.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden bg-white"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 bg-white flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-semibold text-gray-800 text-left">
                  {faq.question}
                </span>
                <span className="text-purple-600 font-bold text-lg">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">
                    {index === faqs.length - 1 ? (
                      <span className="flex items-start gap-2">
                        <span className="font-bold text-green-600">✓</span>
                        <span>{faq.answer}</span>
                      </span>
                    ) : (
                      faq.answer
                    )}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
