import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapAutoZoom = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers && markers.length > 0) {
      const { lat, lng } = markers[0];
      map.setView([lat, lng], 14, { animate: true });
    }
  }, [markers, map]);

  return null;
};

export default MapAutoZoom;
