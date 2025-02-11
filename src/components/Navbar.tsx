import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, Theme } from '@mui/material';
import { Link } from 'react-router-dom';
import debugLib from 'debug';
import CartInNavbar from './CartInNavbar';
import ThemeToggleButton from './NavbarComponents/ThemeToggleButton';
import AccountMenu from './NavbarComponents/AccountMenu';

// Create a debug instance
const debug = debugLib('app:navbar');

const Navbar: React.FC = () => {
  // Check if the screen size is small (e.g., mobile)
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ flexDirection: isSmallScreen ? 'column' : 'row', alignItems: 'center' }}>
        {/* np shop on top for small screens */}
        <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
          np shop
        </Typography>

        {/* Content changes based on screen size */}
        {isSmallScreen ? (
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 1 }}>
            <AccountMenu />
            <Box sx={{ display: "flex", gap: 1 }}>
              <ThemeToggleButton />
              <CartInNavbar />
            </Box>
          </Box>
        ) : (
          <>
            {import.meta.env.VITE_MODE === "development" && (
              <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Button component={Link} to="/login">Login</Button>
                <Button component={Link} to="/signup">Sign Up</Button>
                <Button component={Link} to="/profile">Profile</Button>
                <Button color="inherit" component={Link} to="/order/summary">Order Summary</Button>
                <Button color="inherit" component={Link} to="/order/history">Order History</Button>
              </Box>
            )}

            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/products">Products</Button>

            {/* Account menu, Theme Toggle, and Cart on the right for larger screens */}
            <AccountMenu />
            <ThemeToggleButton />
            <CartInNavbar />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
