import React, { useState, useEffect } from 'react';
import { Bell, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user/logout");
      
      if (response.data.success) {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="h-16 bg-gray-800 flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
        Erroz420 Planner
      </h1>
      <div className="flex items-center space-x-4">
        {isLoggedIn && (
          <button className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600">
            <Bell size={20} />
          </button>
        )}
        <div className="relative group">
          <button 
            className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600"
            onClick={() => {
              if (isLoggedIn) {
                document.getElementById("userMenu").classList.toggle("hidden");
              } else {
                handleLogin();
              }
            }}
          >
            <User size={20} />
          </button>
          {isLoggedIn && (
            <div 
              id="userMenu" 
              className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
            >
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
