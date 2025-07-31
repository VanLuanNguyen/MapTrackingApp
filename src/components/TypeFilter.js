import React, { useState } from "react";

const TypeFilter = ({ onTypeFilterChange, selectedTypes = [] }) => {
  const [localSelectedTypes, setLocalSelectedTypes] = useState(selectedTypes);

  const typeOptions = [
    { value: 1, label: "Type 1" },
    { value: 2, label: "Type 2" },
    { value: 3, label: "Type 3" },
    { value: 4, label: "Type 4" },
    { value: 5, label: "Type 5" },
  ];

  const handleTypeChange = (typeValue) => {
    const newSelectedTypes = localSelectedTypes.includes(typeValue)
      ? localSelectedTypes.filter(type => type !== typeValue)
      : [...localSelectedTypes, typeValue];
    
    setLocalSelectedTypes(newSelectedTypes);
    
    if (onTypeFilterChange) {
      onTypeFilterChange(newSelectedTypes);
    }
  };

  const handleSelectAll = () => {
    const allTypes = typeOptions.map(option => option.value);
    setLocalSelectedTypes(allTypes);
    if (onTypeFilterChange) {
      onTypeFilterChange(allTypes);
    }
  };

  const handleClearAll = () => {
    setLocalSelectedTypes([]);
    if (onTypeFilterChange) {
      onTypeFilterChange([]);
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
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <label style={{ fontWeight: 600, fontSize: 16, color: "#2d3a4b" }}>
          Lọc theo Type
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleSelectAll}
            style={{
              padding: "4px 8px",
              borderRadius: 4,
              border: "1px solid #2d3a4b",
              background: "transparent",
              color: "#2d3a4b",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Chọn tất cả
          </button>
          <button
            onClick={handleClearAll}
            style={{
              padding: "4px 8px",
              borderRadius: 4,
              border: "1px solid #d32f2f",
              background: "transparent",
              color: "#d32f2f",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Xóa tất cả
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {typeOptions.map((option) => (
          <label
            key={option.value}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: 6,
              transition: "background-color 0.2s",
              backgroundColor: localSelectedTypes.includes(option.value) 
                ? "#e3f2fd" 
                : "transparent",
            }}
            onMouseEnter={(e) => {
              if (!localSelectedTypes.includes(option.value)) {
                e.target.style.backgroundColor = "#f5f5f5";
              }
            }}
            onMouseLeave={(e) => {
              if (!localSelectedTypes.includes(option.value)) {
                e.target.style.backgroundColor = "transparent";
              }
            }}
          >
            <input
              type="checkbox"
              checked={localSelectedTypes.includes(option.value)}
              onChange={() => handleTypeChange(option.value)}
              style={{
                width: 16,
                height: 16,
                cursor: "pointer",
                accentColor: "#2d3a4b",
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: localSelectedTypes.includes(option.value) ? 600 : 500,
                color: localSelectedTypes.includes(option.value) ? "#2d3a4b" : "#666",
              }}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {localSelectedTypes.length > 0 && (
        <div
          style={{
            marginTop: 8,
            padding: "8px 12px",
            background: "#e8f5e8",
            borderRadius: 6,
            border: "1px solid #c8e6c9",
          }}
        >
          <span style={{ fontSize: 12, color: "#2e7d32", fontWeight: 500 }}>
            Đã chọn {localSelectedTypes.length} type: {localSelectedTypes.sort().join(", ")}
          </span>
        </div>
      )}
    </div>
  );
};

export default TypeFilter;