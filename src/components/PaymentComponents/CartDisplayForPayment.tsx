import React, { useContext } from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { CartContext } from "../../context/CartContext/CartContext";
import log from "../../debugging/debug";

interface CartItem {
    productId: {
        _id: string;
        name: string;
        price: number;
        productId:string;
        description: string;
        imageUrl: string;
    };
    quantity: number;
    _id: string;
}

interface Cart {
  items: CartItem[];
}

const CartDisplayForPayment: React.FC = () => {
  const { cart } = useContext(CartContext);
  log("cart on the payment [age",cart)

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
        border:
          import.meta.env.VITE_MODE === "development" ? "1px solid red" : "none",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h5">My Cart</Typography>
        <Typography variant="body1">
          Total Items:{" "}
          {cart.items.reduce((total:number, item:CartItem) => total + item.quantity, 0)}
        </Typography>
      </Box>
      <List>
        {cart.items.map((item:CartItem) => (
          <ListItem key={item.productId._id} divider>
            <ListItemText
              primary={item.productId.name}
              secondary={`Price: $${item.productId.price} | Quantity: ${item.quantity} | Total: $${(item.productId.price * item.quantity).toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CartDisplayForPayment;
