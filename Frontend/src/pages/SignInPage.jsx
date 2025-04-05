import React from "react";
import { SignIn } from "@clerk/clerk-react";
import '../index.css';
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";


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
            // Check for common "account not found" error patterns
            if (errorText.toLowerCase().includes('not found') || 
                errorText.toLowerCase().includes('doesn\'t exist') ||
                errorText.toLowerCase().includes('invalid email or password')) {
              setAuthError("Account not found. Please create an account.");
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
        {/* Error Message Alert */}
        {authError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-md w-full max-w-md relative">
            <div className="flex items-center">
              <div className="py-1">
                <svg className="w-6 h-6 mr-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Account Not Found</p>
                <p className="text-sm">{authError}</p>
                <Link to="/signup" className="text-sm font-semibold text-red-700 hover:text-red-900 underline mt-1 inline-block">
                  Create a new account
                </Link>
              </div>
            </div>
            <button 
              onClick={() => setAuthError(null)}
              className="absolute top-0 right-0 mt-4 mr-4 text-red-500 hover:text-red-700"
            >
              <span className="text-xl font-bold">×</span>
            </button>
          </div>
        )}

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