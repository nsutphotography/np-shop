import React, { useContext, useState } from 'react';
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, Tooltip } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import debugLib from 'debug';
import { CartContext } from '../../context/CartContext/CartContext';
import { AddressContext } from '../../context/AddressContext/AddressContext';
import { handleConfirmPayment, handleFetchClientSecret } from '../../services/paymentService';
import { useOrder } from '../../context/OrderContext/OrderContext';

const log = debugLib('app:payment:method');

const PaymentMethod = ({ onPaymentMethodSelect }) => {
    const { addOrder } = useOrder()
    const { cart } = useContext(CartContext);
    const { addresses } = useContext(AddressContext)
    log("addresses all", addresses)
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const [tooltipText, setTooltipText] = useState("Click to copy");

    const handleCopy = () => {
        const testCardDetails = "4242 4242 4242 4242 | Exp: 12/34 | CVC: 123";
        navigator.clipboard.writeText(testCardDetails);
        setTooltipText("Copied!");
        setTimeout(() => setTooltipText("Click to copy"), 2000);
    };

    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
        onPaymentMethodSelect(event.target.value);
    };

    const handlePayment = async () => {
        setErrorMessage(null);

        if (!stripe || !elements) {
            setErrorMessage('Stripe has not loaded properly.');
            log('Stripe instance or elements are not available.');
            return;
        }

        const cardElement = elements.getElement(CardElement);

        setLoading(true);

        try {

            // Step 1: Fetch clientSecret from backend
            log('Fetching clientSecret from backend.');
            log("cart passing to the backend for payment", cart)
            // log("address passing to the backend for payment",deliveryAddress)
            const clientSecret = await handleFetchClientSecret(cart, addresses);

            if (!clientSecret) {
                throw new Error('Failed to get client secret from backend.');
            }

            // Step 2: Confirm card payment
            log('Confirming card payment with Stripe.');
            const paymentIntent = await handleConfirmPayment(stripe, clientSecret, cardElement);

            if (paymentIntent.status === 'succeeded') {
                log('Payment successful:', paymentIntent);
                alert("done")
                const totalPrice = cart.items.reduce(
                    (sum, item) => sum + item.productId.price * item.quantity,
                    0
                );
                addOrder(cart.items, totalPrice,)
                // await saveOrderDetails(currentUser.id, cart, deliveryAddress, paymentIntent);
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
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                            hidePostalCode: true,
                        }}
                        onReady={(element) => {
                            if (isDevelopment) {
                                console.log('Development mode detected, but card details cannot be prefilled.');
                            }
                        }}
                    />
                    {import.meta.env.VITE_MODE==="development" && (
                        <Tooltip title={tooltipText} arrow>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                mt={2}
                                sx={{ cursor: "pointer", userSelect: "none" }}
                                onClick={handleCopy}
                            >
                                <strong>Test Card:</strong> 4242 4242 4242 4242 | Exp: 12/34 | CVC: 123
                            </Typography>
                        </Tooltip>
                    )}
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
                    {loading ? 'Processing...' : 'Pay'}
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentMethod;
