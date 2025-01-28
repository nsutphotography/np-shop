import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';

const AddressCard = ({ address, index, onEdit, onClick }) => {
    return (
        <Box width="100%" maxWidth={600} onClick={() => onClick(address._id)}>
            <Paper
                elevation={3}
                sx={{
                    cursor:'pointer',
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
                    {address.street}, {address.city}, {address.state}, {address.country}, {address.postalCode}
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
                    onClick={() => onEdit(address)}
                    sx={{ mt: 2 }}
                >
                    Edit
                </Button>
            </Paper>
        </Box>
    );
};

export default AddressCard;
