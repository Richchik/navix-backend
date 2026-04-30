import { useEffect, useState } from "react";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("https://navix-backend.onrender.com/api/warehouse-status")
      .then(res => res.json())
      .then(data => {
        const alertList = data
          .filter(w => w.status !== "Normal")
          .map(w => ({
            name: w.name,
            status: w.status,
            message:
              w.status === "Overloaded"
                ? "🚨 Warehouse Overloaded"
                : "⚠️ Near Capacity",
            action: "Immediate attention required",
          }));

        setAlerts(alertList);
      });
  }, []);

  const sendSOS = async (alert) => {
    try {
      await fetch("https://navix-backend.onrender.com/api/sos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          warehouseName: alert.name,
          message: alert.message,
        }),
      });

      alert("🚨 SOS Email Sent!");
    } catch (err) {
      console.log(err);
      alert("❌ Failed to send SOS");
    }
  };

  return (
    <div className="min-h-screen p-6 text-white bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8 text-purple-400">
        🚨 Alerts Center
      </h1>

      {/* EMPTY STATE */}
      {alerts.length === 0 ? (
        <div className="text-gray-400 text-lg">
          No alerts 🚀
        </div>
      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {alerts.map((alert, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:scale-105 transition"
            >
              {/* NAME */}
              <h2 className="text-xl font-semibold text-white">
                {alert.name}
              </h2>

              {/* STATUS */}
              <p className={`mt-2 font-medium ${
                alert.status === "Overloaded"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}>
                {alert.message}
              </p>

              {/* ACTION TEXT */}
              <p className="text-sm text-gray-400 mt-2">
                {alert.action}
              </p>

              <p className="mt-4 text-sm text-purple-400">
               ⚡ Auto SOS Enabled
                </p>

              {/* BUTTON */}
              <button
                onClick={() => sendSOS(alert)}
                className="mt-5 w-full py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition"
              >
                🚨 Trigger SOS
              </button>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}