import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Alert, AlertTitle, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
  token: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setSuccess(null); // Clear any previous success messages

    try {
      const response = await axios.post<LoginResponse>(`${process.env.VITE_BASE_URL}/user/login`, { email, password });
      console.log('Login successful:', response.data);

      // Set success message
      setSuccess('Login successful! Redirecting...');

      // Handle successful login
      localStorage.setItem('token', response.data.token);

      // Redirect to the products page
      setTimeout(() => {
        navigate('/products');
      }, 2000); // Optional delay for user to see the success message
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
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
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f4f4">
      <Paper sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
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
    </Box>
  );
};

export default Login;
