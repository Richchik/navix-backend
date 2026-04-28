import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
  name: String,
  location: String,
  capacity: Number,

  // 👇 manual input
  currentStock: {
    type: Number,
    default: 0,
  },

  incomingShipments: {
    type: Number,
    default: 0,
  },

  updatedBy: String,
});

export default mongoose.model("Warehouse", warehouseSchema);