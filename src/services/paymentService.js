// paymentService.js

import axios from 'axios';

//! Fetch clientSecret from backend then pass this client secret to the stripe
export const handleFetchClientSecret = async (cart,addresses ) => {
    // const {cart}=useContext(CartContext)
    // const {addresses}=useContext(AddressContext)
    const deliveryAddress = addresses[0].addresses.find(address => address.isDefault);

    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/stripe/create-payment-intent`, {
            amount: cart.totalPrice,
            cart,
            deliveryAddress,
        });

        // return response;
        return response.data.clientSecret;
    } catch (error) {
        throw new Error('Error fetching client secret from backend');
    }
};

// Confirm card payment with Stripe
export const handleConfirmPayment = async (stripe, clientSecret, cardElement) => {
    try {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            throw new Error(error.message);
        }

        return paymentIntent;
    } catch (error) {
        throw new Error('Error confirming payment: ' + error.message);
    }
};
