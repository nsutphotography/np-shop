import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleLoginUser } from "../services/loginService"; // Import the service

const Login:React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setSuccess(null); // Clear any previous success messages

    try {
      const data = await handleLoginUser(email, password); // Call the login service
      console.log('Login successful:', data);

      // Set success message
      setSuccess('Login successful! Redirecting...');

      // Redirect to the products page after a delay
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Access message safely
      } else {
        setError('An unexpected error occurred'); // Fallback for non-Error objects
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail((e.target as HTMLInputElement).value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword((e.target as HTMLInputElement).value)} 
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

export default Login