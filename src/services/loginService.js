// loginService.js
import axios from 'axios';

export const handleLoginUser = async (email, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, { email, password });
    localStorage.setItem('token', response.data.token);

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Invalid email or password. check it again');
      }
      throw new Error('An error occurred. Please try again.');
    } else {
      throw new Error('Unable to connect to the server. Please try again later.');
    }
  }
};
