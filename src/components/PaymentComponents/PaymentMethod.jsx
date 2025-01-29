import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    TextField,
    Collapse,
} from '@mui/material';

const PaymentMethod = ({ onPaymentMethodSelect }) => {
    const [selectedMethod, setSelectedMethod] = useState('');

    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
        onPaymentMethodSelect(event.target.value);
    };

    const renderPaymentDetails = () => {
        switch (selectedMethod) {
            case 'card':
                return (
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            label="Card Number"
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Cardholder Name"
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Expiry Date (MM/YY)"
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="CVV"
                            type="password"
                            variant="outlined"
                            margin="normal"
                        />
                    </Box>
                );
            case 'upi':
                return (
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            label="UPI ID"
                            variant="outlined"
                            margin="normal"
                        />
                    </Box>
                );
            case 'netBanking':
                return (
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            label="Bank Name"
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Account Number"
                            variant="outlined"
                            margin="normal"
                        />
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom>
                Select Payment Method
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup value={selectedMethod} onChange={handleMethodChange}>
                    <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                    <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                    <FormControlLabel value="netBanking" control={<Radio />} label="Net Banking" />
                </RadioGroup>
            </FormControl>
            <Collapse in={!!selectedMethod}>{renderPaymentDetails()}</Collapse>
            <Box mt={3} textAlign="center">
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!selectedMethod}
                >
                    Proceed to Pay
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentMethod;
