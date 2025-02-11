import React from "react";
import { useOrder } from "../context/OrderContext/OrderContext";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Button,
} from "@mui/material";

const OrderSummary: React.FC = () => {
  const { orders } = useOrder();
  if (orders.length === 0) return <Typography>No recent orders found.</Typography>;

  const latestOrder = orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      // bgcolor="#f5f5f5"
      
      p={2}
    >
      <Card sx={{ width: 400, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Latest Order Summary
          </Typography>
          <List>
            {latestOrder.items.map((item) => (
              <React.Fragment key={item._id}>
                product id : {item.productId._id}
                <ListItem>
                  <ListItemText
                    primary={item.productId.name}
                    secondary={`Quantity: ${item.quantity} | Price: $${item.productId.price.toFixed(2)}`}
                  />
                  <Typography variant="body1">
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${latestOrder.totalPrice.toFixed(2)}</Typography>
          </Box>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
track order
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderSummary;
