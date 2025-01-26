import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import debugLib from "debug";

const debug = debugLib("app:cartContext");
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    isLoading: false,
    error: null,
  });

  debug("Initial cart state: ", cart);

  // Fetch cart items from the backend
  const fetchCart = async () => {
    debug("Fetching cart data...");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not logged in");
      }

      setCart((prev) => ({ ...prev, isLoading: true })); // Set loading state

      const response = await axios.get("http://localhost:3000/cart/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const items = response.data.items || [];
      const calculateTotal = () => {
        const total = items.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
        console.log('Total amount calculated:', total);
        return total;
      };
      const calculatedTotalPrice =calculateTotal()
      const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

      debug("Cart fetched successfully: ", { items, totalQuantity, totalPrice });

      setCart({
        items,
        totalQuantity,
        totalPrice:calculatedTotalPrice,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      debug("Error fetching cart data: ", error);
      setCart((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Add an item to the cart and fetch the updated cart
  const addToCart = async (productId) => {
    debug("Adding item to cart...");
    const token = localStorage.getItem("token");
    if (!token) {
      setCart((prev) => ({
        ...prev,
        error: "You must be logged in to add items to the cart.",
      }));
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/cart/add",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      debug("Item added to cart successfully. Fetching updated cart...");
      await fetchCart(); // Fetch the updated cart after adding the item
    } catch (error) {
      debug("Error adding item to cart: ", error);
      setCart((prev) => ({
        ...prev,
        error: "Failed to add product to cart. Please try again later.",
      }));
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
