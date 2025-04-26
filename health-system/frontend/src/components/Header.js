import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
// Fallback: import { FaHeartbeat, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/programs', label: 'Programs' },
    { to: '/enroll', label: 'Enroll' },
    { to: '/clients', label: 'Clients' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <HeartIcon className="h-8 w-8 text-teal-600" />
          {/* Fallback: <FaHeartbeat className="text-teal-600 text-3xl" /> */}
          <span className="font-poppins text-2xl font-bold text-gray-800">Health Hub</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-poppins text-base font-semibold ${isActive ? 'text-teal-600' : 'text-gray-600'} hover:text-teal-600 transition-colors`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="md:hidden text-gray-600 hover:text-teal-600 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          {/* Fallback: {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />} */}
        </button>
      </div>
      {isMenuOpen && (
        <motion.nav
          className="md:hidden bg-white shadow-md"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-poppins text-base font-semibold ${isActive ? 'text-teal-600' : 'text-gray-600'} hover:text-teal-600 transition-colors`
                }
                onClick={toggleMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;