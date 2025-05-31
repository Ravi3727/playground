import React, { useRef, useEffect } from "react";
import HomeCards from "../cards/HomeCards";
import yellowVector from "../../assets/HomePagePng/topRight.png"
import redVector from "../../assets/HomePagePng/bottomLeft.png"
import ProfileCard from "../cards/ProfileCard";
import { technologies } from "../../assets/DummyData/BottomSection";
import lakshayImg from "../../assets/membersPic/lakshay.jpg";
import nikunjImg from "../../assets/membersPic/nikunj2.png";
import yashImg from "../../assets/membersPic/yash.png";
import arihantImg from "../../assets/membersPic/arihant.jpg";
import visheshImg from "../../assets/membersPic/sharmaji.jpg";
import presidentImg from "../../assets/membersPic/president.jpg";
import ayushmanImg from "../../assets/membersPic/ayushmannnn.jpg";
import sahilImg from "../../assets/membersPic/sahil.jpg";
import somyaImg from "../../assets/membersPic/somya.jpg";
import raviImg from "../../assets/membersPic/ravi.jpg";

const teamMembers = [
  {
    name: "Lakshay",
    role: "Web Developer", 
    image: lakshayImg,
  },
  {
    name: "Ravi",
    role: " GDSC-Web Dev Lead", 
    image: raviImg,
  },
  {
    name: "Shubham Goswami",
    role: "President, GDG DTU", 
    image: presidentImg,
  },
  {
    name: "Vishesh Sharma",
    role: "Web-Developer", 
    image: visheshImg,
  },
  {
    name: "Somya Srivastav",
    role: "UI-UX Department", 
    image: somyaImg,
  },
  {
    name: "Arihant Srivastava", 
    role: "Web-Developer",
    image: arihantImg,
  },
  {
    name: "Ayushman Singh", 
    role: "Web-Developer",
    image: ayushmanImg,
  },
  {
    name: "Yash Kumar",
    role: "Web-Developer", 
    image: yashImg,
  },
  {
    name: "Sahil Chauhan",
    role: "Web-Developer", 
    image: sahilImg,
  },
  {
    name: "Nikunj Sharma",
    role: "Web-Developer", 
    image: nikunjImg,
  },
];

const BottomSection = () => {
  const colors = ["#4285F4", "#EA4335", "#FBBC04"];
  const profileColors = [];
  const scrollRef = useRef(null);

  // Create duplicated arrays for infinite scroll
  const duplicatedMembers = [
    ...teamMembers,
    ...teamMembers,
    ...teamMembers
  ];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Set initial scroll position to middle set
    const cardWidth = 320; // 300px card + 20px gap
    const initialScrollPosition = cardWidth * teamMembers.length;
    container.scrollLeft = initialScrollPosition;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const totalOriginalWidth = cardWidth * teamMembers.length;

      // Reset to beginning when reaching the end
      if (scrollLeft >= totalOriginalWidth * 2) {
        container.scrollLeft = totalOriginalWidth;
      }
      // Reset to end when reaching the beginning
      else if (scrollLeft <= 0) {
        container.scrollLeft = totalOriginalWidth;
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[100vh] bg-gray-100 overflow-x-clip no-scrollbar flex-col flex gap-10 items-center pb-[10vh]">
      <img src={yellowVector} alt="" className="w-[20vw] absolute z-10 right-0 object-right object-contain h-[40vh]" />
      <img src={redVector} alt="" className="w-[10vw] absolute object-left object-contain z-10 left-0 top-[40%]" />
      
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

      {/* Infinite Scroll Slideshow */}
      <div 
        ref={scrollRef}
        className="relative w-full overflow-x-scroll flex gap-10 no-scrollbar [&::-webkit-scrollbar]:hidden [&]:scrollbar-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedMembers.map((member, index) => (
          <ProfileCard
            key={`${member.name}-${index}`}
            color={profileColors[index % profileColors.length]}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
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
