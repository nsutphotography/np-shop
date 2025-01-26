import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Paper, CircularProgress, Alert, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Function to handle removing an item from the cart
    const handleRemove = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User not logged in');
            }

            // Make the request to remove the item from the cart
            await axios.delete(`http://localhost:3000/cart/remove/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove the item from the local cartData state
            setCartData((prevCart) => prevCart.filter((item) => item.productId._id !== productId));
        } catch (err) {
            console.error('Error removing item from cart:', err);
            setError('Failed to remove item. Please try again later.');
        }
    };

    // Function to handle decreasing the quantity of a product
    const handleDecrease = async (productId, currentQuantity) => {
        try {
            if (currentQuantity <= 1) return; // Don't allow quantity to go below 1

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User not logged in');
            }

            // Make the request to decrease the quantity
            await axios.patch(
                `http://localhost:3000/cart/decrease/${productId}`,
                { quantity: currentQuantity - 1 }, // Decrease the quantity by 1
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update the local cartData state
            setCartData((prevCart) =>
                prevCart.map((item) =>
                    item.productId._id === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
            );
        } catch (err) {
            console.error('Error decreasing quantity:', err);
            setError('Failed to decrease quantity. Please try again later.');
        }
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('User not logged in');
                }

                const response = await axios.get('http://localhost:3000/cart/get-all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCartData(response.data.items); // Assuming response.data.items contains the cart items
                console.log(response.data.items);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching cart:', err);
                setError('Failed to load cart. Please try again later.');
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

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
                Your Cart
            </Typography>
            <Button>
                <a href="/checkout">Checkout</a>
            </Button>
            <Grid container justifyContent="center" spacing={2}>
                {cartData.length > 0 ? (
                    cartData.map((item) => (
                        <Grid item key={item.productId._id} xs={12} sm={6} md={4}>
                            <Card sx={{ maxWidth: 345 }}>
                                {/* <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.productId.imageUrl}
                                    alt={item.productId.name}
                                /> */}
                                <CardContent>
                                    <Typography variant="h6">{item.productId.name}</Typography>
                                    <Typography variant="body2">Price: ${item.productId.price}</Typography>
                                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                    <Typography variant="body2">
                                        Total: ${(item.productId.price * item.quantity).toFixed(2)}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleRemove(item.productId._id)} // Pass the productId to remove
                                        sx={{ marginTop: 1 }}
                                    >
                                        Remove
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleDecrease(item.productId._id, item.quantity)} // Pass the current quantity to decrease
                                        sx={{ marginTop: 1, marginLeft: 1 }}
                                    >
                                        Decrease Quantity
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" align="center">
                                Your cart is empty.
                            </Typography>
                            <Grid container justifyContent="center" spacing={2}>
                                <Grid item>
                                    <Button variant="contained" color="primary" href="/products">
                                        Shop Now
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default Cart;
