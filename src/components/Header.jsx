import React from 'react';
import { RiLoginCircleLine, RiLogoutCircleLine } from 'react-icons/ri'; // Import login/logout icons
import logo from '../assets/images/logo/Affalds-logo.png';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider'; // Auth provider for login state

export const Header = () => {
  const { loginData, handleLogout } = useAuth(); // Destructure loginData and handleLogout from AuthProvider

  return (
    <header>
      <div className='flex flex-col sm:flex-row items-center justify-between ml-10 mt-2 mr-10'>
        <img
          src={logo}
          alt="Affald Logo"
          className="w-[362px] h-[88px]"
        />

        {/* Conditional Rendering for Login or Logout button */}
        {!loginData || !loginData.user ? (
          <Link to="/login">
            <button className="flex bg-lightGreen px-4 py-2 rounded-md gap-2 hover:bg-kaki mt-4">
              <span>Login</span>
              <RiLoginCircleLine className="text-xl mt-1" />
            </button>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-gray-800">Hi, {loginData.user.email}</span> {/* Show user email */}
            <button
              className="flex bg-lightGreen px-4 py-2 rounded-md gap-2 hover:bg-kaki mt-4"
              onClick={handleLogout}
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
