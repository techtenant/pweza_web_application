import React, { useState , useEffect} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import { getFromLocalStorage, setLocalStorage } from '../../common/utils/LocalStorage';
import { updateProfile } from '../../common/apis/account';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function AccountDetailsForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userName: '',

  })

  // Fetch user data from local storage on component mount
  useEffect(() => {
    const storedAccount = getFromLocalStorage('user');
    if (storedAccount) {
      setFormData(storedAccount);
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
      toast.success('User details updated successfully');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call API to update account details
      
      await updateMutation.mutateAsync(formData);
      // Update local storage with new data
      setLocalStorage('user', formData);

      // Optionally, show success message or redirect
      console.log('Details updated successfully!');
    } catch (error) {
      console.error('Error updating details:', error);
      // Handle error state or show error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your card and form structure */}
      {/* Assuming Card, CardHeader, Divider, CardContent, Grid, FormControl, InputLabel, OutlinedInput, CardActions, and Button are imported properly */}
     <ToastContainer/>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="firstName">First name</InputLabel>
                <OutlinedInput
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  label="First name"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="lastName">Last name</InputLabel>
                <OutlinedInput
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  label="Last name"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="lastName">User Name</InputLabel>
                <OutlinedInput
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  label="User Name"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  label="Email address"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="phone">Phone number</InputLabel>
                <OutlinedInput
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  label="Phone number"
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" color="primary">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

