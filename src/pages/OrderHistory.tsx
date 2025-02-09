import React from "react";
import { useOrder } from "../context/OrderContext/OrderContext";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Box, Chip } from "@mui/material";
import log from "../debugging/debug";

const OrderHistory: React.FC = () => {
    const { orders } = useOrder();
    log("order history",orders)

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Order History
            </Typography>

            {orders.length === 0 ? (
                <Typography>No orders found.</Typography>
            ) : (
                orders.map((order) => (
                    <Card key={order._id} sx={{ mb: 2, p: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Order ID: {order._id}</Typography>
                            {import.meta.env.VITE_MODE==="development" && 
                            (
                              <s>
                              <Typography variant="h6">User ID: {order.userId}</Typography>
                              <Typography variant="h6">User email: {order.email}</Typography>

                              </s>
                            )
                            }
                            <Typography variant="body2">
                                Placed on: {new Date(order.createdAt).toLocaleString()}
                            </Typography>
                            <Typography variant="body2">
                                Shipping Address: {order.shippingAddress}
                            </Typography>

                            <Box mt={2}>
                                <TableContainer component={Paper}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Product ID</TableCell>
                                                <TableCell>Quantity</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {order.items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.productId._id}</TableCell>
                                                    <TableCell>{item.productId.name}</TableCell>
                                                    <TableCell>{item.productId.description}</TableCell>
                                                    <TableCell>{item.productId.price}</TableCell>
                                                    <TableCell>{item.productId.imageUrl}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>

                            <Box mt={2} display="flex" justifyContent="space-between">
                                <Typography variant="h6">Total: ${order.totalPrice.toFixed(2)}</Typography>
                                <Chip label={order.status} color="primary" />
                            </Box>
                        </CardContent>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default OrderHistory;
