import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {/* About Section */}
  <div>
    <a href="/" className="flex items-center gap-2 mb-4">
      <motion.div className="flex items-center" whileHover={{ rotate: 10 }}>
        <span className="h-6 w-6 bg-blue-500 rounded-l-full"></span>
        <span className="h-6 w-6 bg-red-500 rounded-t-full"></span>
        <span className="h-6 w-6 bg-yellow-400 rounded-b-full"></span>
        <span className="h-6 w-6 bg-green-500 rounded-r-full"></span>
      </motion.div>
      <span className="font-bold">GDG DTU</span>
    </a>
    <p className="text-gray-400 text-sm">
      Google Developer Group at Delhi Technological University. A community of developers interested in Google's technologies.
    </p>
  </div>

  {/* Quick Links */}
  <div>
    <h3 className="font-bold mb-4">Quick Links</h3>
    <ul className="space-y-2">
      {["Events", "Projects", "Resources", "Forum"].map((link) => (
        <motion.li key={link} whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
          <a href={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-white text-sm">
            {link}
          </a>
        </motion.li>
      ))}
    </ul>
  </div>

  {/* Connect Section */}
  <div>
    <h3 className="font-bold mb-4">Connect</h3>
    <ul className="space-y-2">
      {["Twitter", "LinkedIn", "Instagram", "Discord"].map((platform) => (
        <motion.li key={platform} whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            {platform}
          </a>
        </motion.li>
      ))}
    </ul>
  </div>
</div>


        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Google Developer Group DTU. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
