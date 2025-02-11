import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, Alert, Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext/AuthContext';
import { useAddress } from '../context/AddressContext/AddressContext';
import ShowAddressList from '../components/AddressComponent/ShowAddressList';

const Profile = () => {
  // const [user, setUserData] = useState(null);
  // const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState('');
  const {user}=useAuth()
  const {addresses}=useAddress()



  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Profile Page
      </Typography>
      {error && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Grid container justifyContent="center" spacing={2}>
        {/* Profile Information */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Information
              </Typography>
              {user ? (
                <>
                  <Typography variant="body2">Name: {user.name}</Typography>
                  <Typography variant="body2">Email: {user.email}</Typography>
                </>
              ) : (
                <Typography variant="body2">Loading profile information...</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Address Information */}
        {addresses.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Address Information
            </Typography>
          </Grid>
        )}
        <ShowAddressList />
      </Grid>
    </Box>
  );
};

export default Profile;
