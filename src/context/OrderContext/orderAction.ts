import axios from "axios";
import {Order} from "./orderTypes"



export const handleFetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
        if (!token) {
            console.error("User not logged in");
            return [];
        }

        const response = await axios.get<Order[]>(`${import.meta.env.VITE_BASE_URL}/orders/get-all`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data)) {
            console.log("Order all", response.data);
            return response.data;
        } else {
            console.warn("Invalid orders data received:", response.data);
            return [];
        }
    } catch (error) {
        console.error("Error fetching orders", error);
        return [];
    }
};


export const handleAddOrder = async (
  items: { productId: string; quantity: number }[],
  totalPrice: number,
  shippingAddress: string
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not logged in");

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/orders/add`,
      { items, totalPrice, shippingAddress },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error("Error placing order", error);
    throw error;
  }
};
