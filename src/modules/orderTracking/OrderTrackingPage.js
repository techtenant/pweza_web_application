import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Stepper, Step, StepLabel, StepIcon } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'; // Example icon for steps
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 64px)', // Adjust for AppBar height if applicable
};

const initialCenter = {
  lat: -1.2921, // Kenya latitude
  lng: 36.8219, // Kenya longitude
};

const OrderTrackingPage = () => {
  const [trackingData, setTrackingData] = useState({
    lat: initialCenter.lat,
    lng: initialCenter.lng,
  });

  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Order Placed', 'In Transit', '10-Minute Arrival Notification', 'Delivered'];

  // Icons for each step
  const stepIcons = [
    <DirectionsWalkIcon />, // Example icon for 'Order Placed'
    <LocalShippingIcon />, // Example icon for 'In Transit'
    <NotificationsActiveIcon />, // Example icon for '10-Minute Arrival Notification'
    <DeliveryDiningIcon />, // Example icon for 'Delivered'
  ];

  // Simulating dynamic data update and status progression
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevActiveStep) => {
        // Move to the next step
        if (prevActiveStep < steps.length - 1) {
          return prevActiveStep + 1;
        } else {
          // Reset to the first step after reaching the last step
          return 0;
        }
      });
    }, 5000); // Update status every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <Grid container alignItems="stretch">
            <Grid item md={12} style={{ display: "flex", marginTop: "50px", marginLeft: "50px", marginRight: "50px", width: "100%" }}>

      <Container>
      <Grid container spacing={2}>
        {/* Status Updates Column */}
        <Grid item xs={12} sm={4}>
          <Paper sx={{ padding: 2, height: '100%', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Status Updates
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ background: 'transparent' }}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={() => stepIcons[index]} style={{
                    color: activeStep === index ? '#1976d2' : '#bdbdbd', // Active step in blue, others in grey
                    fontWeight: activeStep === index ? 'bold' : 'normal', // Bold for active step
                  }}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        {/* Map Column */}
        <Grid item xs={12} sm={8}>
          <Paper sx={{ padding: 2, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Order Tracking
            </Typography>
            <LoadScript googleMapsApiKey="AIzaSyAATO2CjK3qI-fH-tMchgsQMI9oaOt2Tc0">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{ lat: trackingData.lat, lng: trackingData.lng }}
                zoom={6}
              >
                <Marker position={{ lat: trackingData.lat, lng: trackingData.lng }} />
              </GoogleMap>
            </LoadScript>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Contact Support
        </Button>
        <Button variant="contained" color="primary">
          View Order Details
        </Button>
      </div>
    </Container>
</Grid>
</Grid>
  );
};

export default OrderTrackingPage;
