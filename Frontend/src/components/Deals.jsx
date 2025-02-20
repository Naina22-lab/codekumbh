import React, { useState, useEffect } from "react";
import { Tag, Users, Clock, Flame, Gift, Share2 } from "lucide-react";

export const Deals = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [coupon, setCoupon] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");

  const deals = [
    { id: 1, title: "50% off Hotel Booking", type: "Hotel", expiry: 48, users: 15 },
    { id: 2, title: "Group Discount on City Tour", type: "Activity", expiry: 120, users: 8 },
    { id: 3, title: "Early Bird Flight Offer", type: "Flight", expiry: 24, users: 22, trending: true },
  ];

  const validCoupons = {
    SAVE10: "You got 10% off!",
    TRAVEL20: "You got 20% off!",
    FIRST50: "First-time users get 50% off!",
  };

  const applyCoupon = () => {
    if (validCoupons[coupon.toUpperCase()]) {
      setDiscountMessage(validCoupons[coupon.toUpperCase()]);
    } else {
      setDiscountMessage("Invalid coupon code. Try again!");
    }
  };

  const formatTime = (hours) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) =>
        Object.fromEntries(
          deals.map((deal) => [deal.id, Math.max(0, (prev[deal.id] ?? deal.expiry) - 1 / 60)])
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-white mb-4">🔥 Hot Deals</h2>

      {/* Carousel */}
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide p-4">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-gray-800 rounded-xl p-6 min-w-[300px] shadow-lg hover:scale-105 transition-transform"
          >
            <h3 className="font-semibold text-lg text-white flex items-center gap-2">
              {deal.title}
              {deal.trending && <Flame size={16} className="text-red-500" />}
            </h3>

            <div className="flex items-center space-x-2 text-sm text-gray-400 mt-2">
              <Tag size={16} />
              <span>{deal.type}</span>
              <Clock size={16} />
              <span>Expires in {formatTime(timeLeft[deal.id] ?? deal.expiry)}</span>
              <Users size={16} />
              <span>{deal.users} users applied</span>
            </div>

            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all">
              Apply
            </button>
          </div>
        ))}
      </div>

      {/* Coupon Code Section */}
      <div className="bg-gray-900 p-6 rounded-xl mt-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Gift size={20} className="text-yellow-500" /> Have a Promo Code?
        </h3>
        <div className="flex mt-3 space-x-2">
          <input
            type="text"
            className="p-2 rounded-lg bg-gray-700 text-white flex-1"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button
            onClick={applyCoupon}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
          >
            Apply
          </button>
        </div>
        {discountMessage && <p className="text-yellow-400 mt-2">{discountMessage}</p>}
      </div>

      {/* Referral Program */}
      <div className="bg-gray-900 p-6 rounded-xl mt-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Share2 size={20} className="text-blue-500" /> Invite Friends & Earn!
        </h3>
        <p className="text-gray-400 mt-2">Share your referral link and get exclusive discounts!</p>
        <div className="flex mt-3 space-x-2">
          <input
            type="text"
            className="p-2 rounded-lg bg-gray-700 text-white flex-1"
            value="https://yourwebsite.com/referral"
            readOnly
          />
          <button
            onClick={() => navigator.clipboard.writeText("https://yourwebsite.com/referral")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};