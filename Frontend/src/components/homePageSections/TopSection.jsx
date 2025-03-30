import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import NavBar from "../NavBar";
// import TopCards from "../cards/TopCards";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const statsRef = useRef(null);
  const statsInView = useRef(false);

  const shapes = [
    {
      size: "w-40 h-40",
      color: "bg-blue-500",
      x: [-90, 50],
      y: [-50, 50],
      top: "23%",
      left: "5%",
      duration: 4,
    },
    {
      size: "w-28 h-28",
      color: "bg-yellow-400",
      x: [20, -20],
      y: [30, -30],
      top: "60%",
      left: "80%",
      duration: 8,
    },
    {
      size: "w-32 h-32",
      color: "bg-red-400",
      x: [-80, 80],
      y: [-40, 40],
      top: "40%",
      left: "75%",
      duration: 7,
    },
    {
      size: "w-24 h-24",
      color: "bg-green-400",
      x: [25, -25],
      y: [-25, 25],
      top: "60%",
      left: "10%",
      duration: 5,
    },
    {
      size: "w-36 h-36",
      color: "bg-purple-400",
      x: [30, -30],
      y: [20, -20],
      top: "20%",
      left: "20%",
      duration: 6,
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
    <div className="min-h-screen flex flex-col">
      <NavBar />
      {/* Animated Circles - Restricted to Homepage Only */}
      <div className="absolute inset-0 pointer-events-none">
        {shapes.map((shape, index) => (
          <FloatingShape key={index} {...shape} />
        ))}
      </div>
      {/* Hero Section */}
      <section className="relative py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            className="text-7xl font-extrabold tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Innovate. Learn. Grow.
          </motion.h1>
          <motion.p
            className="text-xl text-gray-500 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Google Developer Group at Delhi Technological University
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <motion.a
              href="/events"
              className="px-8 flex justify-center py-2 bg-black text-white rounded-full hover:bg-slate-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className="mt-[2px]">Explore Events </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-arrow-right ml-2 mt-[8px] h-4 w-4 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </motion.a>
            <motion.a
              href="/join"
              className="px-6 py-3 border border-gray-500 rounded-full hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Community
            </motion.a>
          </motion.div>
         
        </div>
      </section>
    </div>
  );
}
