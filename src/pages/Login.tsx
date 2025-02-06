import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, AlertTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const theme = useTheme(); // Use theme hook to access theme

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Handle form submission logic here
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor={theme.palette.background.default}>
      <Paper sx={{ padding: 3, width: '100%', maxWidth: 400, bgcolor: theme.palette.background.paper }}>
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
