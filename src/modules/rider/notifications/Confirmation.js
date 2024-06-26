import React, { useState } from 'react';
import { Button, Container, Paper, Typography, Box, Stepper, Step, StepLabel, TextField } from '@mui/material';

const sampleProductDetails = {
  id: '98765',
  name: 'Wireless Headphones',
  brand: 'SoundMax',
  description: 'Noise-cancelling wireless headphones',
  price: '$199',
};

function PackageConfirmation() {
  const [activeStep, setActiveStep] = useState(0);
  const [issue, setIssue] = useState('');

  const steps = ['Confirm Location', 'Confirm Product Details', 'Confirm Purchase/Report Issue'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirmPurchase = () => {
    alert('Purchase Confirmed!');
  };

  const handleReportIssue = () => {
    alert(`Issue Reported: ${issue}`);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Typography>Confirm your location.</Typography>;
      case 1:
        return (
          <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6">Product Details</Typography>
            <Typography>ID: {sampleProductDetails.id}</Typography>
            <Typography>Name: {sampleProductDetails.name}</Typography>
            <Typography>Brand: {sampleProductDetails.brand}</Typography>
            <Typography>Description: {sampleProductDetails.description}</Typography>
            <Typography>Price: {sampleProductDetails.price}</Typography>
          </Paper>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant="contained" color="primary" onClick={handleConfirmPurchase} sx={{ marginBottom: 2 }}>
              Confirm Purchase
            </Button>
            <TextField
              label="Report Issue"
              variant="outlined"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              sx={{ marginBottom: 2, width: '100%' }}
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ width: '100%', maxWidth: 400 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ marginTop: 4, maxWidth: 400, width: '100%' }}>
          {activeStep === steps.length ? (
            <Typography variant="h6">All steps completed</Typography>
          ) : (
            <Box>
              {renderStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
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
