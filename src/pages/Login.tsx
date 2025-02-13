import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext/AuthContext";
import GoogleLoginButton from "../components/LoginComponents/GoogleLoginButton";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const data = await login(email, password);
      console.log("Login successful:", data);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error:", error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, width: "100%", maxWidth: 400 }}>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            <AlertTitle>Success</AlertTitle>
            {success}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Log In
            </Button>
          </Stack>
        </form>
        <Box mt={2}>
          <GoogleLoginButton />
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
