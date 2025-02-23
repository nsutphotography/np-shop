import React, { useContext, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AddressContext } from '../../context/AddressContext/AddressContext';
import AddressCard from './AddressCard';
import EditAddressForm from './EditAddressForm';
import AddAddressPopup from './AddAddressPopup';

const ShowAddressList = () => {
    const { addresses, updateDefaultAddress, deleteAddress } = useContext(AddressContext);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    if (!addresses || addresses.length === 0 || !addresses[0].addresses) {
        return (
            <>
                <Typography variant="body1" textAlign="center">
                    No addresses available.
                </Typography>
                <AddAddressPopup />
            </>

        );
    }

    const sortedAddresses = [...addresses[0].addresses].sort(
        (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)
    );

    const handleEditAddress = (address) => {
        setSelectedAddress(address);
        setDialogOpen(true);
    };

    const handleSave = (updatedAddress) => {
        console.log('Updated Address:', updatedAddress);
        setDialogOpen(false);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };
    const handleUpdateDefaultAddressClick = (addressId) => {
        console.log('Address clicked with ID:', addressId);
        updateDefaultAddress(addressId)
        // Execute your function with the addressId here
        // For example, call handleUpdateDefaultAddress(addressId) if you want to update the default address
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>

            <AddAddressPopup />
            {sortedAddresses.map((address, index) => (

                <AddressCard key={index} address={address} index={index} onEdit={handleEditAddress} onClick={handleUpdateDefaultAddressClick} />

            ))}
            <EditAddressForm
                open={dialogOpen}
                address={selectedAddress}
                onClose={handleClose}
                onSave={handleSave}
            />
        </Box>
    );
};

export default ShowAddressList;
