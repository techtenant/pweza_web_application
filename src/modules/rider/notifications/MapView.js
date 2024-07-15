import React, { useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  marginBottom: '20px'
};

const MapView = ({ source, destination }) => {
  const [response, setResponse] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapLoaded && !response) {
      calculateRoute();
    }
  }, [mapLoaded, response]);

  const calculateRoute = () => {
    if (!window.google || response) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: source.latitude, lng: source.longitude },
        destination: { lat: destination.latitude, lng: destination.longitude },
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
    <LoadScript
      googleMapsApiKey="AIzaSyAuWt5mMOgPSby9vFXFfti_LEDRuV97-Eg"
      onLoad={() => setMapLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: source.latitude, lng: source.longitude }}
        zoom={12}
      >
        <Marker position={{ lat: source.latitude, lng: source.longitude }} />
        {response && <DirectionsRenderer directions={response} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
