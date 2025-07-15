import { useState } from "react";
import axios from "axios";

const LocationReporter = ({ deviceName }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendLocation = () => {
    if (!deviceName) return;
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const payload = {
          name: deviceName,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accessedAt: new Date().toISOString(),
        };
        try {
          await axios.post("http://localhost:5000/api/device", payload);
          alert("Gửi vị trí thành công!");
        } catch (err) {
          alert("Lỗi gửi vị trí!");
          console.error("Lỗi gửi vị trí:", err);
        }
        setIsLoading(false);
      },
      (err) => {
        alert("Không lấy được vị trí!");
        setIsLoading(false);
        console.error("Không lấy được vị trí:", err);
      }
    );
  };

  return (
    <button
      onClick={handleSendLocation}
      disabled={isLoading}
      style={{
        background: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        padding: '8px 18px',
        fontWeight: 600,
        fontSize: 16,
        cursor: isLoading ? 'not-allowed' : 'pointer',
        boxShadow: '0 2px 8px #b0c4de55',
        margin: 4
      }}
    >
      {isLoading ? 'Đang gửi...' : 'Lưu vị trí của tôi'}
    </button>
  );
};

export default LocationReporter;
