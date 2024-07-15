import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box, Button, Typography, TextField } from '@mui/material';

const containerStyle = {
    width: '800px',
    height: '600px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const Map = () => {
    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);
    const [distance, setDistance] = useState(0);
    const [cost, setCost] = useState(0);

    const handleMapClick = (event) => {
        const location = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        if (!source) {
            setSource(location);
        } else {
            setDestination(location);
            calculateDistance(source, location);
        }
    };

    const calculateDistance = (source, destination) => {
        const radlat1 = Math.PI * source.lat / 180;
        const radlat2 = Math.PI * destination.lat / 180;
        const theta = source.lng - destination.lng;
        const radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515 * 1.609344; // Distance in kilometers
        setDistance(dist);
        calculateCost(dist);
    };

    const calculateCost = (distance) => {
        const ratePerKm = 2; // Define your cost per kilometer
        setCost(distance * ratePerKm);
    };

    return (
        <Box>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onClick={handleMapClick}
                >
                    {source && <Marker position={source} label="S" />}
                    {destination && <Marker position={destination} label="D" />}
                </GoogleMap>
            </LoadScript>
            <Box mt={2}>
                <Typography variant="h6">Distance: {distance.toFixed(2)} km</Typography>
                <Typography variant="h6">Cost: ${cost.toFixed(2)}</Typography>
            </Box>
            <Button onClick={() => { setSource(null); setDestination(null); setDistance(0); setCost(0); }}>Reset</Button>
        </Box>
    );
};

export default Map;
