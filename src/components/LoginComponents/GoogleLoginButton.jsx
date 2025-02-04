import React from 'react';
import { Button } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
          try {
            const { data } = await axios.post(
              'http://localhost:3000/auth/google', // Update with your backend URL
              { token: tokenResponse.credential }
            );
    
            // Store JWT token in local storage
            localStorage.setItem('jwt', data.token);
            console.log('Login Success:', data);
          } catch (error) {
            console.error('Login Failed:', error);
          }
        },
        onError: (error) => {
          console.error('Google Login Failed:', error);
        },
        flow: 'implicit',
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
