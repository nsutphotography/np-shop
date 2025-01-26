import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, CardContent, CardMedia, Button, CircularProgress, Alert } from '@mui/material';
import { CartContext } from "../context/CartContext/CartContext";
import debugLib from 'debug'
const debug =debugLib('api:products')
const Products = () => {
    const { addToCart, removeFromCart } = useContext(CartContext);
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userId] = useState('user123'); // Replace with actual user ID logic, e.g., from auth
    const [quantity] = useState(1); // Default quantity

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products/get-all', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setProductData(response.data); // Assuming response.data contains an array of products
                console.log('Products:', response.data);
                console.log('Product ID:', response.data[0]._id);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again later.');
                setLoading(false);
            }
        };

        fetchProducts();
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
                Our Products
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {productData.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            {/* <CardMedia component="img" height="140" image={product.image} alt={product.name} /> */}
                            <CardContent>
                                <Typography variant="h6">{product.name}</Typography>
                                {import.meta.env.VITE_MODE === "development" && (
                                    <Typography variant="body2"  sx={{ textDecoration: "line-through", color: "red" }}>Product ID: {product._id}</Typography>
                                )}
                                <Typography variant="body2">{product.price}</Typography>
                                <Typography variant="body2">{product.description}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => addToCart(product._id)}
                                >
                                    Add
                                </Button>
                                {/* {console.log("here produsts",product)} */}
                                {debug("product data in the product jsx",product)}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => removeFromCart(product._id, )}
                                >
                                    remove
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Products;
