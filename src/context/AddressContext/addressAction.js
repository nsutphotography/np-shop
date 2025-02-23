import axios from 'axios';
import debugLib from 'debug';



const log = debugLib('app:address context action');


export const handleFetchAddresses = async (setAddresses) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not logged in');

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/addresses/get-all`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        setAddresses(response.data);
        log("response data of address", response.data)
    } catch (err) {
        console.error('Error fetching addresses:', err);
        setError('Failed to load addresses. Please try again later.');
    }
};

export const handleAddAddress = async (setAddresses, newAddress) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not logged in');

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/addresses/add`, newAddress, {
            headers: { Authorization: `Bearer ${token}` },
        });
        log("address added response", response.data)
        await handleFetchAddresses(setAddresses)
        // setAddresses((prev) => [...prev, response.data]);
    } catch (err) {
        console.error('Error adding address:', err);
        setError('Failed to add address. Please try again later.');
    }
};

export const handleUpdateDefaultAddress = async (setAddresses, addressId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not logged in');

        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/addresses/update-default/${addressId}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });

        log("Updated default address response", response.data);

        // Refresh the addresses after updating the default one
        await handleFetchAddresses(setAddresses);
    } catch (err) {
        console.error('Error updating default address:', err);
        setError('Failed to update default address. Please try again later.');
    }
};


export const handleDeleteAddress = async (setAddresses, addressId, setError) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not logged in');
  
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/addresses/delete/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      log("address deleted response", response.data);
      await handleFetchAddresses(setAddresses);
    } catch (err) {
      console.error('Error deleting address:', err);
      setError('Failed to delete address. Please try again later.');
    }
  };
  