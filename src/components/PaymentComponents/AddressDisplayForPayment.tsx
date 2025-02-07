import React, { useContext } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { AddressContext } from "../../context/AddressContext/AddressContext";

// Define types for address structure
interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

interface AddressContextType {
  addresses: { addresses: Address[] }[];
}

const AddressDisplayForPayment: React.FC = () => {
  // Use context with proper typing
  const { addresses } = useContext(AddressContext) as AddressContextType;

  if (!addresses || addresses.length === 0 || !addresses[0].addresses) {
    return (
      <Typography variant="body1" textAlign="center">
        No default address available.
      </Typography>
    );
  }

  // Find the default address
  const defaultAddress = addresses[0].addresses.find((address) => address.isDefault);

  if (!defaultAddress) {
    return (
      <Typography variant="body1" textAlign="center">
        No default address set.
      </Typography>
    );
  }

  return (
    <Box sx={{ border: import.meta.env.VITE_MODE === "development" ? "1px solid red" : "none" }} display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Paper elevation={3} sx={{  width: '100%', padding: 3, maxWidth: 600, border: import.meta.env.VITE_MODE === "development" ? "1px solid red" : "none" }}>
        <Typography variant="h6" gutterBottom>
          Default Address
        </Typography>
        <Typography variant="body1" gutterBottom>
          {defaultAddress.street}, {defaultAddress.city}, {defaultAddress.state}, {defaultAddress.country}, {defaultAddress.postalCode}
        </Typography>
      </Paper>
    </Box>
  );
};

export default AddressDisplayForPayment;
