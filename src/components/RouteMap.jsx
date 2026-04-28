import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function RouteMap({ origin, destination, currentLocation, setEta }) {
  const [directions, setDirections] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // ✅ SAFE LOCATION
  const safeLocation = {
    lat: currentLocation?.lat || 28.6139,
    lng: currentLocation?.lng || 77.2090,
  };

  useEffect(() => {
    // ❌ DO NOT RUN until map is loaded
    if (!mapLoaded || !origin || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
  setDirections(result);

  // ✅ GET ETA
  const duration = result.routes[0].legs[0].duration.text;




  // OPTIONAL: send to parent if needed
} else {
          console.error("Directions error:", result);
        }
      }
    );
  }, [origin, destination, mapLoaded]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      onLoad={() => setMapLoaded(true)} // ✅ IMPORTANT
    >
  <GoogleMap
  mapContainerStyle={containerStyle}
  zoom={6}
  center={directions ? undefined : safeLocation} // ✅ FIX
>
        {/* Route */}
        {directions && <DirectionsRenderer directions={directions} />}

{/* 🚚 TRUCK MARKER */}
{directions ? (
  <Marker
    position={
      directions.routes[0].legs[0].start_location
    }
    icon={{
      url: "https://maps.google.com/mapfiles/kml/shapes/truck.png",
      scaledSize: new window.google.maps.Size(40, 40),
    }}
  />
) : (
  <Marker position={safeLocation} />
)}
      </GoogleMap>
    </LoadScript>
  );
}