import React, { useEffect, useState } from "react";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex items-center justify-between bg-[#e5e4e4] rounded-4xl w-[80%] mx-auto mt-6 py-3 px-6 shadow-lg transition-all duration-300 ${
        isScrolled
          ? "fixed top-0 left-[10%] backdrop-blur-md bg-white/70 z-50"
          : ""
      }`}
    >
      {/* Left: Logo */}
      <a href="#" className="logo font-bold text-lg">
        <img className="w-[50px] h-[30px]" src="logo.png" alt="logo" />
      </a>

      {/* Center: Navigation Links */}
      <ul className="flex items-center ml-22 gap-10">
        <li>
          <a href="#" className="hover:text-gray-600">
            Resources & Blogs
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-600">
            Projects
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-600">
            Events
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-600">
            Alumni
          </a>
        </li>
      </ul>

      {/* Right: Login Button */}
      <button className="px-4 py-2 bg-black text-white text-[15px] rounded-3xl w-[140px] transform active:scale-90 cursor-pointer hover:bg-slate-900 transition">
        Log In/ Sign UP
      </button>
    </nav>
  );
}

export default NavBar;
