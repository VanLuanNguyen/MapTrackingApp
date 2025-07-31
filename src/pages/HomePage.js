import { useState } from "react";
import DeviceSelectBox from "../components/DeviceSelectBox";
import MapSelector from "../components/MapSelector";
import { MAP_CONFIG } from "../config/mapConfig";

const HomePage = () => {
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
          width: "100vw",
          textAlign: "center",
          paddingTop: 5,
          paddingBottom: 5,
          zIndex: 1001,
        }}
      >
        <h2
          style={{
            display: "inline-block",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 2,
            color: "#2d3a4b",
            marginBottom: 8,
            textShadow: "0 2px 8px #b0c4de55",
            background: "#f7fafd",
            borderRadius: 10,
            padding: "8px",
            boxShadow: "0 2px 8px #b0c4de22",
          }}
        >
          MAP TRACKING
        </h2>
      </div>
      <div
        style={{
          position: "absolute",
          top: 80,
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
        <DeviceSelectBox onDeviceMarkersChange={setDeviceMarkers} />
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <MapSelector 
          markers={deviceMarkers} 
          googleApiKey={MAP_CONFIG.GOOGLE_MAPS_API_KEY}
        />
      </div>
    </div>
  );
};

export default HomePage;
