import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBars, FaTimes } from "react-icons/fa";

const socket = io("https://school-backend-1-2xki.onrender.com");

const busIcon = new L.Icon({
  iconUrl:
    "data:image/png;base64,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",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -45],
});

export const Location =() => {
  const [notifications, setNotifications] = useState([]);
  const [busLocation, setBusLocation] = useState({ lat: 17.385, lng: 78.4867, stop: "Starting Point" });
  const [busRoute, setBusRoute] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    fetch("https://school-backend-1-2xki.onrender.com/api/bus/check-bus-notifications/B-107")
      .then((res) => res.json())
      .then((data) => {
        if (data.notifications) {
          setNotifications(data.notifications);
          updateBusLocation(data.notifications);
        }
      })
      .catch((err) => console.error("Error fetching bus notifications:", err));
  }, []);

  useEffect(() => {
    fetch("https://school-backend-1-2xki.onrender.com/api/bus/location/B-107")
      .then((res) => res.json())
      .then((data) => {
        if (data.route) setBusRoute(data.route);
      })
      .catch((err) => console.error("Error fetching bus route:", err));
  }, []);

  const updateBusLocation = (notifications) => {
    if (!busRoute.length || notifications.length === 0) return;
    const latestMessage = notifications[notifications.length - 1];
    const match = latestMessage.match(/at (.+?) at/);
    if (!match) return;
    const stopName = match[1];
    const stop = busRoute.find((s) => s.stopName === stopName);
    if (stop) {
      setBusLocation({ lat: stop.lat, lng: stop.lng, stop: stop.stopName });
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([busLocation.lat, busLocation.lng], 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);
      markerRef.current = L.marker([busLocation.lat, busLocation.lng], { icon: busIcon })
        .addTo(mapRef.current)
        .bindPopup(`<b> You are here</b>`)
        .openPopup();
    } else {
      markerRef.current.setLatLng([busLocation.lat, busLocation.lng])
        .setPopupContent(`<b>You are here</b>`)
        .openPopup();
      mapRef.current.setView([busLocation.lat, busLocation.lng]);
    }
  }, [busLocation]);
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
    {/* Sidebar Overlay */}
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? "block" : "hidden"}`}
      onClick={toggleSidebar}
    ></div>

  
    {/* Main Content */}
    <div className={`flex-grow overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} h-screen`}>
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-purple-700 text-white p-4 shadow-lg lg:hidden">
        <h1 className="text-lg font-bold">Location Tracking</h1>
        <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
        <div className="flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-2/3 p-4 bg-gray-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Location Tracking</h3>
            <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

