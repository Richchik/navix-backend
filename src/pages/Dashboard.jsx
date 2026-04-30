import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location.href = "/login";
      }
    });

    axios
      .get("https://navix-backend.onrender.com/api/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

    return () => unsubscribe();
  }, []);

  // ✅ Close menu on outside click
  useEffect(() => {
    const closeMenu = () => setShowMenu(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-visible">

      {/* Sidebar */}
      <div className="w-64 bg-black/80 backdrop-blur-lg border-r border-gray-800 p-6">
        <h2 className="text-2xl font-bold text-purple-400 mb-10">NaviX AI</h2>

        <ul className="space-y-6 text-gray-400">
          <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
          <li><Link to="/shipments" className="hover:text-white">Shipments</Link></li>
          <li><Link to="/routes" className="hover:text-white">Routes</Link></li>
          <li><Link to="/alerts" className="hover:text-white">Alerts</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* Topbar */}
        <div className="flex justify-between items-center mb-8 relative z-50">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <input
              placeholder="Search..."
              className="bg-gray-800 px-4 py-2 rounded-lg outline-none"
            />

            {/* ✅ PROFILE */}
            <div className="relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full cursor-pointer flex items-center justify-center font-bold"
              >
                {auth.currentUser?.email?.[0]?.toUpperCase() || "U"}
              </div>

              {showMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-4 z-[9999]">

                  {/* User Info */}
                  <div className="mb-3">
                    <p className="text-sm text-gray-400">Signed in as</p>
                    <p className="text-sm font-semibold text-white truncate">
                      {auth.currentUser?.email}
                    </p>
                  </div>

                  <hr className="border-gray-700 mb-3" />

                  {/* Settings */}
                  <button
                    onClick={() => navigate("/settings")}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300"
                  >
                    ⚙️ Settings
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {[
            { title: "Shipments", value: data?.shipments || "0", color: "from-purple-500 to-indigo-500" },
            { title: "Active", value: data?.active || "0", color: "from-blue-500 to-cyan-500" },
            { title: "Success", value: data ? `${data.success}%` : "0%", color: "from-green-500 to-emerald-500" },
            { title: "Alerts", value: data?.alerts || "0", color: "from-red-500 to-pink-500" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${item.color} shadow-xl`}
            >
              <h3 className="text-white/80">{item.title}</h3>
              <p className="text-3xl font-bold mt-2 text-white">{item.value}</p>
              <div className="absolute inset-0 bg-white/10 blur-xl opacity-20 rounded-2xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Insights */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* Delivery */}
          <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="mb-4 text-gray-300">📊 Delivery Performance</h3>

            <div className="space-y-3 text-gray-300">
              <p>🚚 Total Shipments: {data?.shipments || 7}</p>
              <p>⏱ Avg Delivery Time: 22 hrs</p>
              <p className="text-green-400">✔ On-Time Deliveries: 82%</p>
              <p className="text-red-400">⚠ Delayed Shipments: 18%</p>

              <div className="mt-4 bg-gray-800 rounded-lg p-3 text-sm text-gray-400">
                📈 Performance improving compared to last week
              </div>
            </div>
          </div>

          {/* Traffic */}
          <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="mb-4 text-gray-300">🚦 Traffic Insights</h3>

            <div className="space-y-3 text-gray-300">
              <p className="text-red-400">🔴 Heavy Traffic: Mumbai Hub B</p>
              <p className="text-yellow-400">🟡 Moderate Traffic: Delhi Route</p>
              <p className="text-green-400">🟢 Clear Route: Bangalore</p>

              <div className="mt-4 bg-gray-800 rounded-lg p-3 text-sm text-purple-400">
                🤖 AI Suggestion: Reroute via Nashik to save ~20 mins
              </div>
            </div>
          </div>

        </div>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-purple-600 to-blue-500 p-6 rounded-2xl shadow-xl overflow-hidden"
        >
          <h3 className="text-lg font-semibold mb-2 text-white">⚡ AI Insight</h3>

          <p className="text-white/90 text-sm">
            {data?.suggestion || "AI is analyzing logistics patterns..."}
          </p>

          <div className="absolute w-40 h-40 bg-purple-400 blur-3xl opacity-30 top-0 right-0 animate-pulse"></div>
        </motion.div>

      </div>
    </div>
  );
}