import React, { useContext } from 'react';
import {
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddressContext } from '../context/AddressContext/AddressContext';
import AddAddressPopup from '../components/AddressComponent/AddAddressPopup';
import ShowAddressList from '../components/AddressComponent/ShowAddressList';
import debugLib from 'debug';

const log = debugLib('app:address checkout');

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
      <AddAddressPopup />

      <ShowAddressList />
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
          proceed to pay
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutAddressPage;
