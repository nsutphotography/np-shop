import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { CartContext } from "../context/CartContext/CartContext";
import debugLib from 'debug';

const debug = debugLib('app:navbar')
const Navbar = () => {
  const { cart } = useContext(CartContext);
  // debug("cart",cart)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Logo and Brand Name */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          E-Commerce App
        </Typography>

        {/* Menu for Navigation */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/products">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/checkout">
          Checkout
        </Button>

        <div>
          {/* {debug("total quantity in navbar ",cart.totalQuantity)} */}
          {debug("cart in navbar ", cart)}
          Cart: {cart.totalQuantity} items (${cart.totalPrice})
        </div>
        <div>
          {/* (${cart.totalQuantity}) */}
        </div>
        {/* User Account or Cart Button */}
        <div>
          <IconButton color="inherit" component={Link} to="/cart">
            <ShoppingCartIcon />
          </IconButton>
          {/* User Dropdown Menu */}
          <IconButton
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <Typography>Account</Typography>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
              Login
            </MenuItem>
            <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>
              Sign Up
            </MenuItem>
            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
              Profile
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
