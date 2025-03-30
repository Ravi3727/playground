import React from "react";

const TopCards = ({ title, description, icon, bgColor }) => {
  return (
    <div className="w-full sm:w-[300px] p-6 bg-white rounded-xl shadow-md text-left">
      {/* Icon Container */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor} mb-4`}
      >
        <span className="text-xl">{icon}</span>
      </div>
      {/* Title */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {/* Description */}
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default TopCards;
