import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import debugLib from 'debug'
const debug = debugLib('app:cartContext')
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    isLoading: false,
    error: null,
  });
  debug("initial cart ", cart)

  // Fetch cart items from the backend when the app starts
  useEffect(() => {
    debug("cart context  use effect")
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not logged in');
        }
        // setCart((prev) => ({ ...prev, isLoading: true }));
        const response = await axios.get('http://localhost:3000/cart/get-all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // debug("response data", response.data)
        debug("response data items", response.data.items)
        debug("response data items of 0 index no of quantity", response.data.items[0].quantity)
        const items = response.data.items; // Assuming this is your array
        const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
        debug("total quantity of all cart", totalQuantity)
        // debug("response data items", response.data[items])
        // debug("quantity of 0 index product", items[0][quantity])
        // const { items, totalQuantity, totalPrice } = response.data;
        // cart.totalQuantity=totalQuantity

        debug("after set the cart", cart)
        // setCart({ items, totalQuantity, totalPrice, isLoading: false, error: null });
      } catch (error) {
        console.log("error in the use effect in the cart context", error);

        // setCart((prev) => ({ ...prev, isLoading: false, error: error.message }));
      }
    };

    fetchCart();
  }, [cart]);

  debug("cart after use effect", cart)
  // const addToCart = async (product) => {
  //   debug("cart context add to cart functionc")
  //   try {
  //     const response = await axios.post("/api/cart", { productId: product._id }); // Replace with actual API endpoint
  //     const { updatedCart } = response.data; // Assume backend returns the updated cart
  //     setCart({
  //       items: updatedCart.items,
  //       totalQuantity: updatedCart.totalQuantity,
  //       totalPrice: updatedCart.totalPrice,
  //       isLoading: false,
  //       error: null,
  //     });
  //   } catch (error) {
  //     setCart((prev) => ({ ...prev, error: error.message }));
  //   }
  // };
  const addToCart = async (productId) => {
    debug("cart context add to cart functionc")
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    if (!token) {
      setError('You must be logged in to add items to the cart.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/cart/add',
        {
          // userId,
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      console.log('Product added to cart:', response.data);
      const items = response.data.items; // Assuming this is your array
      const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
      debug("total quantity of all cart", totalQuantity)
      // debug()
      setCart({ totalQuantity });

      // Optionally, you can update the UI to show that the product was added to the cart
    } catch (err) {
      console.error('Error adding product to cart:', err);

      // Check if the error response has a message from the backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);  // Display error message from backend
      } else {
        setError('Failed to add product to cart. Please try again later.');
      }
    }
  };



  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
