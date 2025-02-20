"use client";

import React, { useState } from "react";
import { Calendar, IndianRupee, MapPin } from "lucide-react";
import axios from "axios";

export const TripPlanner = () => {
  const [budget, setBudget] = useState("");
  const [destination, setDestination] = useState("");
  const [source, setSource] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "AIzaSyCU4Ks3wdEqpHlbBs8y7fifUZz5L6FtY1c"; // ⬅ Replace with your actual Gemini API key
  const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}";
  const handlePlan = async () => {
    setLoading(true);
    setError("");
    setRecommendations(null);

    const prompt = `
      I am planning a trip to ${destination} with a budget of ₹${budget} from ${startDate} to ${endDate}.
      Suggest:
      - Top 5 must-visit places
      - Top 3 hotels within budget (with name & price)
      - Must-try food spots or restaurants (with name & price)
      Format the response as a valid JSON object with keys: "places", "hotels", "food".
    `;

    try {
      const response = await axios.post(
        API_URL,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text;
      console.log("AI Response:", aiResponse);

      const jsonStart = aiResponse.indexOf("{");
      const jsonEnd = aiResponse.lastIndexOf("}") + 1;
      const jsonData = JSON.parse(aiResponse.slice(jsonStart, jsonEnd));

      setRecommendations(jsonData);
    } catch (err) {
      console.error("Error fetching travel plan:", err);
      setError("Failed to generate a travel plan. Please try again.");
    }

    setLoading(false);
  };

  const handleBookNow = () => {
    alert("Proceeding to booking page...");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">AI Trip Planner</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <IndianRupee className="text-gray-400" />
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Budget (₹)"
            className="flex-1 bg-gray-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="text-gray-400" />
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Source"
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
        {loading ? "Generating Plan..." : "Generate AI Travel Plan"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {recommendations && (
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h3 className="text-lg font-bold">🌍 Top 5 Places to Visit</h3>
          <ul className="list-disc pl-5">
            {recommendations.places?.map((place, index) => (
              <li key={index}>{place}</li>
            ))}
          </ul>

          <h3 className="text-lg font-bold mt-6">🏨 Top 3 Hotels</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {recommendations.hotels?.map((hotel, index) => (
              <li key={index} className="text-gray-300">
                <span className="font-semibold text-white">{hotel.name}</span> - {hotel.price}
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-bold mt-6">🍽 Must-Try Food Spots</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {recommendations.food?.map((spot, index) => (
              <li key={index} className="text-gray-300">
                <span className="font-semibold text-white">{spot.name}</span> - {spot.price}
              </li>
            ))}
          </ul>

          <button
            onClick={handleBookNow}
            className="w-full mt-8 text-white bg-blue-600 hover:bg-blue-700 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>Book Now</span>
          </button>
        </div>
      )}
    </div>
  );
};