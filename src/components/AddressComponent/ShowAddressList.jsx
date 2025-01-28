import React, { useContext } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { AddressContext } from '../../context/AddressContext/AddressContext';
import debugLib from 'debug';

const log = debugLib('app:address:show-address-list');

const ShowAddressList = () => {
  const { addresses } = useContext(AddressContext);
//   log("addresses", addresses);

  if (!addresses || addresses.length === 0 || !addresses[0].addresses) {
    return (
      <Typography variant="body1" textAlign="center">
        No addresses available.
      </Typography>
    );
  }

  // Extract the address array and sort by isDefault field.
  const sortedAddresses = [...addresses[0].addresses].sort(
    (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      {sortedAddresses.map((address, index) => (
        <Box key={index} width="100%" maxWidth={600}>
          <Paper
            elevation={3}
            sx={{
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
              {address.street}, {address.city}, {address.state}, {address.country}, {address.postalCode} , {address.label}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default ShowAddressList;
