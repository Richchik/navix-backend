import Shipment from "../models/shipment.js";

export const getDashboardData = async (req, res) => {
  const shipments = await Shipment.countDocuments();
  const active = await Shipment.countDocuments({ status: "active" });
  const delayed = await Shipment.countDocuments({ delay: true });

  res.json({
    shipments,
    active,
    success: 100 - delayed,
    alerts: delayed,
    suggestion: "AI suggests alternate route due to traffic congestion",
  });
};