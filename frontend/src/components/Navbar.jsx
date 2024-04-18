import React, { useEffect, useState } from 'react';
import logo from '../logo.png'
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <header className="bg-blue-800 dark:bg-gray-900 text-white py-4 font-body">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Your Logo" className="h-8" />
          </Link>
        </div>

        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-10">
            <li><Link to="/" className="hover:text-gray-500">Upload</Link></li>
            <li><Link to="/login" className="hover:text-gray-500">Login</Link></li>
            <li><Link to="/session" className="hover:text-gray-500">Session</Link></li>

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
