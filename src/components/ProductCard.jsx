import React, { useContext } from "react";
import { Card, CardContent, Typography, Button, CardMedia, Box } from "@mui/material";
import { CartContext } from "../context/CartContext/CartContext";

const ProductCard = ({ product }) => {
    // Check the total quantity of this product in the cart
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const cartItem = cart.items.find(item => item.productId._id === product._id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    return (
        <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
            <CardMedia
                component="img"
                height="140"
                image={import.meta.env.VITE_MODE === "production" ? product.imageUrl : undefined}
                // image={product.imageUrl}
                alt={product.name}
            />
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                {import.meta.env.VITE_MODE === "development" && (
                    <Typography
                        variant="body2"
                        sx={{ textDecoration: "line-through", color: "red" }}
                    >
                        Product ID: {product._id}
                    </Typography>
                )}
                <Typography variant="body2">{product.description}</Typography>
                <div style={{ display: 'flex' }}>
                    <Box
                        sx={{ display: "flex", alignItems: "center", margin: "0 10px" }}
                    >
                        <Typography variant="body2">{product.price}</Typography>
                    </Box>

                    {/* Add or Remove buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addToCart(product._id)}
                        // disabled={quantityInCart > 0} // Disable "Add" if the product is already in the cart
                        >
                            Add
                        </Button>
                        {quantityInCart > 0 && (
                            <Typography variant="body2" component="span" sx={{ color: "green", margin: "0.5rem" }}>
                                {quantityInCart}
                            </Typography>
                        )}
                        {quantityInCart > 0 && (

                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => removeFromCart(product._id)}
                            // disabled={quantityInCart === 0} // Disable "Remove" if the product isn't in the cart
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
