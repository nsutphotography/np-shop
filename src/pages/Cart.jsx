import React from 'react';
import { Typography, Grid, Button, Paper } from '@mui/material';

const Cart = () => {
  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Your Cart
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" align="center">
              Your cart is empty.
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary">
                  Shop Now
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;
