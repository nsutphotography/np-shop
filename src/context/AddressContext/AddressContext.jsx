import React, { createContext, useState, useEffect, useContext } from 'react';
import { handleAddAddress, handleFetchAddresses, handleUpdateDefaultAddress } from "./addressAction";

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
    const updateDefaultAddress = async (addressId) => {
        log("update default address - in context",addressId)
        handleUpdateDefaultAddress(setAddresses, addressId)
    };


    return (
        <AddressContext.Provider value={{ addresses, error, addAddress, updateDefaultAddress }}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = ()=>{
    const context = useContext(AddressContext);
    if(!context){
        throw new Error("useAddress must be used within an AuthProvider");
    }
    return context;
}