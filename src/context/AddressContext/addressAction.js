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
        log("response data of address",response.data)
    } catch (err) {
        console.error('Error fetching addresses:', err);
        setError('Failed to load addresses. Please try again later.');
    }
};