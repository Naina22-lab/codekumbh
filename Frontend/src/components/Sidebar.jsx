import React from "react";
import PropTypes from 'prop-types';
import { Home, Map, Zap, Gift, MapPin, AlertTriangle } from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "planner", icon: Map, label: "Trip Planner" },
    { id: "location", icon: MapPin, label: "Location" },
    { id: "deals", icon: Zap, label: "Deals" },
    { id: "gamification", icon: Gift, label: "Rewards" },
    { id: "SOS", icon: AlertTriangle, label: "SOS" }
  ];

  return (
    <aside className="w-20 bg-gray-800 flex flex-col items-center py-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`w-16 h-16 mb-4 rounded-xl flex flex-col items-center justify-center transition-all ${
            activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700"
          }`}
        >
          <tab.icon size={24} />
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      ))}
    </aside>
  );
};

Sidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};
