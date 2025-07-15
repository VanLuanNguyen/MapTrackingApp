import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import UserLocationMarker from "./UserLocationMarker";
import MapAutoZoom from "./MapAutoZoom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

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

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '80vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m, index) => (
        <Marker key={index} position={[m.lat, m.lng]} icon={emojiIcon("📍")}> 
          <Popup >Truy cập lúc: {new Date(m.accessedAt).toLocaleString()}</Popup>
        </Marker>
      ))}
      <MapAutoZoom markers={markers} />
      <UserLocationMarker />
    </MapContainer>
  );
};

export default MapView;
