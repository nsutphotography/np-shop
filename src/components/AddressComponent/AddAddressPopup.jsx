import React, { useState } from "react";
import { Button } from "@mui/material";
import AddressForm from "./AddAddressForm";

const AddAddressPopup = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Address
      </Button>
      <AddressForm open={open} onClose={handleClose} />
    </div>
  );
};

export default AddAddressPopup;
