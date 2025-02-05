import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import debugLib from 'debug';
import CartInNavbar from './CartInNavbar';
import ThemeToggleButton from './NavbarComponents/ThemeToggleButton';
import AccountMenu from './NavbarComponents/AccountMenu';

const debug = debugLib('app:navbar')
const Navbar = () => {

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          E-Commerce App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/products">
          Products
        </Button>
        {/* <Button color="inherit" component={Link} to="/checkout">
          Checkout
        </Button> */}

        <AccountMenu />
        <ThemeToggleButton />
        <CartInNavbar />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
