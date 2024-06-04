import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';


import { AccountDetailsForm } from './AccountDetailsForm';
import { AccountInfo } from './AccountInfo';



export default function Page() {
  return (
    <Grid container alignItems="stretch">
    <Grid item md={12} style={{ display: "flex", marginTop: "50px", marginLeft: "50px", marginRight: "50px", width: "100%" }}>
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Account</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm />
        </Grid>
      </Grid>
    </Stack>
    </Grid>
    </Grid>
  );
}
