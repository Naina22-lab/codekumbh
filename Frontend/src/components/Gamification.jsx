"use client";

import React from "react";
import { Award, Gift, TrendingUp } from "lucide-react";

export const Gamification = () => {
  const challenges = [
    { id: 1, title: "Budget Master", description: "Stay under budget for 3 consecutive days", reward: 500 },
    { id: 2, title: "Explorer", description: "Visit 3 new locations in a single trip", reward: 750 },
    { id: 3, title: "Eco Traveler", description: "Use public transport for all travel for a day", reward: 300 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Travel Rewards</h2>
      <div className="bg-gray-800 rounded-xl p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">Your Travel Score</h3>
          <p className="text-3xl font-bold text-blue-400">850</p>
        </div>
        <Award size={48} className="text-yellow-400" />
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Daily Challenges</h3>
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-gray-800 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{challenge.title}</h4>
              <div className="flex items-center space-x-1 text-yellow-400">
                <Gift size={16} />
                <span>{challenge.reward}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">{challenge.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-xl font-semibold mb-4">Leaderboard</h3>
        <div className="space-y-2">
          <LeaderboardItem name="Alice" score={1250} position={1} />
          <LeaderboardItem name="Bob" score={1100} position={2} />
          <LeaderboardItem name="You" score={850} position={3} isUser />
          <LeaderboardItem name="David" score={800} position={4} />
        </div>
      </div>
    </div>
  );
};

const LeaderboardItem = ({ name, score, position, isUser = false }) => (
  <div className={`flex items-center justify-between p-2 rounded-lg ${isUser ? "bg-blue-600" : "bg-gray-700"}`}>
    <div className="flex items-center space-x-2">
      <span className="font-bold">{position}</span>
      <span>{name}</span>
    </div>
    <div className="flex items-center space-x-1">
      <TrendingUp size={16} />
      <span>{score}</span>
    </div>
  </div>
);