import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen, History, HelpCircle, ChevronRight } from "lucide-react";

const WhatWeOffer = () => {
  const [featuresInView, setFeaturesInView] = useState(false);
  const featuresRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setFeaturesInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-white" ref={featuresRef}>
      <div className="container max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          What We Offer
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Event Calendar */}
          <OfferCard
            title="Event Calendar"
            description="A one-stop place for all upcoming events, hackathons, and meetings. Stay updated and never miss out."
            href="/events"
            icon={<Calendar className="h-7 w-7 text-blue-600" />}
            bgColor="bg-blue-100"
            borderColor="hover:border-blue-200"
            textColor="text-blue-600"
            delay={0.1}
          />

          {/* Activity History */}
          <OfferCard
            title="Activity History"
            description="A showcase of all the incredible projects, tasks, and contributions by YOU. Built something cool? This is where it gets the spotlight!"
            href="/activities"
            icon={<History className="h-7 w-7 text-red-600" />}
            bgColor="bg-red-100"
            borderColor="hover:border-red-200"
            textColor="text-red-600"
            delay={0.2}
          />

          {/* Resources & Blogs */}
          <OfferCard
            title="Resources & Blogs"
            description="Access top resources, free & paid courses to speed up your learning, and publish your own blogs to share your knowledge."
            href="/resources"
            icon={<BookOpen className="h-7 w-7 text-yellow-600" />}
            bgColor="bg-yellow-100"
            borderColor="hover:border-yellow-200"
            textColor="text-yellow-600"
            delay={0.3}
          />

          {/* Doubts Forum */}
          <OfferCard
            title="Doubts Forum"
            description="A dedicated space for each department where you can ask questions, get help, and grow together. Learning is a team effort."
            href="/forum"
            icon={<HelpCircle className="h-7 w-7 text-green-600" />}
            bgColor="bg-green-100"
            borderColor="hover:border-green-200"
            textColor="text-green-600"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

const OfferCard = ({ title, description, href, icon, bgColor, borderColor, textColor, delay }) => (
  <motion.div
    className={`bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent ${borderColor}`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
    }}
  >
    <motion.div
      className={`h-14 w-14 rounded-full flex items-center justify-center ${bgColor} mb-6`}
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
      {icon}
    </motion.div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 mb-5">{description}</p>
    <a href={href} className={`${textColor} font-medium inline-flex items-center group`}>
      Learn More <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
    </a>
  </motion.div>
);

export default WhatWeOffer;
