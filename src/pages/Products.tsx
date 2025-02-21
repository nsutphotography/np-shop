import React, { useContext } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import ProductCard from "../components/ProductCard";
import { ProductContext, useProducts } from '../context/ProductContext/ProductContext';
// import { ProductContext } from "../context/ProductContext";

const Products: React.FC = () => {
  const  { products, loading, error } = useProducts();

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
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3} sx={{ padding: 2 }}>
        {products.map((product) => (
          <Box key={product._id} sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Products;
