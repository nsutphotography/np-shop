import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia, Button, CircularProgress, Alert } from '@mui/material';
import ProductCard from "../components/ProductCard"
import { CartContext } from "../context/CartContext/CartContext";
import debugLib from 'debug'
const debug = debugLib('app:products')
const Products = () => {
    // debug("product page")
    const { cart, addToCart, removeFromCart } = useContext(CartContext);
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap={3}
                sx={{ padding: 2 }}
            >
                {productData.map((product) => {
                    return (
                        <Box
                            key={product._id}
                            sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}
                        >
                            <ProductCard
                                product={product}
                            />
                        </Box>
                    );
                })}
            </Box>
        </div>
    );
};

export default Products;
