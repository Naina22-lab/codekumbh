import React from "react";
import { Tag, Users, Clock } from "lucide-react";

export const Deals = () => {
  const deals = [
    { id: 1, title: "50% off Hotel Booking", type: "Hotel", expiry: "2 days", users: 15 },
    { id: 2, title: "Group Discount on City Tour", type: "Activity", expiry: "5 days", users: 8 },
    { id: 3, title: "Early Bird Flight Offer", type: "Flight", expiry: "1 day", users: 22 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Hot Deals</h2>
      <div className="space-y-4">
        {deals.map((deal) => (
          <div key={deal.id} className="bg-gray-800 rounded-xl p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{deal.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Tag size={16} />
                <span>{deal.type}</span>
                <Clock size={16} />
                <span>Expires in {deal.expiry}</span>
                <Users size={16} />
                <span>{deal.users} users applied</span>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
