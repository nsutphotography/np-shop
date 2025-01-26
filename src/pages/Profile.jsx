import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, Alert, Box } from '@mui/material';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch user profile data
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not logged in');
      }

      const response = await axios.get('http://localhost:3000/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setError('Failed to load profile data. Please try again later.');
    }
  };

  // Function to fetch user address data
  const fetchAddressData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not logged in');
      }

      const response = await axios.get('http://localhost:3000/addresses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddresses(response.data);
    } catch (err) {
      console.error('Error fetching address data:', err);
      setError('Failed to load address data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchAddressData();
  }, []);

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
              {userData ? (
                <>
                  <Typography variant="body2">Name: {userData.name}</Typography>
                  <Typography variant="body2">Email: {userData.email}</Typography>
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
        {addresses.map((address) => (
          <Grid item xs={12} sm={6} md={4} key={address._id}>
            <Card>
              <CardContent>
                <Typography variant="body2">
                  <strong>Street:</strong> {address.userId}
                </Typography>
                <Typography variant="body2">
                  <strong>Street:</strong> {address._id}
                </Typography>
                <Typography variant="body2">
                  <strong>Street:</strong> {address.street}
                </Typography>
                <Typography variant="body2">
                  <strong>City:</strong> {address.city}
                </Typography>
                <Typography variant="body2">
                  <strong>State:</strong> {address.state}
                </Typography>
                <Typography variant="body2">
                  <strong>Country:</strong> {address.country}
                </Typography>
                <Typography variant="body2">
                  <strong>Postal Code:</strong> {address.postalCode}
                </Typography>
                <Typography variant="body2">
                  <strong>Default:</strong> {address.isDefault ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  <strong>Created At:</strong> {new Date(address.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  <strong>Updated At:</strong> {new Date(address.updatedAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Profile;
