import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, TrafficLayer, Marker } from "@react-google-maps/api";

export default function Warehouse() {
  const [warehouses, setWarehouses] = useState([]);

  const [form, setForm] = useState({
    name: "",
    location: "",
    capacity: "",
    load: "",
  });

  // ✅ EDIT STATES
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    location: "",
    capacity: "",
    load: "",
  });

  // 🚦 MAP STATE
  const [searchLocation, setSearchLocation] = useState("");
  const [mapLocation, setMapLocation] = useState({
    lat: 19.0760,
    lng: 72.8777,
  });

  // 🧠 SMART TRAFFIC STATE
  const [trafficStatus, setTrafficStatus] = useState("");

  const inputStyle = {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    outline: "none",
    backdropFilter: "blur(10px)",
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "16px",
  };

  // ✅ FETCH DATA
  const fetchData = async () => {
    const res = await fetch("https://navix-backend-e5vm.onrender.com/api/warehouse-status");
    const data = await res.json();
    setWarehouses(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD WAREHOUSE
  const handleAddWarehouse = async () => {
    if (!form.name || !form.location || !form.capacity || !form.load) {
      alert("Fill all fields");
      return;
    }

    await fetch("https://navix-backend-e5vm.onrender.com/api/warehouses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        location: form.location,
        capacity: Number(form.capacity),
        load: Number(form.load),
      }),
    });

    fetchData();
    setForm({ name: "", location: "", capacity: "", load: "" });
  };

  // ✅ UPDATE
  const handleUpdateWarehouse = async (id) => {
    await fetch(`https://navix-backend-e5vm.onrender.com/api/warehouses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editForm.name,
        location: editForm.location,
        capacity: Number(editForm.capacity),
        load: Number(editForm.load),
      }),
    });

    fetchData();
    setEditIndex(null);
  };

  // 🚦 LOCATION SEARCH + AI INSIGHT
  const handleLocationSearch = async () => {
    if (!searchLocation) return;

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );

    const data = await res.json();

    if (data.results.length > 0) {
      const loc = data.results[0].geometry.location;

      setMapLocation({
        lat: loc.lat,
        lng: loc.lng,
      });

      // 🧠 SMART TRAFFIC LOGIC (SIMULATED AI)
      const random = Math.random();

      if (random < 0.4) {
        setTrafficStatus("🟢 Low Traffic - Good for routing");
      } else if (random < 0.7) {
        setTrafficStatus("🟡 Moderate Traffic - Monitor");
      } else {
        setTrafficStatus("🔴 Heavy Traffic - Consider alternate hub");
      }

    } else {
      alert("Location not found");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #020617, #0f172a)",
      padding: "20px",
      color: "white"
    }}>
      <h1 style={{ color: "#a78bfa", marginBottom: "20px" }}>
        🏢 Warehouse Intelligence
      </h1>

      {/* FORM */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "15px",
        marginBottom: "30px",
      }}>
        <input name="name" placeholder="Warehouse Name" value={form.name} onChange={handleChange} style={inputStyle} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} style={inputStyle} />
        <input name="capacity" type="number" placeholder="Capacity" value={form.capacity} onChange={handleChange} style={inputStyle} />
        <input name="load" type="number" placeholder="Current Load" value={form.load} onChange={handleChange} style={inputStyle} />

        <button onClick={handleAddWarehouse} style={{
          background: "#7c3aed",
          border: "none",
          padding: "10px",
          borderRadius: "10px",
          color: "white",
          cursor: "pointer",
        }}>
          + Add Warehouse
        </button>
      </div>

      {/* SEARCH */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Enter city"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLocationSearch} style={{
          background: "#7c3aed",
          border: "none",
          padding: "10px",
          borderRadius: "10px",
          color: "white",
          cursor: "pointer",
        }}>
          Show on Map
        </button>
      </div>

      {/* 🚦 LEGEND */}
      <div style={{
        display: "flex",
        gap: "20px",
        marginBottom: "10px",
        fontSize: "14px"
      }}>
        <span>🟢 Smooth</span>
        <span>🟡 Moderate</span>
        <span>🔴 Heavy</span>
      </div>

      {/* MAP */}
      <div style={{ marginBottom: "20px" }}>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={mapLocation} zoom={12}>
            <Marker position={mapLocation} />
            <TrafficLayer autoUpdate />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* 🧠 SMART OUTPUT */}
      {trafficStatus && (
        <div style={{
          marginBottom: "30px",
          padding: "12px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)"
        }}>
          🚦 Smart Traffic Insight: <b>{trafficStatus}</b>
        </div>
      )}

      {/* WAREHOUSES */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px"
      }}>
        {warehouses.map((w, i) => {
          const percent = Math.round((w.load / w.capacity) * 100);

          return (
            <div key={i} style={{
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <h2>{w.name}</h2>
              <p>{w.location}</p>
              <p>Capacity: {w.capacity}</p>
              <p>Load: {w.load}</p>

              <div style={{ height: "6px", background: "#333", borderRadius: "10px" }}>
                <div style={{
                  width: `${percent}%`,
                  height: "100%",
                  background:
                    percent > 90 ? "red" :
                    percent > 70 ? "yellow" :
                    "green"
                }} />
              </div>

              <p style={{ marginTop: "10px" }}>
                {percent > 90 ? "🔴 Overloaded" :
                 percent > 70 ? "🟡 Near Capacity" :
                 "🟢 Safe"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}