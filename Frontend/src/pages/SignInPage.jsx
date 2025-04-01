import React from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import '../index.css';
import { Link } from "react-router-dom";


const SignUpPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_2px),linear-gradient(to_bottom,#80808012_1px,transparent_2px)] bg-[size:24px_24px]">
      {/* Header Section */}
      <header className="absolute top-0 left-0 w-full py-4 bg-white shadow-md z-10">
        <div className="flex items-center justify-between px-6 sm:px-16">
          {/* GDG Logo */}
          <div className="flex items-center space-x-2">
            <span className="h-6 w-6 bg-blue-500 rounded-full"></span>
            <span className="h-6 w-6 bg-red-500 rounded-full"></span>
            <span className="h-6 w-6 bg-yellow-400 rounded-full"></span>
            <span className="h-6 w-6 bg-green-500 rounded-full"></span>

          </div>
          {/* Page Title */}
          <h1
            className="text-lg flex justify-center items-center gap-4 font-bold text-gray-800 transition-all duration-300"
            id="gdg-title"
          >
            <Link to="/" >
            <svg className="cursor-pointer"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M18,21H6c-1.657,0-3-1.343-3-3V8.765c0-1.09,0.591-2.093,1.543-2.622l6-3.333	c0.906-0.503,2.008-0.503,2.914,0l6,3.333C20.409,6.672,21,7.676,21,8.765V18C21,19.657,19.657,21,18,21z" opacity=".35"/><path d="M15,21H9v-6c0-1.105,0.895-2,2-2h2c1.105,0,2,0.895,2,2V21z"/></svg>
            </Link>
            
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full px-4 sm:px-8 md:px-16 lg:px-24 ">
        {/* Title */}
        <h1 className="text-black text-center text-4xl font-extrabold mb-3">
          Welcome Back!
        </h1>
        <p className="text-gray-700 text-center text-lg mb-6">
        Sign in to continue exploring projects, events, and resources.
        </p>

        {/* Clerk Sign-Up Component */}
        <div className="bg-green-100 flex justify-center rounded-xl shadow-lg p-8 w-full max-w-md">
          <SignIn signUpUrl="/signup" />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="absolute bottom-0 left-0 w-full py-4 bg-white text-gray-600 text-center text-sm border-t border-gray-200">
        © 2025 Google Developer Group
      </footer>
    </div>
  );
};

export default SignUpPage;
