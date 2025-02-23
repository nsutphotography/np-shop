import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useAddress } from '../../context/AddressContext/AddressContext';

interface Address {
    _id: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    label: string;
    isDefault: boolean;
}

interface AddressCardProps {
    address: Address;
    index: number;
    onEdit: (address: Address) => void;
    onClick: (id: string) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, index, onEdit, onClick }) => {
    const {deleteAddress} = useAddress()
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log(`Delete address with ID: ${address._id}`);
        deleteAddress(address._id)
    };
    return (
        <Box width="100%" maxWidth={600} onClick={() => onClick(address._id)}>
            <Paper
                elevation={3}
                sx={{
                    cursor: 'pointer',
                    padding: 3,
                    backgroundColor: address.isDefault ? 'primary.main' : 'background.paper',
                    color: address.isDefault ? 'primary.contrastText' : 'text.primary',
                    border: address.isDefault ? '2px solid' : 'none',
                    borderColor: address.isDefault ? 'primary.dark' : 'transparent',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {address.isDefault ? 'Default Address' : `Address ${index + 1}`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {address.street}, {address.city}, {address.state}, {address.country}, {address.postalCode}, {address.label}
                </Typography>
                {import.meta.env.VITE_MODE === "development" && (
                    <Typography
                        variant="body2"
                        sx={{ textDecoration: "line-through", color: "red" }}
                    >
                        address ID: {address._id}
                    </Typography>
                )}

                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(address);
                    }}
                    sx={{ mt: 2 }}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                    sx={{ mt: 2 }}
                >
                    Delete
                </Button>

            </Paper>
        </Box>
    );
};

export default AddressCard;
