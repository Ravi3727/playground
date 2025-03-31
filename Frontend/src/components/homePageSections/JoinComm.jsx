import React from "react";
import { motion } from "framer-motion";

const JoinComm = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
      {/* Animated Background Circles */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 15,
          ease: "easeInOut",
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full"
        animate={{
          x: [0, -120, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 18,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* CTA Content */}
      <div className="container max-w-4xl mx-auto relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to join our community?</h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Connect with fellow developers, learn new skills, and build amazing projects together.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="rounded-full bg-white cursor-pointer text-blue-600 hover:bg-blue-50 px-8 py-3">
              Become a Member
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinComm;
