import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentMethod from '../components/PaymentComponents/PaymentMethod';
import CartDisplayForPayment from '../components/PaymentComponents/CartDisplayForPayment';
import AddressDisplayForPayment from '../components/PaymentComponents/AddressDisplayForPayment';

const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your actual Stripe key

const PaymentPage = () => {
    const handleCheckout = () => {
        alert('Checkout button clicked!');
        // Add your checkout logic here
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
                Payment Page
            </Typography>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} mt={4}>
                <Box flex={1} mr={{ md: 2 }}>
                    {/* Wrap PaymentMethod inside Elements */}
                    <Elements stripe={stripePromise}>
                        <PaymentMethod />
                    </Elements>
                </Box>
                <Box flex={2} display="flex" flexDirection="column" alignItems="flex-end">
                    <Box mb={2} width="100%">
                        <AddressDisplayForPayment />
                    </Box>
                    <Box width="100%">
                        <CartDisplayForPayment />
                    </Box>
                </Box>
            </Box>
            <Box mt={4} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleCheckout}>
                    Checkout
                </Button>
            </Box>
        </Container>
    );
};

export default PaymentPage;
