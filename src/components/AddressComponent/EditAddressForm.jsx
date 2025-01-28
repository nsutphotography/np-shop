import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditAddressForm = ({ open, address, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...address });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Address</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Street"
          name="street"
          value={formData.street || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="City"
          name="city"
          value={formData.city || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="State"
          name="state"
          value={formData.state || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Country"
          name="country"
          value={formData.country || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode || ''}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddressForm;