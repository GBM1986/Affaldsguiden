import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile menu content
  const mobileMenu = (
    <div className="absolute left-0 right-0  bg-white z-20 p-4 xl:hidden">
      <ul className="text-lg">
        <li className="py-2 border-b border-mossGreen hover:bg-kaki transition">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>FORSIDE</Link>
        </li>
        <li className="py-2 border-b border-mossGreen hover:bg-kaki transition">
          <Link to="/sorteringsguide" onClick={() => setIsMobileMenuOpen(false)}>SORTERINGSGUIDE</Link>
        </li>
        <li className="py-2 border-b border-mossGreen hover:bg-kaki transition">
          <Link to="/genbrugsstationer" onClick={() => setIsMobileMenuOpen(false)}>GENBRUGSSTATIONER</Link>
        </li>
        <li className="py-2 border-b border-mossGreen hover:bg-kaki transition">
          <Link to="/artikler" onClick={() => setIsMobileMenuOpen(false)}>ARTIKLER</Link>
        </li>
        <li className="py-2 border-b border-mossGreen hover:bg-kaki transition">
          <Link to="/bestilcontainer" onClick={() => setIsMobileMenuOpen(false)}>BESTIL CONTAINER</Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="relative border-y-2 border-solid border-mossGreen">
      {/* Mobile Menu Toggle Button */}
      <button
        className="xl:hidden text-black text-2xl absolute top-4 right-4 z-30"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes /> : <CiMenuBurger />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && mobileMenu}

      {/* Desktop Navigation Links */}
      <ul className="hidden xl:flex w-full max-w-[1440px] mx-auto items-center">
        <li className="border-x border-solid border-mossGreen py-2 px-20 hover:bg-kaki transition">
          <Link to="/">FORSIDE</Link>
        </li>
        <li className="border-x border-solid border-mossGreen py-2 px-20 hover:bg-kaki transition">
          <Link to="/sorteringsguide">SORTERINGSGUIDE</Link>
        </li>
        <li className="border-x border-solid border-mossGreen py-2 px-20 hover:bg-kaki transition">
          <Link to="/genbrugsstationer">GENBRUGSSTATIONER</Link>
        </li>
        <li className="border-x border-solid border-mossGreen py-2 px-20 hover:bg-kaki transition">
          <Link to="/artikler">ARTIKLER</Link>
        </li>
        <li className="border-x border-solid border-mossGreen py-2 px-20 hover:bg-kaki transition">
          <Link to="/bestilcontainer">BESTIL CONTAINER</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
