import { useState } from "react";
import axios from "axios";

const GoogleMapLinkInput = () => {
  const [link, setLink] = useState("");
  const [deviceName, setDeviceName] = useState("");

  const extractCoordinates = (url) => {
    try {
      const match = url.match(/@?([-.\d]+),([-.\d]+)/);
      if (match) {
        return {
          latitude: parseFloat(match[1]),
          longitude: parseFloat(match[2])
        };
      }

      const qMatch = url.match(/[?&]q=([-.\d]+),([-.\d]+)/);
      if (qMatch) {
        return {
          latitude: parseFloat(qMatch[1]),
          longitude: parseFloat(qMatch[2])
        };
      }

      return null;
    } catch {
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!deviceName || !link) {
      alert("Nhập tên thiết bị và link Google Maps!");
      return;
    }

    const coords = extractCoordinates(link);
    if (!coords) {
      alert("Không thể tách tọa độ từ link Google Maps!");
      return;
    }

    const payload = {
      name: deviceName,
      latitude: coords.latitude,
      longitude: coords.longitude,
      accessedAt: new Date().toISOString()
    };

    try {
      await axios.post("http://localhost:5000/api/device", payload);
      alert("Đã lưu vào database!");
    } catch (err) {
      console.error("Lỗi khi gửi:", err);
      alert("Gửi không thành công!");
    }
  };

  return (
    <div
      style={{
        background: '#f7fafd',
        border: '1px solid #e0eafc',
        borderRadius: 10,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minWidth: 0,
        boxShadow: '0 2px 8px #b0c4de22',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', width: '100%' }}>
        <input
          type="text"
          placeholder="Tên thiết bị"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          style={{
            flex: 1,
            minWidth: 120,
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #b0c4de',
            fontSize: 15,
          }}
        />
        <input
          type="text"
          placeholder="Dán link Google Maps"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{
            flex: 2,
            minWidth: 180,
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #b0c4de',
            fontSize: 15,
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: '7px 18px',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #b0c4de22',
            marginLeft: 8
          }}
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default GoogleMapLinkInput;
