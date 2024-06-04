import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Avatar, Typography, Button, TextField, Grid, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Input = styled('input')({
  display: 'none',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  marginTop: '50px',
  marginLeft: '50px',
  marginRight: '50px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: '20px',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '15px',
  },
});

const UserAccount = () => {
  const [userProfile, setUserProfile] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    city: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={3}>
        <Input accept="image/*" id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>U</Avatar>
        <Typography component="h1" variant="h5">
          {userProfile.firstName || 'User Name'}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 3, width: '100%' }}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={userProfile.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              value={userProfile.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userProfile.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              variant="outlined"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="tel"
              value={userProfile.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              variant="outlined"
              required
              fullWidth
              id="state"
              label="State"
              name="state"
              autoComplete="address-level1"
              value={userProfile.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              variant="outlined"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="address-level2"
              value={userProfile.city}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
        >
          Save Changes
        </StyledButton>
      </StyledPaper>
    </Grid>
  );
};

export default UserAccount;
