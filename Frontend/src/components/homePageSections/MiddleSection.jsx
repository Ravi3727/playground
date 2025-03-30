import React from "react";
import { motion } from "framer-motion";

const MiddleSection = () => {
  const cardsData = [
    {
      title: "Learn",
      description:
        "Learn about Google technologies through workshops, events, and project-based learning.",
      icon: <svg width="50" height="50" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="29.4946" cy="29.4946" r="29.4946" fill="#629AF6" fill-opacity="0.28"/>
      <path d="M23.717 20.8247L14.7366 29.8051L23.0846 38.1532" stroke="#4988F0" stroke-width="2.50428"/>
      <path d="M34.8563 20.8247L43.8367 29.8051L35.4887 38.1532" stroke="#4988F0" stroke-width="2.50428"/>
      </svg>
       , // Replace with an actual SVG if needed
      
    },
    {
      title: "Grow",
      description:
        "Learn about Google technologies through workshops, events, and project-based learning.",
      icon: <img className="w-[24px] h-[24px]"  src="iconsBulb.png" alt="" />,
       // Replace with an actual SVG if needed
       bgColor: "bg-red-100",

    },
    {
      title: "Connect",
      description:
        "Learn about Google technologies through workshops, events, and project-based learning.",
      icon: <img className="w-[30px] h-[30px]" src="iconsConnect.png" alt="" />,
      bgColor: "bg-green-100",
      
    },
  ];

  return (
    <section className="py-16 bg-gray-100 mb-20 text-center">
      {/* Section Heading */}
      <motion.h2
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About GDSC DTU
      </motion.h2>
      <motion.p
        className="text-gray-600 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Google Developer Student Clubs DTU is a community for students interested in Google developer technologies.
      </motion.p>

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center gap-6">
        {cardsData.map((card, index) => (
          <motion.div
            key={index}
            className="w-[300px] p-6 bg-white rounded-xl shadow-md border border-transparent hover:border-blue-200 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
            }}
          >
            {/* Icon */}
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${card.bgColor} mb-4`}
              animate={{
                rotate: [0, -10, 0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 8,
                ease: "easeInOut",
              }}
            >
              <span className="text-xl">{card.icon}</span>
            </motion.div>
            {/* Title */}
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            {/* Description */}
            <p className="text-gray-600 text-sm">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MiddleSection;
