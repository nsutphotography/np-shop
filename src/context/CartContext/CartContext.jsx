import React, { createContext, useState, useEffect } from "react";
import { handleFetchCart, handleAddToCart, handleRemoveFromCart } from "./cartActions";
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


  useEffect(() => {
    handleFetchCart(setCart);
  }, []);

  const addToCart = async (productId) => {
    await handleAddToCart(productId, setCart)

  }

  const removeFromCart = async (productId) => {
    debug("Removing item from cart...");
    await handleRemoveFromCart(productId, cart, setCart)
  
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
