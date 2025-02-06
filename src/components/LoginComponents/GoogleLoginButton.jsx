import React from 'react';
import { Button } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useGoogleLogin } from '@react-oauth/google';
import { log } from '../../debugging/debug';
import axios from 'axios';

const GoogleLoginButton = () => {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google login response:", response);
      console.log("Google login code:", response.code);
  
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/google/callback`, {
          code: response.code, // Send auth code
        });
  
        localStorage.setItem('jwt', data.token);
        console.log('Login Success:', data);
      } catch (error) {
        console.error('Login Failed:', error);
      }
    },
    onError: (error) => {
      console.error('Google Login Failed:', error);
    },
    flow: 'auth-code', // Use Authorization Code Flow
    ux_mode: 'popup',
    // redirect_uri: 'http://localhost:5173', // Explicitly set redirect URI
    // redirect_uri: 'http://localhost:3000/auth/google/callback', // Explicitly set redirect URI
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
