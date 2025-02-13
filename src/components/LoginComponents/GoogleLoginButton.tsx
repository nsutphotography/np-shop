import { Button } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useGoogleLogin } from "@react-oauth/google";
import { log } from "../../debugging/debug";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  useGAuth } from "../../context/GAuthContext/GAuthContext";

const GoogleLoginButton = () => {
  const {login} = useGAuth();
  const navigate = useNavigate();

  if (!login) {
    throw new Error("GoogleAuthContext must be used within GoogleAuthProvider");
  }

  // const { login } = login;

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      log("Google login response:", response);
      log("Google login code:", response.code);

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/google/callback`,
          { code: response.code }
        );

        console.log("Login Success:", data);
        login(data); // Use the context login function
        navigate("/products");

      } catch (error) {
        console.error("Login Failed:", error);
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
    },
    flow: "auth-code", // Use Authorization Code Flow
    ux_mode: "popup",
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
