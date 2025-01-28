import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { handleFetchAddresses  } from "./addressAction";

import debugLib from 'debug';
const log = debugLib('app:addressContext');

// Create the AddressContext
export const AddressContext = createContext();

// AddressProvider Component
export const AddressProvider = ({ children }) => {
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState('');

    // Fetch addresses on initial load
    useEffect(() => {
        handleFetchAddresses(setAddresses);
    }, []);

    // Fetch addresses
    // const fetchAddresses = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         if (!token) throw new Error('User not logged in');

    //         const response = await axios.get('http://localhost:3000/addresses', {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });

    //         setAddresses(response.data);
    //         log("response data of address",response.data)
    //     } catch (err) {
    //         console.error('Error fetching addresses:', err);
    //         setError('Failed to load addresses. Please try again later.');
    //     }
    // };

    // Add an address
    const addAddress = async (newAddress) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('User not logged in');

            const response = await axios.post('http://localhost:3000/addresses', newAddress, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setAddresses((prev) => [...prev, response.data]);
        } catch (err) {
            console.error('Error adding address:', err);
            setError('Failed to add address. Please try again later.');
        }
    };

    return (
        <AddressContext.Provider value={{ addresses, error, addAddress }}>
            {children}
        </AddressContext.Provider>
    );
};
