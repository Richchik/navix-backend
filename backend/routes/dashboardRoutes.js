import express from "express";
import Shipment from "../models/shipment.js";

const router = express.Router();

// 📊 DASHBOARD API
router.get("/", async (req, res) => {
  try {
    // Total shipments
    const shipments = await Shipment.countDocuments();

    // Active shipments
    const active = await Shipment.countDocuments({
      status: "in-transit",
    });

    // Alerts (from global memory OR fallback demo)
    const alerts = global.alerts?.length || 1; // 👈 demo fallback

    res.json({
      shipments,
      active,
      success: 100,
      alerts,
      suggestion: "AI suggests alternate route due to traffic congestion",
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Dashboard error" });
  }
});

export default router;