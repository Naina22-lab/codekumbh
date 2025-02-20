import React from "react";
import { Bell, User } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-16 bg-gray-800 flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
        AI Travel Planner
      </h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600">
          <Bell size={20} />
        </button>
        <button className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};
