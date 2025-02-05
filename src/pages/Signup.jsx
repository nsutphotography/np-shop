import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Grid, Alert, AlertTitle } from '@mui/material';
import GoogleLoginButton from '../components/LoginComponents/GoogleLoginButton';
import { log } from '../debugging/debug';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  console.log("herr hola")
  log("hola")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setSuccess(null); // Clear any previous success messages

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signup`, { email, password });
      console.log('Registration successful:', response.data);

      // Set success message
      setSuccess('Registration successful! You can now log in.');

      // Clear form fields
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.response) {
        // Handle backend errors (e.g., user already exists)
        if (error.response.status === 400) {
          setError(error.response.data.message || 'User already exists.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        // Handle network or unexpected errors
        setError('Unable to connect to the server. Please try again later.');
      }
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            {/* Display error message */}
            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}
            {/* Display success message */}
            {success && (
              <Alert severity="success" sx={{ marginBottom: 2 }}>
                <AlertTitle>Success</AlertTitle>
                {success}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Sign Up
              </Button>
            </form>
            <GoogleLoginButton />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
