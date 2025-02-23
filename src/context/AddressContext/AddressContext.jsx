import React, { createContext, useState, useEffect, useContext } from 'react';
import { handleAddAddress, handleFetchAddresses, handleUpdateDefaultAddress,handleDeleteAddress } from "./addressAction";

import debugLib from 'debug';
import { useAuth } from '../AuthContext/AuthContext';
const log = debugLib('app:addressContext');

// Create the AddressContext
export const AddressContext = createContext();

// AddressProvider Component
export const AddressProvider = ({ children }) => {
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState('');
    const { token } = useAuth();
    // Fetch addresses on initial load
    useEffect(() => {
        handleFetchAddresses(setAddresses);
    }, [token]);

    // Add an address
    const addAddress = async (newAddress) => {
        log("add address - in context", newAddress)
        handleAddAddress(setAddresses, newAddress)
    };
    const updateDefaultAddress = async (addressId) => {
        log("update default address - in context", addressId)
        handleUpdateDefaultAddress(setAddresses, addressId)
    };
    const deleteAddress = async (addressId) => {
        log("delete address - in context", addressId);
        handleDeleteAddress(setAddresses, addressId, setError);
      };


    return (
        <AddressContext.Provider value={{ addresses, error, addAddress, updateDefaultAddress,deleteAddress }}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => {
    const context = useContext(AddressContext);
    if (!context) {
        throw new Error("useAddress must be used within an AuthProvider");
    }
    return context;
}