import React, { useEffect, useState } from "react";
import axios from "axios";
import CompactTypeFilter from "./CompactTypeFilter";
import axiosInstance from '../utils/axiosInstance';

const DeviceSelectBox = ({ onDeviceMarkersChange, user }) => {
  const [allDevices, setAllDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  // Khôi phục trạng thái đã lưu khi component mount
  useEffect(() => {
    const savedState = localStorage.getItem('deviceSelectState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setSelectedDevice(state.selectedDevice || "");
        setSelectedDate(state.selectedDate || "");
        setSelectedTypes(state.selectedTypes || []);
        
        // Tự động tải dữ liệu nếu có đủ thông tin
        if (state.selectedDevice && state.selectedDate) {
          setTimeout(() => {
            fetchLocationByDeviceAndDate(state.selectedDevice, state.selectedDate, state.selectedTypes || []);
          }, 100);
        }
      } catch (error) {
        console.error('Lỗi khi đọc trạng thái đã lưu:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:5000/api/devices");
        setAllDevices(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thiết bị:", error);
      }
    };

    fetchDevices();
  }, []);

  const fetchLocationByDeviceAndDate = async (deviceId, date, types = []) => {
    if (!deviceId || !date) return;
    setLoading(true);
    setNoData(false);
    try {
      const response = await axiosInstance.get(
        `http://localhost:5000/api/locations?deviceID=${deviceId}&date=${date}`
      );
      let markers = (response.data || [])
        .filter((d) => d.latitude != null && d.longitude != null)
        .map((d) => ({
          lat: d.latitude,
          lng: d.longitude,
          title: d.title,
          recordDate: d.recordDate,
          type: d.type,
          link: d.linkInfo,
        }));
      
      // Lọc theo type nếu có chọn
      if (types.length > 0) {
        markers = markers.filter(marker => types.includes(marker.type));
      }
      
      if (markers.length === 0) {
        setNoData(true);
      }
      if (onDeviceMarkersChange) {
        onDeviceMarkersChange(markers);
      }
    } catch (error) {
      console.error("Lỗi khi lấy vị trí thiết bị:", error);
      setNoData(true);
      if (onDeviceMarkersChange) {
        onDeviceMarkersChange([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Lưu trạng thái vào localStorage
  const saveState = () => {
    const state = {
      selectedDevice,
      selectedDate,
      selectedTypes
    };
    localStorage.setItem('deviceSelectState', JSON.stringify(state));
  };

  const handleDeviceChange = (e) => {
    const value = e.target.value;
    setSelectedDevice(value);
    // Lưu trạng thái khi thay đổi
    setTimeout(() => {
      const newState = {
        selectedDevice: value,
        selectedDate,
        selectedTypes
      };
      localStorage.setItem('deviceSelectState', JSON.stringify(newState));
    }, 0);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    // Lưu trạng thái khi thay đổi
    setTimeout(() => {
      const newState = {
        selectedDevice,
        selectedDate: date,
        selectedTypes
      };
      localStorage.setItem('deviceSelectState', JSON.stringify(newState));
    }, 0);
  };

  const handleShowLocation = () => {
    fetchLocationByDeviceAndDate(selectedDevice, selectedDate, selectedTypes);
  };

  const handleTypeFilterChange = (types) => {
    setSelectedTypes(types);
    // Lưu trạng thái khi thay đổi filter
    setTimeout(() => {
      const newState = {
        selectedDevice,
        selectedDate,
        selectedTypes: types
      };
      localStorage.setItem('deviceSelectState', JSON.stringify(newState));
    }, 0);
    
    // Tự động cập nhật lại dữ liệu khi thay đổi filter
    if (selectedDevice && selectedDate) {
      fetchLocationByDeviceAndDate(selectedDevice, selectedDate, types);
    }
  };

  return (
    <div
      style={{
        background: "#f7fafd",
        border: "1px solid #e0eafc",
        borderRadius: 10,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        minWidth: 0,
        boxShadow: "0 2px 8px #b0c4de22",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <label style={{ fontWeight: 500, minWidth: 80 }}>Thiết bị:</label>
        <select
          value={selectedDevice}
          onChange={handleDeviceChange}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #b0c4de",
            minWidth: 140,
            fontSize: 15,
          }}
        >
          <option value="">-- Chọn thiết bị --</option>
          {allDevices.map((d, index) => (
            <option key={d.deviceID || index} value={d.deviceID}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <label style={{ fontWeight: 500 }}>Ngày:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #b0c4de",
            fontSize: 15,
          }}
        />
      </div>
      <button
        onClick={handleShowLocation}
        disabled={!selectedDevice || !selectedDate || loading}
        style={{
          padding: "8px 0",
          borderRadius: 6,
          border: "none",
          background: "#2d3a4b",
          color: "#fff",
          fontWeight: 600,
          fontSize: 16,
          cursor: !selectedDevice || !selectedDate || loading ? "not-allowed" : "pointer",
          opacity: !selectedDevice || !selectedDate || loading ? 0.6 : 1,
          marginTop: 4,
        }}
      >
        {loading ? "Đang tải..." : "Hiển thị vị trí"}
      </button>
      {noData && (
        <div style={{ color: "#d32f2f", fontWeight: 500, marginTop: 8 }}>
          Không có dữ liệu vị trí cho thiết bị và ngày đã chọn.
        </div>
      )}
      
      {/* Type Filter */}
      <div style={{ marginTop: 16 }}>
        <CompactTypeFilter 
          onTypeFilterChange={handleTypeFilterChange}
          selectedTypes={selectedTypes}
        />
      </div>
    </div>
  );
};

export default DeviceSelectBox;
