import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const LocationButton = ({ onLocationFound }) => {
  const map = useMap();
  const [isLoading, setIsLoading] = useState(false);

  const findMyLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const position = [pos.coords.latitude, pos.coords.longitude];
        map.setView(position, 15, { animate: true });
        onLocationFound(position);
        setIsLoading(false);
      },
      (err) => {
        console.error("Không lấy được vị trí:", err);
        alert("Không thể lấy vị trí hiện tại. Vui lòng kiểm tra quyền truy cập vị trí.");
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true, 
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    const locationControl = L.control({ position: 'topright' });
    
    locationControl.onAdd = () => {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      div.innerHTML = `
        <button 
          style="
            background: white;
            border: none;
            width: 30px;
            height: 30px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            border-radius: 2px;
            box-shadow: 0 1px 5px rgba(0,0,0,0.4);
          "
          title="Tìm vị trí của tôi"
        >
          ${isLoading ? '⌛' : '📍'}
        </button>
      `;
      
      div.onclick = findMyLocation;
      return div;
    };

    locationControl.addTo(map);

    return () => {
      locationControl.remove();
    };
  }, [map, isLoading]);

  return null;
};

const UserLocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [showMarker, setShowMarker] = useState(false);

  const handleLocationFound = (pos) => {
    setPosition(pos);
    setShowMarker(true);
  };

  return (
    <>
      <LocationButton onLocationFound={handleLocationFound} />
      {showMarker && position ? (
        <Marker position={position}>
          <Popup>Vị trí hiện tại của bạn</Popup>
        </Marker>
      ) : null}
    </>
  );
};

export default UserLocationMarker;
