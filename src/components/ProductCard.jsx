import React from "react";
import { Card, CardContent, Typography, Button, CardMedia } from "@mui/material";

const ProductCard = ({ product, addToCart, removeFromCart, cart }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
            <CardMedia
                      component="img"
                      height="140"
                    //   image={product.imageUrl}
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
                <Typography variant="body2">{product.price}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(product._id)}
                >
                    Add
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => removeFromCart(product._id)}
                >
                    Remove
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
