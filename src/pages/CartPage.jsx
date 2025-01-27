import React, { useContext } from "react";
import { Typography, Button, Paper, Alert, CircularProgress, Box } from "@mui/material";
import { CartContext } from "../context/CartContext/CartContext";
import CartPageItemList from "../components/cartPageComponents/CartPageItemList";

const Cart = () => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const calculateTotalAmount = () => {
        return cart.items.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
    };

    if (cart.loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (cart.error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Alert severity="error">{cart.error}</Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" align="center" gutterBottom>
                Your Cart
            </Typography>



            {cart.items.length > 0 ? (
                <CartPageItemList />
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6" align="center">
                            Your cart is empty.
                        </Typography>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button variant="contained" color="primary" href="/products">
                                Shop Now
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            )}
            {cart.items.length > 0 && (
                <Typography variant="h6" align="center" gutterBottom>
                    Total Amount: ${calculateTotalAmount()}
                </Typography>
            )}

            <Box display="flex" justifyContent="center" mb={2}>
                <Button variant="contained" color="primary" href="/checkout">
                    Checkout - Proceed to Pay
                </Button>
            </Box>
        </Box>
    );
};

export default Cart;
