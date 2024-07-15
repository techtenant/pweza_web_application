import React, { useState } from 'react';
import { Container, Typography, Box,Button,TextField, Paper, Grid, Stepper, Step,TableContainer,TableHead,TableBody, TableCell,Table,TableRow,StepLabel } from '@mui/material';
import { getFromLocalStorage } from '../../../common/utils/LocalStorage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SizeIcon from '@mui/icons-material/Expand';  // Icon for size or expansion
import ColorIcon from '@mui/icons-material/Palette';  // Icon for color
import WeightIcon from '@mui/icons-material/LineWeight';  // Icon for weight or thickness
import ConditionIcon from '@mui/icons-material/Info';  // Icon for condition or information


const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#000',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
});
 
  //   orderId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //   riderId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //   assignedDate: '2024-07-04T17:15:37.470Z',
  //   deliveryDate: '2024-07-04T17:15:37.470Z',
  //   status: 0,
  //   sourceLocationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //   sourceLocation: {
  //     id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //     name: 'Source Location',
  //     latitude: 0,
  //     longitude: 0,
  //   },
  //   destinationLocationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //   destinationLocation: {
  //     id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //     name: 'Destination Location',
  //     latitude: 0,
  //     longitude: 0,
  //   },
  //   startTime: '2024-07-04T17:15:37.470Z',
  //   endTime: '2024-07-04T17:15:37.470Z',
  //   startLatitude: 0,
  //   startLongitude: 0,
  //   endLatitude: 0,
  //   endLongitude: 0,
  //   journeyStatus: 0,
  //   order: {
  //     id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //     userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //     orderDate: '2024-07-04T17:15:37.470Z',
  //     status: 0,
  //     orderDetails: [
  //       {
  //         productId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //         quantity: 1,
  //         product: {
  //           id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //           name: 'Sample Product',
  //           description: 'Sample Description',
  //           size: 'Medium',
  //           color: 'Black',
  //           weight: '1kg',
  //           condition: 'New',
  //           userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //         },
  //       },
  //     ],
  //   },
  //   payments: {
  //     userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //     amount: 199,
  //     paymentDate: '2024-07-04T17:15:37.470Z',
  //     mpesaReceiptNumber: 'MPESA123456',
  //     status: 'Completed',
  //     deliveryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //   },
  // };

function PackageConfirmation() {
  const [activeStep, setActiveStep] = useState(0);
  const payload = getFromLocalStorage("navigation-detail-row");
  const [issue, setIssue] = useState('');

  const steps = [
    { label: 'Confirm Location', icon: <LocationOnIcon /> },
    { label: 'Confirm Product Details', icon: <InfoIcon /> },
    { label: 'Confirm Delivery/Report Issue', icon: <CheckCircleIcon /> }
  ];
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirmDelivery = () => {
    alert('Delivery Confirmed!');
  };

  const handleReportIssue = () => {
    alert(`Issue Reported: ${issue}`);
  };


  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6">Delivery Location</Typography>
            <Typography>Source: Eldoret</Typography>
            <Typography>Destination: Meru</Typography>
          </Paper>
        );
      case 1:  
        return (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Product Details</Typography></TableCell>
                <TableCell><SizeIcon />Size</TableCell>
                <TableCell><ColorIcon />Color</TableCell>
                <TableCell><WeightIcon />Wight</TableCell>
                <TableCell><ConditionIcon />Condition</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {payload?.order.orderDetails.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.product.size}</TableCell>
                  <TableCell>{item.product.color}</TableCell>
                  <TableCell>{item.product.weight}</TableCell>
                  <TableCell>{item.product.condition}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        );
        case 2:
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button variant="contained" color="primary" onClick={handleConfirmDelivery} sx={{ marginBottom: 2 }}>
                Confirm Delivery
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
          return <Typography variant="body1">Unknown step</Typography>;
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
         Confirm Delivery
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Submitted on 12th May 2021
        </Typography>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2, width: '100%' }}>
          <Typography variant="h6">Product Details</Typography>
          <Typography>Requested products for the requisition.</Typography>
          <Box sx={{ padding: 2, marginTop: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Product:</strong> {payload.order.orderDetails[0].product.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Quantity:</strong> {payload.order.orderDetails[0].quantity}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Status:</strong> {payload.order.statusString}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Order Date:</strong> {payload.order.orderDate}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>       
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2, width: '100%' }}>
        <ThemeProvider theme={theme}>
        <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ width: '100%' }}>
          {steps.map((step, index) => (
           <Step key={index}>
           <StepLabel icon={step.icon}>{step.label}</StepLabel>
         </Step>
          ))}
        </Stepper>
        <Box sx={{ marginTop: 4,  width: '100%' }}>
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
                  sx={{ backgroundColor: '#FF4000', color: '#fff' }}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
    </ThemeProvider>
        </Paper>
      </Box>
    </Container>
   
  );
}

export default PackageConfirmation;
