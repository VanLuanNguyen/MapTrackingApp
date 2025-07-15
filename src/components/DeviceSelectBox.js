import React, { useEffect, useState } from "react";
import axios from "axios";

const DeviceSelectBox = ({ onDeviceMarkersChange }) => {
  const [allDevices, setAllDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/device");
        setAllDevices(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thiết bị:", error);
      }
    };

    fetchDevices();
  }, []);

  const uniqueNames = Array.from(new Set(allDevices.map((d) => d.name)));

  const filterAndEmit = (deviceName, from, to) => {
    if (!deviceName) return;

    const filtered = allDevices.filter((d) => {
      const time = new Date(d.accessedAt).getTime();
      const afterStart = from ? time >= new Date(from).getTime() : true;
      const beforeEnd = to ? time <= new Date(to).getTime() : true;
      return d.name === deviceName && afterStart && beforeEnd;
    });

    const markers = filtered.map((d) => ({
      lat: d.latitude,
      lng: d.longitude,
      accessedAt: d.accessedAt,
    }));

    if (onDeviceMarkersChange) {
      onDeviceMarkersChange(markers);
    }
  };

  const handleDeviceChange = (e) => {
    const name = e.target.value;
    setSelectedDevice(name);
    filterAndEmit(name, startTime, endTime);
  };

  const handleStartTimeChange = (e) => {
    const value = e.target.value;
    setStartTime(value);
    filterAndEmit(selectedDevice, value, endTime);
  };

  const handleEndTimeChange = (e) => {
    const value = e.target.value;
    setEndTime(value);
    filterAndEmit(selectedDevice, startTime, value);
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
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <label style={{ fontWeight: 500, minWidth: 80 }}>Thiết bị:</label>
        <select
          value={selectedDevice}
          onChange={handleDeviceChange}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #b0c4de',
            minWidth: 140,
            fontSize: 15,
          }}
        >
          <option value="">-- Chọn thiết bị --</option>
          {uniqueNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <label style={{ fontWeight: 500 }}>Từ:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={handleStartTimeChange}
          style={{
            padding: '6px 8px',
            borderRadius: 6,
            border: '1px solid #b0c4de',
            fontSize: 15,
          }}
        />
        <label style={{ fontWeight: 500 }}>Đến:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={handleEndTimeChange}
          style={{
            padding: '6px 8px',
            borderRadius: 6,
            border: '1px solid #b0c4de',
            fontSize: 15,
          }}
        />
      </div>
    </div>
  );
};

export default DeviceSelectBox;
