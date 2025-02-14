import axios from "axios";

import log from "../../debugging/debug"

export const handleFetchCart = async (setCart) => {
    log("Fetching cart data...");
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User not logged in");
        }

        setCart((prev) => ({ ...prev, isLoading: true })); // Set loading state

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/get-all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        log("fetch cart data", response.data)
        const items = response.data.items || [];
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce(
            (sum, item) => sum + item.productId.price * item.quantity,
            0
        );
        // log("Cart fetched successfully: ", { items, totalQuantity, totalPrice });

        setCart({ items, totalQuantity, totalPrice: totalPrice.toFixed(2), isLoading: false, error: null, });
    } catch (error) {
        log("Error fetching cart data: ", error);
        setCart((prev) => ({
            ...prev,
            isLoading: false,
            error: error.message,
        }));
    }
};

export const handleAddToCart = async (productId, setCart) => {
    log("Adding item to cart...");
    const token = localStorage.getItem("token");
    if (!token) {
        //   setCart((prev) => ({
        //     ...prev,
        //     error: "You must be logged in to add items to the cart.",
        //   }));
        return;
    }
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/cart/add`,
            { productId, quantity: 1 },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        log("add response", response.data);
        const items = response.data.items || [];
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce((sum, item) => sum + item.productId.price * item.quantity,0);
        // log("Cart fetched successfully: ", { items, totalQuantity, totalPrice });

        setCart({ items, totalQuantity, totalPrice: totalPrice.toFixed(2), isLoading: false, error: null, });
        // await handleFetchCart(setCart); // Fetch the updated cart after adding the item
    } catch (error) {
        log("Error adding item to cart: ", error);
        //   setCart((prev) => ({
        //     ...prev,
        //     error: "Failed to add product to cart. Please try again later.",
        //   }));
    }
};


export const handleRemoveFromCart = async (productId, cart, setCart) => {
    log("Removing item from cart...");
    const currentQuantity = cart.totalQuantity
    try {
        if (currentQuantity <= 0) return; // Prevent quantity below 1

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not logged in');
        }
        if (currentQuantity === 1) {

        }
        console.log('Decreasing quantity for product:', productId);
        const response = await axios.patch(
            `${import.meta.env.VITE_BASE_URL}/cart/decrease/${productId}`,
            {
                quantity: 1,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        log("remove from cart response", response.data)
        const items = response.data.items || [];
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce(
            (sum, item) => sum + item.productId.price * item.quantity,
            0
        );
        // log("Cart fetched successfully: ", { items, totalQuantity, totalPrice });

        setCart({ items, totalQuantity, totalPrice: totalPrice.toFixed(2), isLoading: false, error: null, });

        // await handleFetchCart(setCart)
        // setCart((prevCart) =>
        //   prevCart.map((item) =>
        //     item.productId._id === productId
        //       ? { ...item, quantity: item.quantity - 1 }
        //       : item
        //   )
        // );
    } catch (err) {
        console.error('Error decreasing quantity:', err);
    }
};