import React, { createContext, useState, useEffect, useContext } from 'react';
import { handleAddAddress, handleFetchAddresses } from "./addressAction";

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

    // Add an address
    const addAddress = async (newAddress) => {
        log("add address - in context",newAddress)
        handleAddAddress(setAddresses, newAddress)
    };

    return (
        <AddressContext.Provider value={{ addresses, error, addAddress }}>
            {children}
        </AddressContext.Provider>
    );
};
