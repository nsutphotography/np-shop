import axios from 'axios';
import debugLib from 'debug';



const log = debugLib('app:address context action');


export const handleFetchAddresses = async (setAddresses) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not logged in');

        const response = await axios.get('http://localhost:3000/addresses/get-all', {
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

        const response = await axios.post('http://localhost:3000/addresses/add', newAddress, {
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