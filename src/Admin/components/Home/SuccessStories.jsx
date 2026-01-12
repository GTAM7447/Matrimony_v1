import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SuccessStories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>

          <p className="text-gray-600 max-w-md leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Vel pellentesque quisque
            imperdiet bibendum. Leo eu nunc justo amet eget at tellus nisl
            tristique.
          </p>

          {/* NAV BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button className="w-10 h-10 rounded-full border border-purple-400 flex items-center justify-center text-purple-500 hover:bg-purple-50">
              <ArrowLeft size={18} />
            </button>
            <button className="w-10 h-10 rounded-full border border-purple-400 flex items-center justify-center text-purple-500 hover:bg-purple-50">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-[#7C68FF0F] p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">
            Arun & Kavya
          </h3>

          <p className="italic text-gray-700 mb-4">
            “What started as a small conversation turned into a lifetime promise.”
          </p>

          <p className="text-gray-600 leading-relaxed text-sm">
            Arun, a calm and thoughtful software engineer from Bangalore, created
            his profile hoping to find someone who understood his values and
            dreams. Kavya, a cheerful and creative interior designer from Mysore,
            joined the platform with a desire to meet someone honest, grounded,
            and family-oriented.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
