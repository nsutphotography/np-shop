import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, Theme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import debugLib from 'debug';
import CartInNavbar from './CartInNavbar';
import ThemeToggleButton from './NavbarComponents/ThemeToggleButton';
import AccountMenu from './NavbarComponents/AccountMenu';
import './Navbar.css'; // Import CSS file

const debug = debugLib('app:navbar');

const Navbar: React.FC = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate(); // Hook for navigation

  return (
    <AppBar position="sticky">
      <Toolbar className={isSmallScreen ? "navbar navbar-small" : "navbar"}>
        {/* np shop is always at the top */}
        <Typography variant="h6" className="brand">
          <div className='npshop'  onClick={() => navigate("/")}>

          np shop
          </div>
        </Typography>

        {/* Different layouts for small and large screens */}
        {isSmallScreen ? (
          <Box className="small-screen-menu">
            <AccountMenu />
            <Box className="right-section">
              <ThemeToggleButton />
              <CartInNavbar />
            </Box>
          </Box>
        ) : (
          <>
            {import.meta.env.VITE_MODE === "development" && (
              <Box className="dev-links">
                <Button component={Link} to="/login">Login</Button>
                <Button component={Link} to="/signup">Sign Up</Button>
                <Button component={Link} to="/profile">Profile</Button>
                <Button component={Link} to="/order/summary">Order Summary</Button>
                <Button component={Link} to="/order/history">Order History</Button>
              </Box>
            )}

            <Box className="nav-links">
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/products">Products</Button>
            </Box>

            <Box className="right-section">
              <AccountMenu />
              <ThemeToggleButton />
              <CartInNavbar />
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
