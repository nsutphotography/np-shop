import axios from "axios";

export const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not logged in");

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.orders;
  } catch (error) {
    console.error("Error fetching orders", error);
    throw error;
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
