import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext/CartContext";
import { fetchProducts } from '../services/productService'; // Import the service
import log from '../debugging/debug'
interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const Products: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>('');
log("here one  " )
console.log("a   ")
  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    const fetchData = async () => {
      const result = await fetchProducts(token);
      if (result.success) {
        setProductData(result.data);
        setLoading(false);
      } else {
        setError(result.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
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
        {productData.map((product) => (
          <Box key={product._id} sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Products;
