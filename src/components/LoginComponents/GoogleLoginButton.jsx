import React from 'react';
import { Button } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      // Send the token to the backend
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
    },
    flow: 'auth-code',
  });

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<GoogleIcon />}
      fullWidth
      sx={{ marginTop: 2 }}
      onClick={handleGoogleLogin}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;
