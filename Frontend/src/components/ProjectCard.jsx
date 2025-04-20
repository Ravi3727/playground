import React from "react";
import { motion } from "framer-motion";
import { Calendar, Tag, ExternalLink } from "lucide-react";

const ProjectCard = ({ title, description, date, category, image, link }) => {
  // Google colors
  const googleColors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853"
  };

  // Color mapping for categories
  const categoryColors = {
    "Web Dev": { bg: "bg-blue-100", text: "text-blue-800", icon: googleColors.blue },
    "App Dev": { bg: "bg-green-100", text: "text-green-800", icon: googleColors.green },
    "UI/UX": { bg: "bg-purple-100", text: "text-purple-800", icon: "#9c27b0" },
    "ML/AI": { bg: "bg-yellow-100", text: "text-yellow-800", icon: googleColors.yellow },
    "Open Source": { bg: "bg-orange-100", text: "text-orange-800", icon: "#ff5722" },
    "Cyber Security": { bg: "bg-red-100", text: "text-red-800", icon: googleColors.red },
  };

  const defaultColor = { bg: "bg-gray-100", text: "text-gray-800", icon: "#607d8b" };
  const colorScheme = categoryColors[category] || defaultColor;

  return (
    <motion.div 
      className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 h-full"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="bg-gradient-to-b from-[#4285F4] via-[#FBBC05] to-[#34A853] p-[2px] rounded-2xl h-full">
        <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col">
          {/* Image */}
          <div className="h-48 overflow-hidden relative group">
            <img
              src={image || "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay with view project button */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.a 
                href={link || "#"}
                className="px-4 py-2 bg-white text-gray-900 rounded-full flex items-center space-x-1 font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Project</span>
                <ExternalLink size={14} />
              </motion.a>
            </div>

            {/* Category ribbon */}
            <div className="absolute top-4 right-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorScheme.bg} ${colorScheme.text}`}>
                <Tag size={12} className="mr-1" style={{ color: colorScheme.icon }} />
                {category || "Project"}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">            
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
              {title}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
              {description}
            </p>
            
            {/* Date */}
            <div className="flex items-center text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100">
              <Calendar size={14} className="mr-1" style={{ color: googleColors.blue }} />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;