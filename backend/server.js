import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Shipment from "./models/shipment.js"; // ✅ ADD THIS
import axios from "axios";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import Warehouse from "./models/warehouse.js";
import nodemailer from "nodemailer";

dotenv.config();



const app = express();

app.use(cors());
app.use(express.json());

connectDB();
global.alerts = [];
let sentAlerts = new Set();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "navix.ai.team@gmail.com",
    pass: "xkhe vtbv zpae noey"
  }
});
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/shipments", shipmentRoutes);

// ✅ ADD THIS TEST ROUTE 👇
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});
app.get("/", (req, res) => {
  res.send("API Running...");
});

// 🚚 REAL-TIME TRACKING SIMULATION
setInterval(async () => {
  try {
    const shipments = await Shipment.find({ status: "in-transit" });

    for (let s of shipments) {
      s.currentLocation.lat += (Math.random() - 0.5) * 0.01;
      s.currentLocation.lng += (Math.random() - 0.5) * 0.01;
      await s.save();
    }

    if (Math.random() > 0.5) {
  console.log("📍 Location updated");
}
  } catch (err) {
    console.log("Error:", err.message);
  }
}, 5000);

app.post("/api/ai/predict-delay", async (req, res) => {
  try {
    const { id, origin, destination, vehicle } = req.body;

    const shipment = await Shipment.findById(id);

    const TEN_MIN = 10 * 60 * 1000;

    // ✅ Use cached AI result if recent
    if (
      shipment?.aiInsight &&
      shipment?.aiLastUpdated &&
      Date.now() - new Date(shipment.aiLastUpdated).getTime() < TEN_MIN
    ) {
      return res.json({ prediction: shipment.aiInsight });
    }

    const prompt = `Shipment from ${origin} to ${destination} via ${vehicle}. 
Predict delay risk (Low/Medium/High) and give 1 short reason.`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const output =
      response.data.choices[0].message.content || "Medium risk";

    // ✅ SAVE AI RESULT
    shipment.aiInsight = output;
    shipment.aiLastUpdated = new Date();
    await shipment.save();

    res.json({ prediction: output });
  } catch (err) {
    console.log(err.message);

    res.json({
      prediction: "Medium risk - fallback (AI unavailable)",
    });
  }
});

/*Warehouse overload logic*/
app.get("/api/warehouse-status", async (req, res) => {
  try {
    const warehouses = await Warehouse.find();

    const result = warehouses.map((w) => {
      const totalLoad = (w.currentStock || 0) + (w.incomingShipments || 0);

      let status = "Normal";
      let insight = "Operating smoothly";

      if (totalLoad > w.capacity) {
        status = "Overloaded";
        insight = "🚨 Redirect shipments to nearby warehouse";
      } else if (totalLoad > 0.8 * w.capacity) {
        status = "Near Capacity";
        insight = "⚠️ Monitor closely, risk of congestion";
      }

      return {
  _id: w._id, // ✅ ADD THIS
  name: w.name,
        capacity: w.capacity,
        load: totalLoad,
        status,
        insight,
      };
    });

    // 🚨 AUTO SOS LOGIC
for (let w of result) {
  const alertKey = w.name + w.status;

  if (
    (w.status === "Overloaded" || w.status === "Near Capacity") &&
    !sentAlerts.has(alertKey)
  ) {
    try {
      await transporter.sendMail({
        from: "navix.ai.team@gmail.com",
        to: "richkashyap18@gmail.com",
        subject: `🚨 NAVIX AI - ${w.status} Alert`,
        text: `
🚨 AUTO ALERT 🚨

Warehouse: ${w.name}
Status: ${w.status}

Action Required Immediately.

- NaviX AI
        `,
      });

      console.log("✅ Auto SOS Sent for", w.name);

      sentAlerts.add(alertKey);
    } catch (err) {
      console.log("❌ Auto SOS Error:", err.message);
    }
  }

  // 🔄 RESET if back to normal
  if (w.status === "Normal") {
    sentAlerts.delete(w.name + "Overloaded");
    sentAlerts.delete(w.name + "Near Capacity");
  }
}

res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ ADD NEW WAREHOUSE
app.post("/api/warehouses", async (req, res) => {
  try {
    const { name, location, capacity, load } = req.body;

    const newWarehouse = new Warehouse({
      name,
      location,
      capacity,
      currentStock: load,
      incomingShipments: 0,
    });

    await newWarehouse.save();

    res.json(newWarehouse);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to add warehouse" });
  }
});

// ✅ UPDATE WAREHOUSE
app.put("/api/warehouses/:id", async (req, res) => {
  try {
    const { name, location, capacity, load } = req.body;

    const updated = await Warehouse.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        capacity,
        currentStock: load,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Update failed" });
  }
});
// 🚨 SOS EMAIL ALERT
app.post("/api/sos", async (req, res) => {
  try {
    const { warehouseName, message } = req.body;

    // ✅ ADD THIS LINE
    global.alerts.push({
      warehouseName,
      message,
      time: new Date(),
    });

    await transporter.sendMail({
      from: "navix.ai.team@gmail.com",
      to: "richkashyap18@gmail.com",
      subject: "🚨 NAVIX AI - Warehouse SOS Alert",
      text: `
🚨 URGENT ALERT 🚨

Warehouse: ${warehouseName}

Issue: ${message}

Action Required: Immediate intervention needed.

- NaviX AI System
      `,
    });

    console.log("📧 SOS Email Sent");

    res.json({ success: true });
  } catch (error) {
    console.log("Email Error:", error.message);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
