import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  name: String,
  type: String, // truck / van

  currentLocation: {
    lat: Number,
    lng: Number,
  },

  status: {
    type: String,
    enum: ["idle", "on-route", "maintenance"],
    default: "idle",
  },
});

export default mongoose.model("Vehicle", vehicleSchema);