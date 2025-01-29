import React, { useState } from 'react';
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import debugLib from 'debug';

const log = debugLib('app:payment:method');

const PaymentMethod = ({ onPaymentMethodSelect }) => {
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
        onPaymentMethodSelect(event.target.value);
    };

    const handlePayment = async () => {
        setErrorMessage(null);

        if (!stripe || !elements) {
            setErrorMessage('Stripe has not loaded properly.');
            return;
        }

        const cardElement = elements.getElement(CardElement);

        setLoading(true);

        try {
            // Step 1: Fetch clientSecret from backend
            const response = await fetch('http://localhost:3000/stripe/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 5000 }), // Example: $50.00 in cents
            });

            const { clientSecret } = await response.json();

            if (!clientSecret) {
                throw new Error('Failed to get client secret from backend.');
            }

            // Step 2: Confirm card payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                log('Error confirming card payment:', error);
                setErrorMessage(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                log('Payment successful:', paymentIntent);
                alert('Payment successful!');
            }
        } catch (error) {
            log('Error in payment flow:', error);
            setErrorMessage(error.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
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
            {errorMessage && (
                <Typography color="error" mt={2}>
                    {errorMessage}
                </Typography>
            )}
            <Box mt={3} textAlign="center">
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!stripe || loading}
                    onClick={handlePayment}
                >
                    {loading ? 'Processing...' : 'Proceed to Pay'}
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentMethod;
