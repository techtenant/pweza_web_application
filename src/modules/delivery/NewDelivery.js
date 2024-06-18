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
    lat: -3.745,
    lng: -38.523
};

const NewDelivery = () => {
  const row = getFromLocalStorage("applications-detail-row") || {}
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  let { id } = useParams();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
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
      userId: row?.userId || "",
      riderId: row?.riderId || "",
      bikeId: row?.bikeId || "",
      distance: row?.distance || "",
      cost: row?.cost || "",
      packageId: row?.packageId || "",
      sourceAddress: row?.sourceAddress || "",
      destinationAddress: row?.destinationAddress || "",
    },
    validationSchema: Yup.object().shape({
      destinationAddress: Yup.string().required("Required"),
      sourceAddress: Yup.string().required("Required"),
      packageId: Yup.string().required("Required"),
      bikeId: Yup.string().required("Required"),      
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      console.log(values);
      try {

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
      case 2:
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
                <FormControl
                  sx={{ m: 1, width: "100%", marginBottom: "5px" }}
                  size="medium"
                >
                  <FormLabel
                    style={{
                      fontSize: "16px",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >Distance</FormLabel>
                  <TextField
                    name="distance"
                    label="distance"
                    value={formik.values.distance}
                    error={Boolean(
                      formik.touched.distance && formik.errors.distance
                    )}
                    fullWidth
                    helperText={
                      formik.touched.distance && formik.errors.distance
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    variant="outlined"
                    disabled={id != undefined}
                    sx={{
                      marginTop: 2,
                      '& legend': { display: 'none' },
                      '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }

                    }}
                    my={2}
                  />
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
                <FormControl
                  sx={{ m: 1, width: "100%", marginBottom: "5px" }}
                  size="medium"
                >
                  <FormLabel
                    style={{
                      fontSize: "16px",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >Cost</FormLabel>
                  <TextField
                    name="cost"
                    label="cost"
                    value={formik.values.cost}
                    error={Boolean(
                      formik.touched.cost && formik.errors.cost
                    )}
                    fullWidth
                    helperText={
                      formik.touched.cost && formik.errors.cost
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    variant="outlined"
                    disabled={id != undefined}
                    sx={{
                      marginTop: 2,
                      '& legend': { display: 'none' },
                      '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }

                    }}
                    my={2}
                  />
                </FormControl>
              </Grid>


            </Grid>
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
