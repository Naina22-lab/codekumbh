"use client";

import React, { useState } from "react";
import { Calendar, DollarSign, MapPin } from "lucide-react";

export const TripPlanner = () => {
  const [budget, setBudget] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handlePlan = () => {
    console.log("Planning trip with:", { budget, destination, startDate, endDate });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">AI Trip Planner</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="text-gray-400" />
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Budget"
            className="flex-1 bg-gray-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="text-gray-400" />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination"
            className="flex-1 bg-gray-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-400" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 bg-gray-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="flex-1 bg-gray-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>
      <button
        onClick={handlePlan}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Generate AI Travel Plan
      </button>
    </div>
  );
};
