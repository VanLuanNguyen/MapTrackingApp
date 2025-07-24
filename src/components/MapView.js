import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import MapAutoZoom from "./MapAutoZoom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const typeToEmoji = {
  1: "📍",  
  2: "🚩", 
  3: "🏳️",  
  4: "⛿",  
  5: "🏴󠁶󠁵󠁭󠁡󠁰󠁿",  
};

const emojiIcon = (emoji = "📍") =>
  L.divIcon({
    className: "emoji-marker",
    html: `<span style="font-size: 20px;">${emoji}</span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

const MapView = ({ markers = [] }) => {
  const [mapCenter, setMapCenter] = useState([21.0278, 105.8342]); // mặc định Hà Nội

  useEffect(() => {
    if (markers.length > 0) {
      setMapCenter([markers[0].lat, markers[0].lng]);
    }
  }, [markers]);

  console.log("Markers nhận được ở MapView:", markers);

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m, index) => (
        <Marker key={index} position={[m.lat, m.lng]} icon={emojiIcon(typeToEmoji[m.type] || "📍")}>
          <Popup>
            <div>
              <div><b>{m.title}</b></div>
              <div>Thời gian: {new Date(m.recordDate).toLocaleString()}</div>
              <div>Loại: {m.type}</div>
              {m.link && (
                <div>
                  <a href={m.link} target="_blank" rel="noopener noreferrer">
                    Xem chi tiết
                  </a>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      <MapAutoZoom markers={markers} />
    </MapContainer>
  );
};

export default MapView;
