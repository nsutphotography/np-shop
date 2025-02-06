import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Alert, AlertTitle, Box } from "@mui/material";
import GoogleLoginButton from "../components/LoginComponents/GoogleLoginButton";
import { log } from "../debugging/debug";
import { handleUserSignup } from "../services/signupService";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  console.log("herr hola");
  log("hola");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const result = await handleUserSignup(email, password);

    if (result.success) {
      setSuccess("Registration successful! You can now log in.");
      setEmail("");
      setPassword("");
    } else {
      setError(result.message);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, width: "100%", maxWidth: 400, textAlign: "center" }}>
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
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
            Sign Up
          </Button>
        </form>
        <Box mt={2}>
          <GoogleLoginButton />
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
