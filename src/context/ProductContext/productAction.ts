import axios from 'axios';

export const fetchProducts = async (
  token: string,
  setProducts: React.Dispatch<React.SetStateAction<any[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(response.data);
  } catch (err) {
    console.error('Error fetching products:', err);
    setError('Failed to load products. Please try again later.');
  } finally {
    setLoading(false);
  }
};


export const handleSearchProducts = async (
  token: string,
  searchTerm: string,
  setProducts: React.Dispatch<React.SetStateAction<any[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchTerm, // The search query parameter
      },
    });
    setProducts(response.data);
  } catch (err) {
    console.error('Error searching products:', err);
    setError('Search failed. Please try again later.');
  } finally {
    setLoading(false);
  }
};
