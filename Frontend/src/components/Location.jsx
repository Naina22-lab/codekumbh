import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export const Location = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
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
    iconUrl: "data:image/png;base64,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",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: "green-marker",
    opacity: 0.6,
  });

  const redIcon = new L.Icon({
    iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2pvm6SoWaH78hho6f5f75w8Vksb_oo1pQvQ&s",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: "red-marker",
    opacity: 0.1,
  });
 
  return (
    <div>
      <button onClick={getLocation} style={{textAlign:"center", fontSize:"40px", fontWeight:"bold"}}>Get My Location</button>
      <MapContainer center={[28.6139, 77.2090]} zoom={10} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {latitude && longitude && (
          <Marker position={[28.4595,  77.1025]} icon= "data:image/jpeg;base64,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">
            <Popup>You are here</Popup>
          </Marker>
        )}
        {safeSpots.map((spot, index) => (
          <Marker key={index} position={[spot.lat, spot.lng]} icon={greenIcon}>
            <Popup>{spot.name} - Safe Zone</Popup>
          </Marker>
        ))}
        {dangerSpots.map((spot, index) => (
          <Marker key={index} position={[spot.lat, spot.lng]} icon={redIcon}>
            <Popup>{spot.name} - Danger Zone</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

