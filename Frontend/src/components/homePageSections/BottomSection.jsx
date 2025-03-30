import React from "react";
import HomeCards from "../cards/HomeCards";
import ProfileCard from "../cards/ProfileCard";
import { technologies } from "../../assets/DummyData/BottomSection";

const BottomSection = () => {
  const colors = ["#4285F4", "#EA4335", "#FBBC04"];
  const profileColors = ["#34A853", "#4285F4", "#EA4335"];
  const profileCards = [];

  for (let i = 0; i < 8; i++) {
    profileCards.push(<ProfileCard key={i} color={profileColors[i % 3]} />);
  }

  return (
    <div className="relative w-full min-h-[100vh] bg-gray-100 overflow-x-clip no-scrollbar flex-col flex gap-10 items-center pb-[10vh]">
      {/* Graph Paper Background */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Content */}
      <div className="relative w-full flex flex-col mt-20 items-center">
        <h1 className="text-[#191919] font-bold text-3xl">Our Departments</h1>
        <p className="text-[#696969] text-[16px] mt-4 px-4">
          Explore our specialized departments and find your perfect fit.
        </p>
      </div>

      <div className="relative w-full flex justify-center gap-6 flex-wrap">
        {technologies.map((item, index) => (
          <HomeCards key={index} obj={item} color={colors[index % 3]} />
        ))}
      </div>

      <div className="relative w-full mt-10 flex flex-col items-center">
        <h1 className="text-[#191919] font-bold text-3xl">Meet Our Team</h1>
        <p className="text-[#696969] mt-3 text-[16px]">
          The passionate individuals behind GDSC DTU
        </p>
      </div>

      {/* Slideshow */}
      <div className="relative w-full overflow-x-scroll flex gap-10 no-scrollbar">
        {profileCards}
      </div>

      <button className="bg-[#34A853] cursor-pointer transform active:scale-90 transition w-fit text-white px-3 items-center gap-2 py-2 flex justify-center rounded-xl hover:bg-green-700">
        <p>View all team members</p>
        <img
          className="w-[12px] h-[12px]"
          src="right-arrow.png"
          alt="right-arrow"
        />
      </button>
    </div>
  );
};

export default BottomSection;
