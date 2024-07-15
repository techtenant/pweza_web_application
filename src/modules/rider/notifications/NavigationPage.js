import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography, Paper, List, ListItem, ListItemText, Divider,Grid } from '@mui/material';
import MapView from './MapView';
import { getFromLocalStorage } from '../../../common/utils/LocalStorage';

const NavigationPage = () => {
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [arrivalConfirmed, setArrivalConfirmed] = useState(false);
  const navigationData = getFromLocalStorage("navigation-detail-row");


  console.log("navigationData",navigationData);

  const navigate = useNavigate();

  const handleStartNavigation = () => {
    setNavigationStarted(true);
    setEstimatedTime('15 minutes'); // Simulating the estimated time for demo purposes
  };

  const handleNavigate = (id) => {
    navigate(`/pweza/confirmation`);
  };

  const sourceLocation = {
    name: "Meru",
    latitude: 0.0514721,
    longitude: 37.6456042
  };
  
  const destinationLocation = {
    name: "Eldoret",
    latitude: 0.5142774999999999,
    longitude: 35.2697802
  };

  useEffect(() => {
    if (navigationStarted) {
      const timer = setTimeout(() => {
        alert('You have arrived at the pickup location.');
        setArrivalConfirmed(true);
      }, 1500); // Simulate arrival after 15 seconds
      return () => clearTimeout(timer);
    }
  }, [navigationStarted]);

  return (
    <Grid container alignItems="stretch">
                <Grid item md={12} style={{ marginTop: "50px", marginLeft: "50px", marginRight: "50px", width: "100%" }}>
    <Container maxWidth="lg" sx={{ display: 'flex', py: 4 }}>
      <Box sx={{ width: '30%', pr: 4 }}>
        <Button variant="contained"  disabled={!arrivalConfirmed} onClick={handleNavigate} color="primary" sx={{ mb: 2, width: '100%' }}>
          Confirm Product
        </Button>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Source
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
           {sourceLocation?.name}
          </Typography>
          <Box sx={{ my: 2 }}>
            <Typography variant="body2" gutterBottom>
              Destination
            </Typography>
            <Typography variant="h4">{destinationLocation?.name}</Typography>
          </Box>
          <List>
            <ListItem>
              <ListItemText primary="Arrived" secondary="Jun 27, 2024 12:22 AM" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Out for delivery" secondary="Jun 26, 2024 11:57 PM" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Tracking number created" secondary="Jun 26, 2024 10:10 PM" />
            </ListItem>
          </List>
        </Paper>
      </Box>
      <Box sx={{ width: '70%' }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Navigate to Pickup Location
          </Typography>
          <MapView source={sourceLocation} destination={destinationLocation}/>
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
      
      </Box>
    </Container>
    </Grid>
    </Grid>
  );
};

export default NavigationPage;
