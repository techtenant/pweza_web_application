// src/App.js

import React, { useState } from 'react';
import { Button, Container, Paper, Typography, Box, Stepper, Step, StepLabel, TextField } from '@mui/material';

const samplePackageDetails = {
  id: '12345',
  sender: 'John Doe',
  recipient: 'Jane Smith',
  description: 'Documents',
  weight: '1 kg',
};

function PackageConfirmation() {
  const [activeStep, setActiveStep] = useState(0);
  const [issue, setIssue] = useState('');

  const steps = ['Arrive at Location', 'Confirm Details', 'Confirm Pickup/Report Issue'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirmPickup = () => {
    alert('Pickup Confirmed!');
  };

  const handleReportIssue = () => {
    alert(`Issue Reported: ${issue}`);
  };
  

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Typography>Arrive at the pickup location.</Typography>;
      case 1:
        return (
          <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6">Package Details</Typography>
            <Typography>ID: {samplePackageDetails.id}</Typography>
            <Typography>Sender: {samplePackageDetails.sender}</Typography>
            <Typography>Recipient: {samplePackageDetails.recipient}</Typography>
            <Typography>Description: {samplePackageDetails.description}</Typography>
            <Typography>Weight: {samplePackageDetails.weight}</Typography>
          </Paper>
        );
      case 2:
        return (
          <Box>
            <Button variant="contained" color="primary" onClick={handleConfirmPickup} sx={{ marginRight: 2 }}>
              Confirm Pickup
            </Button>
            <TextField
              label="Report Issue"
              variant="outlined"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <Button variant="contained" color="secondary" onClick={handleReportIssue}>
              Report Issue
            </Button>
          </Box>
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Container>
      <Box sx={{ width: '100%', marginTop: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ marginTop: 4 }}>
          {activeStep === steps.length ? (
            <Typography>All steps completed</Typography>
          ) : (
            <Box>
              {renderStepContent(activeStep)}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ ml: 'auto' }}
                  disabled={activeStep === steps.length - 1}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default PackageConfirmation;
