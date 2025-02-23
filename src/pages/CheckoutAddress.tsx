import { Typography, Button, Box } from "@mui/material";
import ShowAddressList from "../components/AddressComponent/ShowAddressList";
import { Link } from "react-router-dom";
import debugLib from "debug";
import { useAddress } from "../context/AddressContext/AddressContext";

const log = debugLib("app:address checkout");

const CheckoutAddressPage: React.FC = () => {
  const {addresses} = useAddress()
  return (
    <Box>
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Address Information
        </Typography>
        {addresses.length>0 &&(

        <Button variant="contained" color="primary" component={Link} to="/checkout/payment">
          Checkout
        </Button>
        )}
      </Box>
      <ShowAddressList />
      <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}></Box>
    </Box>
  );
};

export default CheckoutAddressPage;
