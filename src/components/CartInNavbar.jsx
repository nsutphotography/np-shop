import React, { useContext } from 'react';
import { IconButton, Typography, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext/CartContext";


const CartInNavbar = () => {
      const { cart } = useCart();
    
    return (
        <Box display="flex" alignItems="center" gap={2}>

            {/* Cart Button */}
            <IconButton color="inherit" component={Link} to="/cart">
                <ShoppingCartIcon />
                {/* Cart Details */}
                <Typography variant="body1" color="inherit">
                    <strong>{cart.totalQuantity} items</strong>
                    <br />
                    <strong>${cart.totalPrice}</strong>
                </Typography>
            </IconButton>

            {/* User Dropdown Menu */}
        </Box>
    );
};

export default CartInNavbar;
