import React from 'react';
import { RiLoginCircleLine, RiLogoutCircleLine } from 'react-icons/ri'; // Import login/logout icons
import logo from '../assets/images/logo/Affalds-logo.png'; // Replace with SVG if possible
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider'; // Auth provider for login state

export const Header = () => {
  const { loginData, handleLogout } = useAuth(); // Destructure loginData and handleLogout from AuthProvider
  const userEmail = loginData?.user?.email;

  const onLogout = async () => {
    try {
      await handleLogout();
    } catch (error) {
      console.error('Error logging out:', error); // Basic error handling for logout
    }
  };

  return (
    <header>
      <div className="flex flex-col sm:flex-row items-center justify-between mx-4 mt-2 sm:mx-10">
        {/* Responsive Logo */}
        <img
          src={logo}
          alt="Affaldsguiden Logo" // Descriptive alt text for accessibility
          className="w-[200px] sm:w-[300px] md:w-[362px] h-auto" // Responsive logo sizing
          loading="lazy" // Lazy load the logo for performance optimization
        />

        {/* Conditional Rendering for Login or Logout button */}
        {!userEmail ? (
          <Link to="/login">
            <button 
              className="flex bg-lightGreen px-4 py-2 rounded-md gap-2 hover:bg-kaki mt-4" 
              aria-label="Login Button"
            >
              <span>Login</span>
              <RiLoginCircleLine className="text-xl mt-1" />
            </button>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-gray-800">Hi, {userEmail}</span> {/* Show user email */}
            <button
              className="flex bg-lightGreen px-4 py-2 rounded-md gap-2 hover:bg-kaki mt-4"
              aria-label="Logout Button"
              onClick={onLogout}
            >
              <span>Logout</span>
              <RiLogoutCircleLine className="text-xl mt-1" />
            </button>
          </div>
        )}
      </div>

      <Navbar />
    </header>
  );
};
