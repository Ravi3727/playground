import React, { useEffect, useState } from "react";
import { Link,  NavLink } from "react-router-dom";
import { Route } from "react-router-dom";


function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex items-center justify-between bg-[#cbc7c7] rounded-4xl mx-auto mt-6 py-3 px-6 sm:px-16 shadow-lg transition-all duration-300 
        ${isScrolled ? "fixed text-white top-0 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-black/50 z-50" : ""} 
        w-[90%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[65%]`}
    >
      {/* Left: Logo */}
      <Link to="/" >
       <div className="flex items-center">
         <span className="h-6 w-6 bg-blue-500 rounded-l-full"></span>
         <span className="h-6 w-6 bg-red-500 rounded-t-full"></span>
         <span className="h-6 w-6 bg-yellow-400 rounded-b-full"></span>
         <span className="h-6 w-6 bg-green-500 rounded-r-full"></span>
       </div>
      </Link>

      {/* Center: Navigation Links (Hidden Below 1000px) */}
      <ul className="hidden lg:flex items-center gap-6 xl:gap-10">
        <li>
          <NavLink
            to="/resources"
            className={({ isActive }) =>
              isActive ? "text-gray-600 font-bold" : "hover:text-gray-600"
            }
          >
            Resources & Blogs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "text-gray-600 font-bold" : "hover:text-gray-600"
            }
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? "text-gray-600 font-bold" : "hover:text-gray-600"
            }
          >
            Events
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/alumni"
            className={({ isActive }) =>
              isActive ? "text-gray-600 font-bold" : "hover:text-gray-600"
            }
          >
            Alumni
          </NavLink>
        </li>
      </ul>
      
      {/* Right: Login Button (Same size until mid-screen, then gradually smaller) */}
      <NavLink to="/signup" >
        <button className="px-3 py-1 bg-black text-white text-xs sm:text-sm md:text-[15px] rounded-3xl w-[80px] sm:w-[100px] md:w-[140px] transform active:scale-90 cursor-pointer hover:bg-slate-900 transition">
          Sign In 
        </button>

      </NavLink>
    </nav>
  );
}

export default NavBar;
