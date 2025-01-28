// LabelSelector.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const LabelSelector = ({ label, customLabel, onLabelChange, onCustomLabelChange }) => {
  return (
    <div>
      <FormControl fullWidth margin="dense">
        <InputLabel>Label</InputLabel>
        <Select
          name="label"
          value={label}
          onChange={onLabelChange}
          fullWidth
          required
        >
          <MenuItem value="Home">Home</MenuItem>
          <MenuItem value="Office">Office</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      {/* Custom label input (only visible when "Other" is selected) */}
      {label === "Other" && (
        <TextField
          name="customLabel"
          label="Custom Label"
          value={customLabel}
          onChange={onCustomLabelChange}
          fullWidth
          margin="dense"
          required
        />
      )}
    </div>
  );
};

export default LabelSelector;
