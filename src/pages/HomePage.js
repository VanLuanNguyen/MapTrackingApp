import { useState } from "react";
import DeviceSelectBox from "../components/DeviceSelectBox";
import MapSelector from "../components/MapSelector";
import LegendTable from "../components/LegendTable";
import { MAP_CONFIG } from "../config/mapConfig";

const HomePage = ({ user, onNavigateToLogin, onLogout }) => {
  const [deviceMarkers, setDeviceMarkers] = useState([]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >

      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1000,
          background: "#f7fafd",
          border: "1px solid #e0eafc",
          borderRadius: 10,
          padding: 16,
          boxShadow: "0 2px 8px #b0c4de22",
          minWidth: 320,
          maxWidth: "90vw",
        }}
      >
        <DeviceSelectBox onDeviceMarkersChange={setDeviceMarkers} user={user} />
      </div>
      
      {/* Bảng chú thích */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 20,
          zIndex: 1000,
          maxWidth: "300px",
        }}
      >
        <LegendTable />
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <MapSelector 
          markers={deviceMarkers} 
          googleApiKey={MAP_CONFIG.GOOGLE_MAPS_API_KEY}
          onNavigateToLogin={onNavigateToLogin}
          user={user}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom:5,
          left: 20,
          zIndex: 1000,
          background: "#f7fafd",
          border: "1px solid #e0eafc",
          borderRadius: 10,
          padding: 16,
          boxShadow: "0 2px 8px #b0c4de22",
        }}
      >
        {user && (
          <div
            style={{
              background: "#f7fafd",
              borderRadius: 10,
              padding: "8px 16px",
              boxShadow: "0 2px 8px #b0c4de22",
              border: "1px solid #e0eafc",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ color: "#2d3a4b", fontSize: 14, fontWeight: 500 }}>
              👤 {user.username}
            </span>
            <button
              onClick={onLogout}
              style={{
                background: "#ff4757",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "4px 8px",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#ff3742";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#ff4757";
              }}
            >
              Đăng xuất
            </button>
          </div>
        )}
        </div>
    </div>
  );
};

export default HomePage;
