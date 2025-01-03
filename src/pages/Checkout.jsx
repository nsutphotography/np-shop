import React from 'react';
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';

const Checkout = () => {
  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6">Shipping Information</Typography>
            <TextField fullWidth label="Name" margin="normal" />
            <TextField fullWidth label="Address" margin="normal" />
            <TextField fullWidth label="Email" margin="normal" />
            <TextField fullWidth label="Phone Number" margin="normal" />
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Complete Purchase
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
