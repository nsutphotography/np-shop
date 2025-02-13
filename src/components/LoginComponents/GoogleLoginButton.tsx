import { Button } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useGoogleLogin } from "@react-oauth/google";
import { log } from "../../debugging/debug";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  useGAuth } from "../../context/GAuthContext/GAuthContext";
import {  useAuth } from "../../context/AuthContext/AuthContext";

const GoogleLoginButton = () => {
  const {continueWithGoogle} = useAuth();
  const navigate = useNavigate();

  if (!continueWithGoogle) {
    throw new Error("GoogleAuthContext must be used within GoogleAuthProvider");
  }

  // const { glogin } = glogin;

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      log("Google glogin response:", response);
      log("Google glogin code:", response.code);

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/google`,
          { code: response.code }
        );

        console.log("glogin Success:", data);
        continueWithGoogle(data); // Use the context glogin function
        navigate("/products");

      } catch (error) {
        console.error("glogin Failed:", error);
      }
    },
    onError: (error) => {
      console.error("Google glogin Failed:", error);
    },
    flow: "auth-code",
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
