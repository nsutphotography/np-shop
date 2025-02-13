import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { handleFetchCart, handleAddToCart, handleRemoveFromCart } from "./cartActions";
import debugLib from "debug";
import { useAuth } from "../AuthContext/AuthContext";

const debug = debugLib("app:cartContext");

// Define cart item type
interface CartItem {
  productId: { price: number };
  quantity: number;
}

// Define cart context type
interface CartContextType {
  cart: {
    items: CartItem[];
    loading: boolean;
    error: string | null;
  };
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
}

// Create context with default undefined value
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Define provider props
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { token } = useAuth()

  const [cart, setCart] = useState<{ items: CartItem[]; loading: boolean; error: string | null }>({
    items: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    handleFetchCart(setCart);
  }, [token]);

  const addToCart = async (item: CartItem) => {
    await handleAddToCart(item, setCart);
  };

  const removeFromCart = async (item: CartItem) => {
    await handleRemoveFromCart(item, cart, setCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};



export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};