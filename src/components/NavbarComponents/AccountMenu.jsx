import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <Typography>Account</Typography>
      </IconButton>
      <Menu
        id="account-menu"
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
  );
};

export default AccountMenu;
