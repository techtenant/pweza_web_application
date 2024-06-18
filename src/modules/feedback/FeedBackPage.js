import React, { useState } from 'react';
import { Button, TextField, Rating, Grid, CircularProgress, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Download } from '@mui/icons-material';


// Custom styles for the form elements
const PurpleButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

const PurpleRadio = styled(Radio)(({ theme }) => ({
    color: orange[400],
    '&.Mui-checked': {
        color: orange[600],
    },
}));

const PurpleDownload = styled(Download)(({ theme }) => ({
    color: orange[500],
}));

// The main component for the feedback form
const FeedbackForm = () => {
    // State variables for the form inputs
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [firstTime, setFirstTime] = React.useState('Yes');
    const [reason, setReason] = React.useState('');
    const [found, setFound] = React.useState('');
    const [userFriendly, setUserFriendly] = React.useState('');
    const [rating, setRating] = useState(2.5);

    const [loading, setLoading] = useState(false);

    // Handlers for the form inputs
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleFirstTimeChange = (event) => {
        setFirstTime(event.target.value);
    };

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleFoundChange = (event) => {
        setFound(event.target.value);
    };

    const handleUserFriendlyChange = (event) => {
        setUserFriendly(event.target.value);
    };



    const handleSubmit = (event) => {
        // Prevent the default browser behavior
        event.preventDefault();
        setLoading(true);

        const feedbackdata = {
            name, email, firstTime, reason, found, userFriendly

        };

    };

    // The JSX for the form elements
    return (
        <Grid container alignItems="stretch">
            <Grid item md={12} style={{ display: "flex", marginTop: "50px", marginLeft: "50px", marginRight: "50px", width: "100%" }}>
                <form onSubmit={handleSubmit} style={{ width: '800px', height: '100%', margin: 'auto', padding: '20px', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h4" style={{ color: orange[500] }}>
                            Feedback Form
                        </Typography>
                        <PurpleButton variant="contained" startIcon={<PurpleDownload />}>
                            Download
                        </PurpleButton>
                    </div>
                    <TextField
                        required
                        label="Enter your Full Name"
                        value={name}
                        onChange={handleNameChange}
                        style={{ width: '100%', marginTop: '20px' }}
                    />
                    <TextField
                        required
                        label="Your Email address"
                        value={email}
                        onChange={handleEmailChange}
                        style={{ width: '100%', marginTop: '20px' }}
                    />
                    <FormControl component="fieldset" style={{ marginTop: '20px' }}>
                        <FormLabel component="legend">Is this the first time using our services?</FormLabel>
                        <RadioGroup row value={firstTime} onChange={handleFirstTimeChange}>
                            <FormControlLabel value="Yes" control={<PurpleRadio />} label="Yes" />
                            <FormControlLabel value="No" control={<PurpleRadio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        required
                        label="What is the PRIMARY reason for your decision to use our services?"
                        multiline
                        rows={4}
                        value={reason}
                        onChange={handleReasonChange}
                        style={{ width: '100%', marginTop: '20px' }}
                    />
                    <TextField
                        required
                        label="Did we meet your expectations?"
                        multiline
                        rows={2}
                        value={found}
                        onChange={handleFoundChange}
                        style={{ width: '100%', marginTop: '20px' }}
                    />
                    <TextField
                        required
                        label="Was the site easy to navigate and fast processing of your application"
                        multiline
                        rows={2}
                        value={userFriendly}
                        onChange={handleUserFriendlyChange}
                        style={{ width: '100%', marginTop: '20px' , marginBottom: '20px'}}
                    />
                    <FormControl fullWidth>
                        <FormLabel component="legend">Rate Your Experience</FormLabel>
                        <Rating
                            name="experience-rating"
                            value={rating}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </FormControl>
                    <PurpleButton type="submit" variant="contained" disabled={loading}
                        fullWidth
                        sx={{
                            height: 48,
                            '@media (min-width: 600px)': {
                                width: '50%',

                            }
                        }} style={{ width: '100%', marginTop: '20px' }}>
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            ' Submit Feedback'
                        )}

                    </PurpleButton>

                </form>
            </Grid>
        </Grid>

    );
};

export default FeedbackForm;
