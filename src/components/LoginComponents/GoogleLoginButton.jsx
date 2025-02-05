import React from 'react';
import { Button } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useGoogleLogin } from '@react-oauth/google';
import { log } from '../../debugging/debug';
import axios from 'axios';

const GoogleLoginButton = () => {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        log("Google login response:", response);
        log("Google login response:", response.code);
        log("Google login response:",typeof( response.code));
  
        // Exchange auth code for ID token on backend
        const { data } = await axios.post('http://localhost:3000/auth/google/callback', {
          code: response.code, // Send auth code, NOT access_token
        });
  
        log("Data from backend:", data);
  
        // Store JWT token in local storage
        localStorage.setItem('jwt', data.token);
        log('Login Success:', data);
      } catch (error) {
        error('Login Failed:', error);
      }
    },
    onError: (error) => {
      error('Google Login Failed:', error);
    },
    flow: 'auth-code', // Use 'auth-code' instead of 'implicit'
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
