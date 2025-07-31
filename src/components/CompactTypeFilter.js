import React, { useState } from "react";
import TypeFilter from "./TypeFilter";

const CompactTypeFilter = ({ onTypeFilterChange, selectedTypes = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeFilterChange = (types) => {
    if (onTypeFilterChange) {
      onTypeFilterChange(types);
    }
  };

  const getFilterText = () => {
    if (selectedTypes.length === 0) {
      return "Lọc theo Type";
    } else if (selectedTypes.length === 5) {
      return "Tất cả Type";
    } else {
      return `${selectedTypes.length} Type đã chọn`;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Button Filter */}
      <button
        onClick={handleToggle}
        style={{
          padding: "8px 16px",
          borderRadius: 6,
          border: "1px solid #b0c4de",
          background: selectedTypes.length > 0 ? "#e3f2fd" : "#fff",
          color: selectedTypes.length > 0 ? "#2d3a4b" : "#666",
          fontWeight: selectedTypes.length > 0 ? 600 : 500,
          fontSize: 14,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transition: "all 0.2s ease",
          boxShadow: selectedTypes.length > 0 ? "0 2px 4px rgba(45, 58, 75, 0.1)" : "none",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = selectedTypes.length > 0 ? "#d1e7ff" : "#f5f5f5";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = selectedTypes.length > 0 ? "#e3f2fd" : "#fff";
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
        </svg>
        {getFilterText()}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>

      {/* Dropdown TypeFilter */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            marginTop: 8,
            animation: "slideDown 0.2s ease-out",
          }}
        >
          <TypeFilter
            onTypeFilterChange={handleTypeFilterChange}
            selectedTypes={selectedTypes}
          />
        </div>
      )}

      {/* Overlay để đóng dropdown khi click bên ngoài */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={handleToggle}
        />
      )}

      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default CompactTypeFilter; 