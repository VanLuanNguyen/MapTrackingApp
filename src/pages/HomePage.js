import { useState } from "react";
import DeviceSelectBox from "../components/DeviceSelectBox";
import MapView from "../components/MapView";
import LocationReporter from "../components/LocationReporter"; 
import GoogleMapLinkInput from "../components/GoogleMapLinkInput";

const HomePage = () => {
  const [deviceMarkers, setDeviceMarkers] = useState([]);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
    }}>
      <aside style={{
        width: 300,
        background: '#fff',
        boxShadow: '2px 0 12px #b0c4de33',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        zIndex: 2
      }}>
        <h2 style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: 2,
          color: '#2d3a4b',
          marginBottom: 8,
          textShadow: '0 2px 8px #b0c4de55'
        }}>
          MAP TRACKING
        </h2>
        <DeviceSelectBox onDeviceMarkersChange={setDeviceMarkers} />
        <GoogleMapLinkInput />
        <LocationReporter deviceName="MyDevice" />
      </aside>
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 0,
      }}>
        <div style={{ width: '100%', height: '100%' }}>
          <MapView markers={deviceMarkers} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
