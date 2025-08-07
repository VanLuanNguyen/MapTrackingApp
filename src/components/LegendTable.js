import React from 'react';
import './LegendTable.css';

const LegendTable = () => {
  const legendData = [
    {
      emoji: "📍",
      type: 1,
      name: "Vị trí thông thường",
      description: "Điểm đánh dấu vị trí cơ bản"
    },
    {
      emoji: "🚩",
      type: 2,
      name: "Điểm quan trọng",
      description: "Vị trí có ý nghĩa đặc biệt"
    },
    {
      emoji: "🏳️",
      type: 3,
      name: "Điểm trung lập",
      description: "Vị trí trung gian hoặc chờ xử lý"
    },
    {
      emoji: "⛿",
      type: 4,
      name: "Điểm cảnh báo",
      description: "Vị trí cần chú ý hoặc có vấn đề"
    },
    {
      emoji: "🏴󠁶󠁵󠁭󠁡󠁰󠁿",
      type: 5,
      name: "Điểm đặc biệt",
      description: "Vị trí có tính chất riêng biệt"
    }
  ];

  return (
    <div className="legend-container">
      <div className="legend-header">
        <h3>📋 Chú thích ký hiệu</h3>
        <span className="legend-subtitle">Các loại marker trên bản đồ</span>
      </div>
      
      <div className="legend-table">
        <div className="legend-row header">
          <div className="legend-emoji">Ký hiệu</div>
          <div className="legend-type">Loại</div>
          <div className="legend-name">Tên</div>
          <div className="legend-description">Mô tả</div>
        </div>
        
        {legendData.map((item, index) => (
          <div key={index} className="legend-row">
            <div className="legend-emoji">
              <span className="emoji-display">{item.emoji}</span>
            </div>
            <div className="legend-type">
              <span className="type-badge">{item.type}</span>
            </div>
            <div className="legend-name">{item.name}</div>
            <div className="legend-description">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegendTable; 