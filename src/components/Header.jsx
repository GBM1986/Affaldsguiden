import React from 'react';
import { RiLoginCircleLine } from 'react-icons/ri'; // Import the icon
import logo from '../assets/images/logo/Affalds-logo.png';
import { Navbar } from './Navbar';

export const Header = () => {
  return (
    <header className="">
      <div className='flex flex-col sm:flex-row items-center justify-between ml-10 mt-2 mr-10'>
        <img
          src={logo}
          alt="Affald Logo"
          className="w-[362px] h-[88px]"
        />

        {/* Login button - Moves under the logo for screens smaller than 'sm' */}
        <button className="flex bg-lightGreen px-4 py-2 rounded-md gap-2 hover:bg-kaki mt-4 sm:mt-0">
          <span>Login</span>
          <RiLoginCircleLine className="text-xl mt-1" /> {/* Icon beneath text */}
        </button>
      </div>

      <Navbar />
    </header>
  );
};
