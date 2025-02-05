import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';

const Checkout = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token retrieved:', token);
        if (!token) {
          throw new Error('User not logged in');
        }

        console.log('Fetching cart data...');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/get-all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Cart data received:', response.data.items);
        setCartData(response.data.items);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Failed to load cart. Please try again later.');
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const calculateTotal = () => {
    const total = cartData.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
    console.log('Total amount calculated:', total);
    return total;
  };

  const handleIncrease = async (productId, currentQuantity) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not logged in');
      }

      console.log('Increasing quantity for product:', productId);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/cart/add`,
        {
          productId,
          quantity: currentQuantity + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartData((prevCart) =>
        prevCart.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (err) {
      console.error('Error increasing quantity:', err);
    }
  };

  const handleDecrease = async (productId, currentQuantity) => {
    try {
      if (currentQuantity <= 0) return; // Prevent quantity below 1

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not logged in');
      }
      if (currentQuantity === 1) {

      }
      console.log('Decreasing quantity for product:', productId);
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/cart/decrease/${productId}`,
        {
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartData((prevCart) =>
        prevCart.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (err) {
      console.error('Error decreasing quantity:', err);
    }
  };

  if (loading) {
    console.log('Loading spinner displayed');
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    console.log('Error message displayed:', error);
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  console.log('Rendering checkout page with cart data:', cartData);
  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>
      <Button>
        <a href="/checkout/address">place ordre</a>
      </Button>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Cart
            </Typography>
            <Grid container spacing={2}>
              {cartData.map((item) => (
                <Grid item xs={12} key={item.productId._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.productId.imageUrl}
                      alt={item.productId.name}
                    />
                    <CardContent>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={8}>
                          <Typography variant="h6">_id = {item.productId._id}</Typography>
                          <Typography variant="h6">{item.productId.name}</Typography>
                          <Typography variant="body2">Price: ${item.productId.price}</Typography>
                          <Typography variant="body2">
                            Total: ${(item.productId.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} display="flex" alignItems="center" justifyContent="flex-end">
                          <IconButton
                            onClick={() => handleDecrease(item.productId._id, item.quantity)}
                          >
                            <Remove />
                          </IconButton>
                          <Typography variant="body2" sx={{ margin: '0 8px' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton onClick={() => handleIncrease(item.productId._id, item.quantity)}>
                            <Add />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  {console.log('Item rendered:', item)}
                </Grid>
              ))}
            </Grid>
            <Typography variant="h6" align="right" sx={{ marginTop: 3 }}>
              Total Amount: ${calculateTotal()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
