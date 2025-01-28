import React, { useContext } from 'react';
import {
  Typography,
  Button,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddressContext } from '../context/AddressContext/AddressContext';

const CheckoutAddressPage = () => {
  const { addresses } = useContext(AddressContext);
  const navigate = useNavigate();
  const handlePlaceOrder = () => {
    console.log('Redirecting to payment page...');
    navigate('/payment');
  };



  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Address Information
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        {addresses.map((address, index) => (
          <Box key={index} width="100%" maxWidth={600}>
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
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ marginTop: 3 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutAddressPage;
