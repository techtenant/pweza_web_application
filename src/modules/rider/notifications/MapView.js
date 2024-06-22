import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  marginBottom: '20px'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};

const destination = {
  lat: 40.730610,
  lng: -73.935242
};

const MapView = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!response) {
      calculateRoute();
    }
  }, [response]);

  const calculateRoute = () => {
    if (response) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: center,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setResponse(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAuWt5mMOgPSby9vFXFfti_LEDRuV97-Eg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
        {response && (
          <DirectionsRenderer
            directions={response}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
