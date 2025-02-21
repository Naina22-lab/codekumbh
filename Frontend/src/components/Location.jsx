import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export const Location = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true); // Start loading
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoading(false); // Stop loading
        },
        (error) => {
          alert("Failed to retrieve location.");
          setLoading(false); // Stop loading on error
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const safeSpots = [
    { lat: 28.7041, lng: 77.1025, name: "Safe Zone 1" },
    { lat: 28.5355, lng: 77.3910, name: "Safe Zone 2" },
    { lat: 8.3245, lng: 77.1025, name: "Safe Zone 3" },
    { lat: 13.2453, lng: 77.3910, name: "Safe Zone 4" },
    { lat: 17.94569, lng: 77.1025, name: "Safe Zone 5" },
    { lat: 28.99355, lng: 77.3910, name: "Safe Zone 6" },
    { lat: 0.7041, lng: 77.1025, name: "Safe Zone 7" },
    { lat: 29.35, lng: 77.3910, name: "Safe Zone 8" },
  ];

  const dangerSpots = [
    { lat: 28.4595, lng: 77.0266, name: "Danger Zone 1" },
    { lat: 28.6139, lng: 77.2090, name: "Danger Zone 2" },
    { lat: 30.4595, lng: 77.0266, name: "Danger Zone 3" },
    { lat: 26.639, lng: 77.2090, name: "Danger Zone 4" },
    { lat: 15.4595, lng: 77.0266, name: "Danger Zone 5" },
    { lat: 12.9919, lng: 77.2090, name: "Danger Zone 6" },
    { lat: 2.234, lng: 77.0266, name: "Danger Zone 7" },
    { lat: 123.6139, lng: 77.2090, name: "Danger Zone 8" }
  ];

  const greenIcon = new L.Icon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const redIcon = new L.Icon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <h2 style={{ color: "white" }}>Find Your Location</h2>
      <button
        onClick={getLocation}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        disabled={loading}
      >
        {loading ? "Fetching location..." : "Get My Location"}
      </button>

      {latitude && longitude ? (
        <MapContainer
          center={[latitude, longitude]}
          zoom={12}
          style={{
            height: "500px",
            width: "90%",
            margin: "20px auto",
            borderRadius: "10px",
          }}
        >
          {/* Dark Mode Tile */}
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

          {/* User Location Marker */}
          <Marker position={[latitude, longitude]}>
            <Popup>You are here!</Popup>
          </Marker>

          {/* Safe Zones */}
          {safeSpots.map((spot, index) => (
            <Marker key={index} position={[spot.lat, spot.lng]} icon={greenIcon}>
              <Popup>{spot.name}</Popup>
            </Marker>
          ))}

          {/* Danger Zones */}
          {dangerSpots.map((spot, index) => (
            <Marker key={index} position={[spot.lat, spot.lng]} icon={redIcon}>
              <Popup>{spot.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p style={{ color: "white", marginTop: "15px" }}>
          {loading ? "Fetching your location..." : "Click the button to find your location."}
        </p>
      )}
    </div>
  );
};
