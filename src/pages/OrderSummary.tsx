import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box, Button } from "@mui/material";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const OrderSummary: React.FC = () => {
  const orderItems: OrderItem[] = [
    { id: "1", name: "Product A", price: 10.99, quantity: 2 },
    { id: "2", name: "Product B", price: 5.49, quantity: 1 },
    { id: "3", name: "Product C", price: 15.99, quantity: 3 },
  ];

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5" p={2}>
      <Card sx={{ width: 400, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Order Summary
          </Typography>
          <List>
            {orderItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)}`}
                  />
                  <Typography variant="body1">${(item.price * item.quantity).toFixed(2)}</Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${totalAmount.toFixed(2)}</Typography>
          </Box>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Proceed to Checkout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderSummary;
