import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not logged in');
        }

        const response = await axios.get('http://localhost:3000/addresses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAddresses(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching addresses:', err);
        setError('Failed to load addresses. Please try again later.');
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handlePlaceOrder = () => {
    console.log('Redirecting to payment page...');
    navigate('/payment');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Address Information
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        {addresses.map((address, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Address {index + 1}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {address.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {address.street}, {address.city}, {address.state} {address.zipCode}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Phone: {address.phone}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Grid>
    </div>
  );
};

export default AddressPage;
