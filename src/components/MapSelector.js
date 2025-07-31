import React, { useState } from 'react';
import MapView from './MapView';
import GoogleMapView from './GoogleMapView';

const MapSelector = ({ markers = [], googleApiKey = "" }) => {
  const [selectedMap, setSelectedMap] = useState('leaflet'); // 'leaflet' hoặc 'google'

  const handleMapChange = (mapType) => {
    setSelectedMap(mapType);
  };

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      {/* Map Type Selector */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1000,
          background: 'white',
          borderRadius: 8,
          padding: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          border: '1px solid #e0e0e0',
        }}
      >
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={() => handleMapChange('leaflet')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #b0c4de',
              background: selectedMap === 'leaflet' ? '#2d3a4b' : '#fff',
              color: selectedMap === 'leaflet' ? '#fff' : '#666',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (selectedMap !== 'leaflet') {
                e.target.style.background = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedMap !== 'leaflet') {
                e.target.style.background = '#fff';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 14 }}>🗺️</span>
              Leaflet
            </div>
          </button>
          
          <button
            onClick={() => handleMapChange('google')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #b0c4de',
              background: selectedMap === 'google' ? '#2d3a4b' : '#fff',
              color: selectedMap === 'google' ? '#fff' : '#666',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (selectedMap !== 'google') {
                e.target.style.background = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedMap !== 'google') {
                e.target.style.background = '#fff';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 14 }}>🌍</span>
              Google
            </div>
          </button>
        </div>
      </div>

      {/* Map Display */}
      <div style={{ height: '100%', width: '100%' }}>
        {selectedMap === 'leaflet' ? (
          <MapView markers={markers} />
        ) : (
          <GoogleMapView markers={markers} apiKey={googleApiKey} />
        )}
      </div>

      {/* Map Info */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 6,
          padding: '6px 12px',
          fontSize: 12,
          color: '#666',
          border: '1px solid #e0e0e0',
        }}
      >
        {selectedMap === 'leaflet' ? (
          <span>🗺️ OpenStreetMap (Leaflet)</span>
        ) : (
          <span>🌍 Google Maps</span>
        )}
      </div>
    </div>
  );
};

export default MapSelector; 