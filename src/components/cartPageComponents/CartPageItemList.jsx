import React, { useContext } from "react";
import { List, ListItem, ListItemText, Button, Box, Typography } from "@mui/material";
import { CartContext } from "../../context/CartContext/CartContext";

const CartPageItemList = () => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    return (
        <List sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
            {cart.items.map((item) => (
                <ListItem key={item.productId._id} divider>
                    <ListItemText
                        primary={item.productId.name}
                        secondary={`Price: $${item.productId.price} | Quantity: ${item.quantity} | Total: $${(item.productId.price * item.quantity).toFixed(2)}`}
                    />
                    <Box
                        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addToCart(item.productId._id)}
                            sx={{ marginRight: 1 }}
                        >
                            Add
                        </Button>
                        <Typography variant="body1" sx={{ marginX: 1 }}>
                            {item.quantity}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeFromCart(item.productId._id)}
                        >
                            Remove
                        </Button>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default CartPageItemList;
