import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#a78bfa" : "white",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "bold" : "normal",
  });

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "linear-gradient(180deg, #0f172a, #020617)",
        color: "white",
        padding: "20px",
        borderRight: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <h2 style={{ color: "#a78bfa" }}>NaviX AI</h2>

      <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/dashboard" style={linkStyle("/dashboard")}>
          📊 Dashboard
        </Link>

        <Link to="/shipments" style={linkStyle("/shipments")}>
          📦 Shipments
        </Link>

        <Link to="/warehouse" style={linkStyle("/warehouse")}>
          🏢 Warehouse Intelligence
        </Link>

        <Link to="/alerts" style={linkStyle("/alerts")}>
          🚨 Alerts
        </Link>
      </div>
    </div>
  );
}