import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import "../index.css";
import { useState, useEffect, useRef } from "react";


const SignUpPage = () => {
  const [authError, setAuthError] = useState(null);
  const formContainerRef = useRef(null);

  // Listen for error messages in the DOM
  useEffect(() => {
    if (!formContainerRef.current) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          // Look for error messages in the DOM
          const errorElements = formContainerRef.current.querySelectorAll('[role="alert"]');
          for (const errorElement of errorElements) {
            const errorText = errorElement.textContent || '';
            // Check for common "account exists" error patterns
            if (errorText.toLowerCase().includes('already exists') || 
                errorText.toLowerCase().includes('already in use') ||
                errorText.toLowerCase().includes('already taken')) {
              setAuthError("An account with this email already exists.");
              break;
            }
          }
        }
      }
    });

    observer.observe(formContainerRef.current, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_2px),linear-gradient(to_bottom,#80808012_1px,transparent_2px)] bg-[size:24px_24px]">
      {/* Header Section */}
      <header className="absolute top-0 left-0 w-full py-4 bg-white shadow-md z-10">
        <div className="flex items-center justify-between px-6 sm:px-16">
          {/* GDG Logo */}
          <div className="flex items-center space-x-2">
            
            <Link to="/" className="cursor-pointer transform transition duration-50 active:scale-90  h-6 w-6 bg-blue-500 rounded-full text-white items-center justify-center text-center hover:scale-105" > 
            </Link>
            <Link to="/" className="cursor-pointer transform transition duration-100 active:scale-90 h-6 w-6 bg-red-500 rounded-full text-white items-center justify-center text-center hover:scale-105"></Link>
            <Link to="/" className="cursor-pointer transform transition duration-100 active:scale-90 h-6 w-6 bg-yellow-400 rounded-full text-white items-center justify-center text-center hover:scale-105"></Link>
            <Link to="/" className="cursor-pointer transform transition duration-100 active:scale-90 h-6 w-6 bg-green-500 rounded-full text-white items-center justify-center text-center hover:scale-105"></Link>
          </div>
          {/* Page Title */}
          <Link to="/" >
          <h1
            className="text-lg font-bold text-gray-800 transition-all duration-300 flex justify-center gap-4 items-center"
            id="gdg-title"
          >
            <Link to="/">
              <svg
                className="cursor-pointer transform transition duration-100 active:scale-90"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
              >
                <path
                  d="M18,21H6c-1.657,0-3-1.343-3-3V8.765c0-1.09,0.591-2.093,1.543-2.622l6-3.333	c0.906-0.503,2.008-0.503,2.914,0l6,3.333C20.409,6.672,21,7.676,21,8.765V18C21,19.657,19.657,21,18,21z"
                  opacity=".35"
                />
                <path d="M15,21H9v-6c0-1.105,0.895-2,2-2h2c1.105,0,2,0.895,2,2V21z" />
              </svg>
            </Link>
          </h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full px-4 sm:px-8 md:px-16 lg:px-24 ">
        {/* Title */}
        <h1 className="text-black text-center text-4xl font-extrabold mb-3">
          Sign Up to Innovate
        </h1>
        <p className="text-gray-700 text-center text-lg mb-6">
          Join the Google Developer Group community and start exploring
          projects, events, and resources.
        </p>
        {/* Error Message Alert */}
        {authError && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md shadow-md w-full max-w-md relative">
            <div className="flex items-center">
              <div className="py-1">
                <svg className="w-6 h-6 mr-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Account Already Exists</p>
                <p className="text-sm">{authError}</p>
                <Link to="/signin" className="text-sm font-semibold text-blue-700 hover:text-blue-900 underline mt-1 inline-block">
                  Sign in instead
                </Link>
              </div>
            </div>
            <button 
              onClick={() => setAuthError(null)}
              className="absolute top-0 right-0 mt-4 mr-4 text-blue-500 hover:text-blue-700"
            >
              <span className="text-xl font-bold">×</span>
            </button>
          </div>
        )}

        {/* Clerk Sign-Up Component */}
        <div className="bg-blue-100 flex justify-center rounded-xl shadow-lg p-8 w-full max-w-md">
          <SignUp signInUrl="/api/v1/sign-up" />
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
