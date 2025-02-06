import axios from 'axios';

export const fetchProducts = async (token: string) => {
  try {
    const response = await axios.get(`${process.env.VITE_BASE_URL}/products/get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (err) {
    console.error('Error fetching products:', err);
    return { success: false, message: 'Failed to load products. Please try again later.' };
  }
};
