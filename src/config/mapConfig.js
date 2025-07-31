
export const MAP_CONFIG = {
  GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyD_5EKwVhODsjcSHF2tGSR5weODZU00_k8",
  
  DEFAULT_CENTER: {
    lat: 21.0278, // Hà Nội
    lng: 105.8342
  },
  
  DEFAULT_ZOOM: 13,
  
  MAP_TYPES: {
    LEAFLET: 'leaflet',
    GOOGLE: 'google'
  }
};
