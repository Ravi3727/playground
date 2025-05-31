import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const statsRef = useRef(null);
  const statsInView = useRef(false);

  // Responsive floating shapes config

  const shapes = [
    {
      size: "w-16 h-16 sm:w-20 sm:h-20 md:w-40 md:h-40",
      color: "bg-blue-500",
      x: [-40, 30],
      y: [-30, 30],
      top: "23%",
      left: "5%",
      duration: 4,
      responsive: "",
    },
    {
      size: "w-12 h-12 sm:w-16 sm:h-16 md:w-28 md:h-28",
      color: "bg-yellow-400",
      x: [10, -10],
      y: [15, -15],
      top: "60%",
      left: "80%",
      duration: 8,
      responsive: "hidden md:block",
    },
    {
      size: "w-14 h-14 sm:w-20 sm:h-20 md:w-32 md:h-32",
      color: "bg-red-400",
      x: [-40, 40],
      y: [-20, 20],
      top: "40%",
      left: "75%",
      duration: 7,
      responsive: "",
    },
    {
      size: "w-10 h-10 sm:w-14 sm:h-14 md:w-24 md:h-24",
      color: "bg-green-400",
      x: [15, -15],
      y: [-15, 15],
      top: "60%",
      left: "10%",
      duration: 5,
      responsive: "hidden md:block", // Hide on small screens, show on md and up
    },
    {
      size: "w-14 h-14 sm:w-20 sm:h-20 md:w-36 md:h-36",
      color: "bg-purple-400",
      x: [20, -20],
      y: [10, -10],
      top: "20%",
      left: "20%",
      duration: 6,
      responsive: "",
    },
  ];

  const FloatingShape = ({ size, color, x, y, top, left, duration }) => (
    <motion.div
      className={`absolute ${size} rounded-full ${color} opacity-50`}
      style={{ top, left }}
      animate={{
        x: x.map((val) => `${val}px`),
        y: y.map((val) => `${val}px`),
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
        duration,
        ease: "easeInOut",
      }}
    />
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !statsInView.current) {
          statsInView.current = true;

          const duration = 2000;
          const interval = 20;
          const steps = duration / interval;

          const target1 = 15;
          const target2 = 500;
          const target3 = 25;

          const step1 = target1 / steps;
          const step2 = target2 / steps;
          const step3 = target3 / steps;

          let current1 = 0;
          let current2 = 0;
          let current3 = 0;

          const timer = setInterval(() => {
            current1 += step1;
            current2 += step2;
            current3 += step3;

            setCount1(Math.min(Math.floor(current1), target1));
            setCount2(Math.min(Math.floor(current2), target2));
            setCount3(Math.min(Math.floor(current3), target3));

            if (
              Math.floor(current1) >= target1 &&
              Math.floor(current2) >= target2 &&
              Math.floor(current3) >= target3
            ) {
              clearInterval(timer);
            }
          }, interval);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div className=" flex flex-col">
      {/* Navbar with higher z-index */}
      <div className="relative z-50">
        <NavBar />
      </div>

      {/* Graph Paper Background */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_4px),linear-gradient(to_bottom,#80808012_1px,transparent_4px)] bg-[size:24px_24px] pointer-events-none"></div>
      {/* Floating Circles - Restricted to Top Section Only */}
      <div className="absolute z-10 inset-0 top-0 h-full md:h-[500px] lg:h-[600px] xl:h-[700px] pointer-events-none overflow-hidden">
        {shapes.map((shape, index) => (
          <FloatingShape key={index} {...shape} />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-24 px-4 sm:mt-15 mt-15 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Innovate. Learn. Grow.
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Google Developer Group at Delhi Technological University
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link to="/events">
              <motion.a
                className="px-6 sm:px-8 py-2 flex items-center justify-center bg-black text-white rounded-full hover:bg-slate-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore Events</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </motion.a>
            </Link>

            <Link to="/signup">
              <motion.a
                className="px-6 sm:px-8 py-2 flex items-center justify-center border border-gray-500 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Community
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
