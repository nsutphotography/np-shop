// AddAddressForm.js
import React, { useState, useContext } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Alert,
} from "@mui/material";
import { AddressContext } from "../../context/AddressContext/AddressContext"; // Import AddressContext
import LabelSelector from "./LabelSelector"; // Import the LabelSelector component

const AddAddressForm = ({ open, onClose }) => {
    const { addAddress } = useContext(AddressContext); // Use AddressContext

    const [formData, setFormData] = useState({
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        isDefault: false,
        label: "Home", // Default label to "Home"
        customLabel: "", // For "Other" option
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async () => {
        if (!formData.street || !formData.city || !formData.state || !formData.country || !formData.postalCode) {
            setError("All required fields must be filled.");
            return;
        }

        // Set label to customLabel if "Other" is selected
        const finalLabel = formData.label === "Other" ? formData.customLabel : formData.label;
        const dataToSend = { ...formData, label: finalLabel, customLabel: undefined }; // Clean customLabel

        try {
            await addAddress(dataToSend); // Use addAddress from context
            setFormData({
                street: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
                isDefault: false,
                label: "Home", // Reset label to default
                customLabel: "", // Reset custom label
            });
            setError("");
            onClose();
        } catch (error) {
            setError("Error adding address. Please try again.");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Address</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    name="street"
                    label="Street"
                    value={formData.street}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    required
                />
                <TextField
                    name="city"
                    label="City"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    required
                />
                <TextField
                    name="state"
                    label="State"
                    value={formData.state}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    required
                />
                <TextField
                    name="country"
                    label="Country"
                    value={formData.country}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    required
                />
                <TextField
                    name="postalCode"
                    label="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    required
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                        />
                    }
                    label="Set as Default Address"
                />

                {/* Use the LabelSelector component */}
                <LabelSelector
                    label={formData.label}
                    customLabel={formData.customLabel}
                    onLabelChange={handleChange}
                    onCustomLabelChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Add Address
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAddressForm;
