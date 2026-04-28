import express from "express";
import Shipment from "../models/shipment.js";
import axios from "axios";

const router = express.Router();


// 🔥 ✅ GEOCODING FUNCTION (NEW)
const geocodeLocation = async (place) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: place,
          key: apiKey,
        },
      }
    );

    if (!response.data.results.length) {
      throw new Error("Location not found");
    }

    const location = response.data.results[0].geometry.location;

    return {
      lat: location.lat,
      lng: location.lng,
    };
  } catch (error) {
    console.error("GEOCODING ERROR:", error.message);

    // fallback (Delhi)
    return {
      lat: 28.6139,
      lng: 77.2090,
    };
  }
};



// ✅ GET ALL (WITH SAFE DATA FIX)
router.get("/", async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });

    const fixedShipments = shipments.map((shipment) => {
      // ✅ FIX DELAY
      if (!["Low", "Medium", "High"].includes(shipment.delay)) {
        shipment.delay = "Low";
      }

 

      return shipment;
    });

    res.json(fixedShipments);
  } catch (error) {
    console.error("ERROR FETCHING:", error.message);
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
});



// ✅ CREATE (🔥 UPDATED WITH REAL LOCATION)
router.post("/", async (req, res) => {
  try {
    const { origin, destination, vehicle } = req.body;

    if (!origin || !destination || !vehicle) {
      return res.status(400).json({ error: "All fields required" });
    }

    // ✅ FORCE BETTER GEOCODING (IMPORTANT FIX)
    const startLocation = await geocodeLocation(origin + ", India");

    console.log("ORIGIN:", origin);
    console.log("COORDINATES:", startLocation); // 🔥 DEBUG

    const shipment = new Shipment({
      origin,
      destination,
      vehicle,
      status: "in-transit",
      eta: "Calculating...",
      delay: "Low",
      currentLocation: startLocation, // ✅ REAL LOCATION
    });

      await shipment.save();

// 🔥 SIMPLE ETA LOGIC (NO API)

const getETA = (origin, destination) => {
  const o = origin.toLowerCase();
  const d = destination.toLowerCase();

  if (o === d) return "1 hour";

  // same major cities
  if (
    (o.includes("delhi") && d.includes("gurgaon")) ||
    (o.includes("mumbai") && d.includes("thane"))
  ) {
    return "4-6 hours";
  }

  // common long routes
  if (
    (o.includes("delhi") && d.includes("mumbai")) ||
    (o.includes("mumbai") && d.includes("delhi"))
  ) {
    return "22-26 hours";
  }

  if (
    (o.includes("delhi") && d.includes("bangalore")) ||
    (o.includes("bangalore") && d.includes("delhi"))
  ) {
    return "30-36 hours";
  }

  if (
    (o.includes("guwahati") && d.includes("mumbai"))
  ) {
    return "40-48 hours";
  }

  // default fallback
  return "12-24 hours";
};

// ✅ SET ETA
shipment.eta = getETA(origin, destination);

await shipment.save();

res.json(shipment);
  } catch (error) {
    console.error("CREATE ERROR:", error.message);
    res.status(500).json({ error: "Failed to create shipment" });
  }
});
// ❌ DELETE SHIPMENT
router.delete("/:id", async (req, res) => {
  try {
    await Shipment.findByIdAndDelete(req.params.id);
    res.json({ message: "Shipment deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error.message);
    res.status(500).json({ error: "Failed to delete shipment" });
  }
});

export default router;