import React, { useState, MouseEvent } from "react";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import log from "../../debugging/debug";

const AccountMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  // const {gToken,guser} = useGAuth();

  log("user data got in nav ", user);
  log("user data got in nav ", user?.profileImage);

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color="inherit" aria-controls="account-menu" aria-haspopup="true" onClick={handleMenuClick}>
        <Typography>{user ? (
          <Avatar src={user?.profileImage || undefined} alt={user?.email}>
            {!user?.profileImage && user?.email ? user.email.charAt(0).toUpperCase() : null}
          </Avatar>
        ) : "Account"}</Typography>
      </IconButton>
      <Menu id="account-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {user ? (
          <>
            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
              Profile
            </MenuItem>
            <MenuItem component={Link} to="/order/history" onClick={handleMenuClose}>
              Order History
            </MenuItem>
            <MenuItem component={Link} to="/order/summary" onClick={handleMenuClose}>
              Latest Order Summary
            </MenuItem>
            <MenuItem
              component={Link}
              to="/login"
              onClick={() => {
                logout();
                handleMenuClose();
              }}
            >
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
              Login
            </MenuItem>
            <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>
              Sign Up
            </MenuItem>
          </>
        )}
        <MenuItem component={Link} to="/products" onClick={handleMenuClose}>
          Products
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AccountMenu;
