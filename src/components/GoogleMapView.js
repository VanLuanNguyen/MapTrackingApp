import React, { useEffect, useRef, useState } from 'react';

const GoogleMapView = ({ markers = [], apiKey = "" }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const typeToEmoji = {
    1: "📍",  
    2: "🚩", 
    3: "🏳️",  
    4: "⛿",  
    5: "🏴󠁶󠁵󠁭󠁡󠁰󠁿",  
  };

  // Load Google Maps API
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
      };
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
    }
  }, [apiKey]);

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const defaultCenter = { lat: 21.0278, lng: 105.8342 }; // Hà Nội
    const center = markers.length > 0 
      ? { lat: markers[0].lat, lng: markers[0].lng }
      : defaultCenter;

    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: 13,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    mapInstanceRef.current = map;
  }, [mapLoaded, markers]);

  // Update markers
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];

    // Add new markers
    markers.forEach((markerData, index) => {
      const emoji = typeToEmoji[markerData.type] || "📍";
      
      const marker = new window.google.maps.Marker({
        position: { lat: markerData.lat, lng: markerData.lng },
        map: mapInstanceRef.current,
        title: markerData.title,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
              <text x="0" y="24" font-size="24">${emoji}</text>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(32, 32)
        }
      });


      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; min-width: 200px;">
            <div style="font-weight: bold; margin-bottom: 8px;">${markerData.title}</div>
            <div style="margin-bottom: 4px;">Thời gian: ${new Date(markerData.recordDate).toLocaleString()}</div>
            <div style="margin-bottom: 4px;">Loại: ${markerData.type}</div>
            ${markerData.link ? `
              <div style="margin-top: 8px;">
                <a href="${markerData.link}" target="_blank" rel="noopener noreferrer" 
                   style="color: #1976d2; text-decoration: none;">
                  Xem chi tiết
                </a>
              </div>
            ` : ''}
          </div>
        `
      });

      // Add click listener
      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });

    // Auto zoom to fit all markers
    if (markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach(markerData => {
        bounds.extend({ lat: markerData.lat, lng: markerData.lng });
      });
      mapInstanceRef.current.fitBounds(bounds);
    }
  }, [markers, mapLoaded]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height: '100%', 
        width: '100%',
        backgroundColor: '#f0f0f0'
      }}
    >
      {!mapLoaded && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: '#666'
        }}>
          Đang tải bản đồ...
        </div>
      )}
    </div>
  );
};

export default GoogleMapView; 