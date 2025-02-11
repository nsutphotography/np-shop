import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext';
import log from "../../debugging/debug"
const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth()
  log("user data got in nav ", user)

  const handleMenuClick = (event) => {
    // logout();
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
        <Typography>
          {user?.email ? user.email : "Account"}
        </Typography>
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {
          user?
            <>
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                Profile
              </MenuItem>
              <MenuItem component={Link} to="/order/history" onClick={handleMenuClose}>
                order history
              </MenuItem>
              <MenuItem component={Link} to="/login"
                onClick={() => {
                  logout();
                  handleMenuClose()
                }}
              >
                logout
              </MenuItem>
            </>
            :
            <>
              <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                Login
              </MenuItem>
              <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>
                Sign Up
              </MenuItem>
            </>
        }


      </Menu>
    </div>
  );
};

export default AccountMenu;
