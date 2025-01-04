import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Paper, CircularProgress, Alert, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          throw new Error('User not logged in');
        }

        const response = await axios.get('http://localhost:3000/cart/get-all', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        });
        setCartData(response.data.items); // Assuming response.data.items contains the cart items
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
      <Grid container justifyContent="center" spacing={2}>
        {cartData.length > 0 ? (
          cartData.map((item) => (
            <Grid item key={item.productId._id} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.productId.imageUrl} // Assuming productId includes product details
                  alt={item.productId.name}
                />
                <CardContent>
                  <Typography variant="h6">{item.productId.name}</Typography>
                  <Typography variant="body2">Price: ${item.productId.price}</Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  <Typography variant="body2">
                    Total: ${(item.productId.price * item.quantity).toFixed(2)}
                  </Typography>
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
