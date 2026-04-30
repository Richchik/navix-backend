import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import RouteMap from "../components/RouteMap";

export default function Shipments() {

  const [shipments, setShipments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedShipmentId, setSelectedShipmentId] = useState(null);
  const [aiInsights, setAiInsights] = useState({});

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    vehicle: "",
  });

  const selectedShipment = shipments.find(
    (s) => s._id === selectedShipmentId
  );

  useEffect(() => {
    fetchShipments();
    const interval = setInterval(fetchShipments, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchShipments = async () => {
    try {
      const res = await axios.get("https://navix-backend-e5vm.onrender.com/api/shipments");

      const formatted = res.data.map((s) => ({
        _id: s._id,
        origin: s.origin,
        destination: s.destination,
        vehicle: s.vehicle,
        status: s.status || "pending",
        eta: s.eta || "Unknown",
        delay: s.delay || "Low",
        currentLocation: s.currentLocation
      }));

      setShipments(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const getAIPrediction = async (shipment) => {
    try {
      const res = await axios.post("https://navix-backend-e5vm.onrender.com/api/ai/predict-delay", {
        id: shipment._id,
        origin: shipment.origin,
        destination: shipment.destination,
        vehicle: shipment.vehicle,
      });

      return res.data.prediction;
    } catch {
      return "Medium risk - fallback";
    }
  };

  useEffect(() => {
    const fetchAI = async () => {
      for (let shipment of shipments) {
        if (aiInsights[shipment._id]) continue;

        const prediction = await getAIPrediction(shipment);

        setAiInsights((prev) => ({
          ...prev,
          [shipment._id]: prediction,
        }));
      }
    };

    if (shipments.length > 0) fetchAI();
  }, [shipments]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://navix-backend-e5vm.onrender.com/api/shipments",
        formData
      );

      setShipments((prev) => [res.data, ...prev]);
      setShowModal(false);

      setFormData({
        origin: "",
        destination: "",
        vehicle: "",
      });

    } catch (err) {
      console.error(err);
    }
  };

  const deleteShipment = async (id) => {
    try {
      await axios.delete(`https://navix-backend-e5vm.onrender.com/api/shipments/${id}`);
      setSelectedShipmentId(null);
      fetchShipments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto text-white bg-gradient-to-br from-[#020617] to-[#0f172a]">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-400 hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer">
          📦 Shipments
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition px-4 py-2 rounded-lg shadow-lg"
        >
          + Add Shipment
        </button>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total" value={shipments.length} />
        <StatCard title="In Transit" value={shipments.filter(s => s.status === "in-transit").length} />
        <StatCard title="Delivered" value={shipments.filter(s => s.status === "delivered").length} />
        <StatCard title="Delayed" value={shipments.filter(s => s.delay === "High").length} />
      </div>

      {/* 🔥 GLASS TABLE */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-white/10">
              <th className="py-3">ID</th>
              <th>Route</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>ETA</th>
              <th>Delay</th>
              <th>Action</th>
              <th>AI Insight</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((s) => (
              <motion.tr
                key={s._id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedShipmentId(s._id)}
                className="cursor-pointer hover:bg-white/5 transition-all"
              >
                <td className="py-4 text-xs text-gray-400">{s._id}</td>

                <td className="font-medium">
                  {s.origin} → {s.destination}
                </td>

                <td className="text-purple-300">{s.vehicle}</td>

                <td><StatusBadge status={s.status} /></td>

                <td className="text-gray-300">{s.eta}</td>

                <td><DelayBadge delay={s.delay} /></td>

                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteShipment(s._id);
                    }}
                    className="bg-red-500/80 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>

                <td className="text-purple-300 text-sm leading-relaxed max-w-xs">
                  {aiInsights[s._id] || "Analyzing..."}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 MAP */}
      {selectedShipmentId && selectedShipment && (
        <div className="mt-8 backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">📍 Live Route Tracking</h2>
          <RouteMap
            origin={selectedShipment.origin}
            destination={selectedShipment.destination}
            currentLocation={selectedShipment.currentLocation}
          />
        </div>
      )}

      {/* 🔥 AI BANNER */}
      <div className="mt-8 bg-gradient-to-r from-purple-700 to-blue-700 p-6 rounded-xl shadow-lg">
        ⚡ AI Insight: Live prediction system analyzing delays.
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0f172a] p-6 rounded-xl w-96 border border-white/10">
            <h2 className="text-xl font-bold mb-4">Add Shipment</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input name="origin" placeholder="Origin" value={formData.origin} onChange={handleChange}
                className="w-full p-2 rounded bg-white/10 border border-white/10" required />

              <input name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange}
                className="w-full p-2 rounded bg-white/10 border border-white/10" required />

              <input name="vehicle" placeholder="Vehicle" value={formData.vehicle} onChange={handleChange}
                className="w-full p-2 rounded bg-white/10 border border-white/10" required />

              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowModal(false)}
                  className="bg-gray-600 px-4 py-2 rounded">
                  Cancel
                </button>

                <button type="submit"
                  className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
                  Add
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

/* 🔥 COMPONENTS */

function StatCard({ title, value }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg hover:scale-105 transition">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    "pending": "bg-yellow-500",
    "in-transit": "bg-blue-500",
    "delivered": "bg-green-500",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[status]}`}>
      {status}
    </span>
  );
}

function DelayBadge({ delay }) {
  const colors = {
    "High": "bg-red-500",
    "Medium": "bg-yellow-500 text-black",
    "Low": "bg-green-500",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[delay]}`}>
      {delay}
    </span>
  );
}