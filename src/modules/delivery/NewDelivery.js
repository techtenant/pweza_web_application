import clsx from 'clsx';
import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent as MuiCardContent,
  CircularProgress,
  Grid,
  Select,
  StepConnector,
  MenuItem,
  FormControl,
  Stepper, Step, StepLabel,
  FormLabel,
  useTheme,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { spacing } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  getBikes
} from "../../common/apis/bike";
import {
    getPackages
  } from "../../common/apis/packages";
import {
  postDelivery, updateDelivery
} from "../../common/apis/delivery";
import Paper from "@mui/material/Paper";
import "react-toastify/dist/ReactToastify.min.css";
import PublishIcon from '@mui/icons-material/Publish';
import { Person, LocationOn, CheckCircle, ArrowBack,ArrowForward } from '@mui/icons-material';
import { getFromLocalStorage } from '../../common/utils/LocalStorage';


const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const mapStyles = [
  {
    "featureType": "water",
    "stylers": [
      { "saturation": 43 },
      { "lightness": -11 },
      { "hue": "#0088ff" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      { "hue": "#ff0000" },
      { "saturation": -100 },
      { "lightness": 99 }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      { "color": "#808080" },
      { "lightness": 54 }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#ece2d9" }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#ccdca1" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#767676" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      { "color": "#ffffff" }
    ]
  },
  /* Add more styles as needed */
];


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient(95deg, rgba(255, 107, 107,1) 0%, rgba(255, 158, 107,1) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient(95deg, rgba(255, 107, 107,1) 0%, rgba(255, 158, 107,1) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
}));

// Icons for each step
const useColorlibStepIconStyles = styled({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient(136deg, rgba(255, 107, 107,1) 0%, rgba(255, 158, 107,1) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient(136deg, rgba(255, 107, 107,1) 0%, rgba(255, 158, 107,1) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <Person />,
    2: <LocationOn />,
    3: <PublishIcon />,
    4: <CheckCircle />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}
const steps = ['Basic Details', 'Address', 'Submit Application'];

const containerStyle = {
    width: '800px',
    height: '600px'
};

const center = {
    lat: 1.2921,
    lng: 36.8219
};

const NewDelivery = () => {
  const row = getFromLocalStorage("applications-detail-row") || {}
  const account = getFromLocalStorage("user") || {}
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  let { id } = useParams();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(0);
  const [cost, setCost] = useState(0);




  const handleMapClick = async (event) => {
    const location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
    };
    
    if (!source) {
        setSource(location);
        formik.setFieldValue('sourceAddress', `${location.lat},${location.lng}`);
    } else {
        setDestination(location);
        formik.setFieldValue('destinationAddress', `${location.lat},${location.lng}`);
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
      formik.setFieldValue('distance', dist);
      calculateCost(dist);
  };

  const calculateCost = (distance) => {
      const ratePerKm = 2; // Define your cost per kilometer      
      setCost(distance * ratePerKm);
      formik.setFieldValue('cost', distance * ratePerKm);
  };

  const postMutation = useMutation({ mutationFn: postDelivery });
  const updateMutation = useMutation({ mutationFn: updateDelivery });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      formik.handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const { data: bikeData} = useQuery({
    queryKey: 'getBikes',
    queryFn: getBikes,

  });

  const { data: packageData, isLoading, error } = useQuery({
    queryKey: 'getPackages',
    queryFn: getPackages,

  });
  const formik = useFormik({

    initialValues: {
      userId: row?.userId || account.id,
      riderId: row?.riderId || account.id,
      bikeId: row?.bikeId || "",
      distance: row?.distance || 0,
      cost: row?.cost || 0,
      packageId: row?.packageId || "",
      sourceAddress: row?.sourceAddress || "",
      destinationAddress: row?.destinationAddress || "",
      status: row?.status || "pending payment"
    },
    validationSchema: Yup.object().shape({
      packageId: Yup.string().required("Required"),
      bikeId: Yup.string().required("Required"),      
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      console.log(values);
      try {
console.log("values",values);
        if (row?.id) {
          values.id = row.id;

          await updateMutation.mutateAsync(values);

        } else {

          await postMutation.mutateAsync(values);

        }
        toast.success("Successfully Added a new Delivey", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: handleToastClose,
        });
      } catch (error) {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
  });

  const handleToastClose = () => {
    navigate("/pweza/delivery");

  };
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Grid
              container
              spacing={5}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >


              <Grid item sm={6}>
                <FormControl sx={{ m: 1, width: "100%", marginBottom: "5px" }} size="medium">
                  <FormLabel
                    style={{
                      fontSize: "16px",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    Bike
                  </FormLabel>
                  <Select
                    name="bikeId"
                    label="bikeId"
                    value={formik.values.bikeId}
                    error={Boolean(formik.touched.bikeId && formik.errors.bikeId)}
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    sx={{
                      marginTop: 2,
                      '& legend': { display: 'none' },
                      '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }
                    }}
                    my={2}
                  >
                    {bikeData?.data?.map((bikeType) => (
                                    <MenuItem key={bikeType.id} value={bikeType.id}>
                                        {bikeType.model}
                                    </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              </Grid>
              <Grid
              container
              spacing={5}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item sm={6}>
                <FormControl sx={{ m: 1, width: "100%", marginBottom: "5px" }} size="medium">
                  <FormLabel
                    style={{
                      fontSize: "16px",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    Package
                  </FormLabel>
                  <Select
                    name="packageId"
                    label="packageId"
                    value={formik.values.packageId}
                    error={Boolean(formik.touched.packageId && formik.errors.packageId)}
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    sx={{
                      marginTop: 2,
                      '& legend': { display: 'none' },
                      '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }
                    }}
                    my={2}
                  >
                    {packageData?.data?.map((packaged) => (
                                    <MenuItem key={packaged.id} value={packaged.id}>
                                        {packaged.type}
                                    </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box style={{ maxWidth: '100%', margin: 'auto', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
    <LoadScript googleMapsApiKey="AIzaSyAATO2CjK3qI-fH-tMchgsQMI9oaOt2Tc0">
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={7}
            options={{
                styles: mapStyles, // your custom map style array
                disableDefaultUI: true, // disable default map UI
                zoomControl: true, // add zoom control
                mapTypeControl: true, // add map type control
            }}
            onClick={handleMapClick}
        >
            {source && <Marker position={source} label="S" icon={{path: MyLocationIcon,scale: 7, fillColor: '#1976d2', fillOpacity:1,strokeWeight:2}} />}
            {destination && <Marker position={destination} label="D" icon={{path: LocationOnIcon,scale: 7, fillColor: '#ff4081', fillOpacity:1,strokeWeight:2}} />}
        </GoogleMap>
    </LoadScript>
    <Box mt={2} style={{ textAlign: 'center' }}>
        <Typography variant="h6" style={{ margin: '10px 0' }}>Distance: <strong>{distance.toFixed(2)} km</strong></Typography>
        <Typography variant="h6" style={{ margin: '10px 0' }}>Cost: <strong>${cost.toFixed(2)}</strong></Typography>
    </Box>
    <Button 
        variant="contained" 
        color="primary" 
        onClick={() => { setSource(null); setDestination(null); setDistance(0); setCost(0); }}
        style={{ display: 'block', margin: '20px auto' }}
    >
        Reset
    </Button>
</Box>

        );
      case 2:
        return (
          <Box>
            
          </Box>
        );
      default:
        return <div>Unknown Step</div>;
    }
  };


  return (
    <React.Fragment>
      <ToastContainer />

      <Grid container spacing={3} alignItems="stretch" >
        <Grid item md={12} style={{ display: "flex", width: "100%" }}>
          <Paper
            square={true}
            sx={{
              borderTop: 5,
              borderColor: "#4ab7e0",
              width: "100%",
              px: 3,
              py: 5,
            }}
            elevation={8}
          >
            <Grid
              item
              xs={12}
              md={6}
              sm={6}
              sx={{ padding: "10px", textAlign: "left" }}
            >
              <Typography
                gutterBottom
                sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
              >
                Application
              </Typography>
              <Typography gutterBottom>Add New Delivery details below</Typography>
            </Grid>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <form onSubmit={formik.handleSubmit}>
              <Card mb={12}>
                <CardContent>
                  {formik.isSubmitting ? (
                    <Box display="flex" justifyContent="center" my={6}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <>

                      {renderStepContent(activeStep)}
                      <div>
                      <Grid item xl={12} xs={12} md={12} sx={{marginTop:'50px'}}>
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Button
                              variant="contained"
                              sx={{
                                fontSize: '14px',
                                fontWeight: 'bolder',
                                backgroundColor: '#333333',
                              }}
                              startIcon={<ArrowBack />}
                              disabled={activeStep === 0} 
                              onClick={handleBack}
                              
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                fontSize: "14px",
                                fontWeight: "bolder",
                                backgroundColor: "#333333",
                                "&:hover": {
                                  background: "#E19133",
                                  color: "white",
                                },
                              }}
                              startIcon={<ArrowForward />}
                              onClick={handleNext}
                              type={activeStep === steps.length - 1 ? 'submit' : 'button'}
                            >
                             {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                          </Grid>
                        </Grid>
                      
                      
                      </div>
                      
                    </>
                  )}
                </CardContent>
              </Card>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default NewDelivery;
