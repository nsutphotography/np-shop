import axios from "axios";

export const handleUserSignup = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/signup`,
      { email, password }
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        return { success: false, message: error.response.data.message || "User already exists." };
      }
      return { success: false, message: "An error occurred. Please try again." };
    }
    return { success: false, message: "Unable to connect to the server. Please try again later." };
  }
};
