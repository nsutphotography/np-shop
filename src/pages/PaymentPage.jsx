import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import PaymentMethod from '../components/PaymentComponents/PaymentMethod';
import CartDisplayForPayment from '../components/PaymentComponents/CartDisplayForPayment';
import AddressDisplayForPayment from '../components/PaymentComponents/AddressDisplayForPayment';

const PaymentPage = () => {
    const handleCheckout = () => {
        alert('Checkout button clicked!');
        // Add your checkout logic here
    };

    const handlePaymentMethodSelect = (method) => {
        console.log(`Selected Payment Method: ${method}`);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
                Payment Page
            </Typography>
            <Box sx={{border: import.meta.env.VITE_MODE === "development" ? "1px solid red" : "none" }} display="flex" flexDirection={{ xs: 'column', md: 'row' }} mt={4}>
                <Box flex={1} mr={{ md: 2 }}>
                    <PaymentMethod onPaymentMethodSelect={handlePaymentMethodSelect} />
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
