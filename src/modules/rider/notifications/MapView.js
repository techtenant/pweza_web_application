import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  marginBottom: '20px'
};

const center = {
  lat :-1.2921,
  lng:  36.8219
};

const destination = {
  lat:  -1.254337,
  lng: 36.681660
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
