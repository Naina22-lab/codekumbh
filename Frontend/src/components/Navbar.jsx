import React from "react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              AI Travel Planner
            </Link>
          </div>
          <div className="flex">
            <Link
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Plan Trip
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Explore Deals
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              AI Assistant
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
