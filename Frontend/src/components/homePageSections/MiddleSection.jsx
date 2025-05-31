import React from "react";
import { motion } from "framer-motion";
import {cardsData} from "../../assets/DummyData/BottomSection"
const MiddleSection = () => {

  return (
    <section className="relative py-16 mb-20 text-center">
      {/* Graph Paper Background */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
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
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {cardsData.map((card, index) => (
            <motion.div
              key={index}
              className="w-full sm:w-[300px] p-6 bg-white rounded-xl shadow-md border border-transparent hover:border-blue-200 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              {/* Icon */}
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${card.bgColor || 'bg-blue-100'} mb-4 mx-auto`}
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
      </div>
    </section>
  );
};

export default MiddleSection;
