import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography, Paper } from '@mui/material';
import MapView from './MapView';

const NavigationPage = () => {
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState('');
  const navigate = useNavigate();

  const handleStartNavigation = () => {
    setNavigationStarted(true);
    setEstimatedTime('15 minutes'); // Simulating the estimated time for demo purposes
  };

  const handleNavigate = (id) => {
    navigate(`/pweza/confirmation`);
}

  useEffect(() => {
    if (navigationStarted) {
      const timer = setTimeout(() => {
        alert('You have arrived at the pickup location.');
      }, 15000); // Simulate arrival after 15 seconds
      return () => clearTimeout(timer);
    }
  }, [navigationStarted]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Navigate to Pickup Location
        </Typography>
        <MapView />
        <Box display="flex" justifyContent="center" my={2}>
          <Button variant="contained" color="primary" onClick={handleStartNavigation} sx={{ px: 4, py: 2 }}>
            Start Navigation
          </Button>
        </Box>
        {navigationStarted && (
          <Box textAlign="center" my={2}>
            <Typography variant="h6">Following the Route...</Typography>
            <Typography variant="body1">Estimated time to destination: {estimatedTime}</Typography>
          </Box>
        )}
      </Paper>
      <Button variant="contained" color="primary" onClick={handleNavigate} >
           confirm product
          </Button>
    </Container>
  );
};

export default NavigationPage;
