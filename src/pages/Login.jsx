import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Grid, Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setSuccess(null); // Clear any previous success messages

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, { email, password });
      console.log('Login successful:', response.data);

      // Set success message
      setSuccess('Login successful! Redirecting...');

      // Handle successful login
      // e.g., save JWT to localStorage and redirect
      // localStorage.setItem('token', response.data.token);
      // navigate('/dashboard');
      localStorage.setItem('token', response.data.token);

      // Redirect to the products page
      setTimeout(() => {
        navigate('/products');
      }, 2000); // Optional delay for user to see the success message
    } catch (error) {
      if (error.response) {
        // Handle backend errors (e.g., invalid credentials)
        if (error.response.status === 401) {
          setError('Invalid email or password.');
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
        Login
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
                Log In
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
