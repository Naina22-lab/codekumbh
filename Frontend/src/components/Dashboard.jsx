import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Deals } from "./Deals";
import { TripPlanner } from "./TripPlanner";

const link = 'https://plus.unsplash.com/premium_photo-1714051660720-888e8454a021?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const mustVisitPlaces = [
  {
    name: "Paris, France",
    image: link,
    description: "The city of love, known for the Eiffel Tower and exquisite cuisine.",
    budget: "Rs2000 - Rs3000",
  },
  {
    name: "New York, USA",
    image: link,
    description: "The city that never sleeps, with iconic landmarks and vibrant culture.",
    budget: "Rs2500 - Rs3500",
  },
  {
    name: "Santorini, Greece",
    image: link,
    description: "Beautiful blue-domed churches and ocean views",
    budget: "Rs4500 - Rs5000",
  },
];

const trendingLocations = [
  { name: "Santorini, Greece", image: link, description: "Beautiful blue-domed churches and ocean views" },
  { name: "Bali, Indonesia", image: link, description: "Tropical paradise with serene beaches and temples" },
  { name: "Dubai, UAE", image: link, description: "Luxury shopping, ultramodern architecture, and nightlife" },
  { name: "Venice, Italy", image: link, description: "Romantic canals and historic architecture" },
  { name: "Sydney, Australia", image: link, description: "The Opera House and stunning harbor views" },
];

export const Dashboard = () => {
  const [offset, setOffset] = useState(0);
  const [activeTab, setActiveTab] = useState("deals");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setOffset((prev) => (prev - 3) % (trendingLocations.length * 320));
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gray-700/30"
            style={{
              width: '200%',
              left: '-50%',
              top: `${i * 8}%`,
              transform: 'rotate(15deg)',
            }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-8 py-12">
        {/* Must Visit Places Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white mb-12 relative">
            Must Visit Places
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mustVisitPlaces.map((place, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800/40 backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{place.name}</h2>
                  <p className="text-gray-300 mb-4">{place.description}</p>
                  <p className="text-blue-400 font-semibold">Budget: {place.budget}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trending Locations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold text-white mb-12 relative">
            Trending Locations
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </h2>
          <div className="overflow-hidden">
            <motion.div 
              className="flex space-x-8"
              animate={{ x: offset }}
              transition={{ ease: "linear", duration: 0 }}
            >
              {[...trendingLocations, ...trendingLocations].map((location, index) => (
                <motion.div
                  key={index}
                  className="flex-none w-96 bg-gray-800/40 backdrop-blur-lg rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <img src={location.image} alt={location.name} className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{location.name}</h3>
                    <p className="text-gray-300">{location.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex justify-center gap-6"
        >
          <button 
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 
              ${activeTab === "deals" 
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                : "bg-gray-800/40 text-gray-300 hover:bg-gray-700/60"}`}
            onClick={() => setActiveTab("deals")}
          >
            Explore Our Deals
          </button>
          <button 
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 
              ${activeTab === "trip" 
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                : "bg-gray-800/40 text-gray-300 hover:bg-gray-700/60"}`}
            onClick={() => setActiveTab("trip")}
          >
            Plan Trip With Us
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center text-gray-300 text-lg"
        >
          {activeTab === "deals" && <Deals/>&& <p>Check out amazing travel deals curated just for you!</p>}
          {activeTab === "planner"&&<TripPlanner/> && <p>Start planning your dream trip with our customized tools.</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;