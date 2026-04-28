import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Features from "./pages/Features";
import About from "./pages/About";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Warehouse from "./pages/Warehouse";
import Shipments from "./pages/Shipments";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />

        {/* Main App Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shipments" element={<Shipments />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/alerts" element={<Alerts />} />

        {/* 🔥 IMPORTANT FIX */}
        {/* Redirect old /routes to /warehouse */}
        <Route path="/routes" element={<Navigate to="/warehouse" />} />

        {/* Optional fallback */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}
