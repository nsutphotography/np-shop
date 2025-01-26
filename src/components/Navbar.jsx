import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { CartContext } from "../context/CartContext/CartContext";
import debugLib from 'debug';
import CartInNavbar from './CartInNavbar';

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
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          E-Commerce App
        </Typography>
        {/* <Button color="inherit" component={Link} to="/">
          Home
        </Button> */}
        <Button color="inherit" component={Link} to="/products">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/checkout">
          Checkout
        </Button>

        <CartInNavbar cart={cart} />
        <div>
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
