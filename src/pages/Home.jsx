import React from 'react';
import { Button, Typography, Grid } from '@mui/material';

const Home = () => {
  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to Our Store
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary">
            Shop Now
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
