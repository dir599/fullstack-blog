import React from "react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-amber-500 h-20 w-full flex items-center px-8">
      {/* Logo */}
      <div className="h-12 w-12">
        <img
          src={logo}
          alt="logo"
          className="h-full w-full object-contain rounded-3xl"
        />
      </div>

      {/* Routes */}
      <div className="ml-auto">
        <ul className="flex gap-20 bg-blue-400 rounded-2xl px-8 py-3">
          <Link to="/" className="text-gray-600 hover:text-orange-500">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-orange-500">
            About
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-orange-500">
            Contact
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
