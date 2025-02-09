import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import debugLib from 'debug';
import CartInNavbar from './CartInNavbar';
import ThemeToggleButton from './NavbarComponents/ThemeToggleButton';
import AccountMenu from './NavbarComponents/AccountMenu';

// Create a debug instance
const debug = debugLib('app:navbar');

// Define the Navbar component
const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          E-Commerce App
        </Typography>
        {import.meta.env.VITE_MODE === "development" && (
          <>
            <Button color="inherit" component={Link} to="/order/summary">
              Order Summary
            </Button>
            <Button color="inherit" component={Link} to="/order/history">
              Order History
            </Button>
          </>
        )}

        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/products">
          Products
        </Button>
        {/* <Button color="inherit" component={Link} to="/checkout">
          Checkout
        </Button> */}

        {/* Including the Account Menu, Theme Toggle, and Cart */}
        <AccountMenu />
        <ThemeToggleButton />
        <CartInNavbar />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
