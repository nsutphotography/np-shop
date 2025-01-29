import React, { useState } from 'react';
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentMethod = ({ onPaymentMethodSelect }) => {
    const [selectedMethod, setSelectedMethod] = useState('card');
    const stripe = useStripe();
    const elements = useElements();

    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
        onPaymentMethodSelect(event.target.value);
    };

    const handlePayment = async () => {
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            console.error(error);
        } else {
            console.log('Payment Method:', paymentMethod);
        }
    };

    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom>
                Select Payment Method
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup value={selectedMethod} onChange={handleMethodChange}>
                    <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card (Stripe)" />
                </RadioGroup>
            </FormControl>
            {selectedMethod === 'card' && (
                <Box mt={2}>
                    <CardElement options={{ hidePostalCode: true }} />
                </Box>
            )}
            <Box mt={3} textAlign="center">
                <Button variant="contained" color="primary" disabled={!stripe} onClick={handlePayment}>
                    Proceed to Pay
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentMethod;
