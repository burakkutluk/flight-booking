import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaTag  } from "react-icons/fa";

const Header = ({ user }) => {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Plane Scape" className="h-8 w-auto" />
          <span className="ml-2 text-xl font-bold text-zinc-600">
            PLANE SCAPE
          </span>
        </Link>
        <div className="flex items-center ">
          <span className="mr-1"><FaTag  color="blue" /></span>
          <Link to="/my-flights" className="text-gray-600 hover:text-primary mr-4">
            My Flights
          </Link>
          <span className="mr-1"><FaEarthAmericas color="blue" /></span>
          <Link
            to="/"
            className="text-gray-600 hover:text-primary mr-4"
          >
            Discover
          </Link>
          {user ? (
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {user.name}
              </span>
            </div>
          ) : (
            <Link to="/login" className="text-primary hover:text-secondary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
