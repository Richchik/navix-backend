import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  vehicle: String,
  status: String,
  eta: String,
  aiInsight: String,
aiLastUpdated: Date,
warehouse: String,
  delay: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low"
  },

  // ✅ FIXED: DEFAULT LOCATION (prevents NaN error)
  currentLocation: {
    lat: { type: Number, default: 28.6139 }, // Delhi
    lng: { type: Number, default: 77.2090 }
  }

}, { timestamps: true });

export default mongoose.model("Shipment", shipmentSchema);