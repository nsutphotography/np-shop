import axios from "axios";
// import { useNavigate } from "react-router-dom";

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
    // const navigate = useNavigate();
    console.log("Adding item to cart...");
    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }
    console.log("Adding item to cart...");
    

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

        console.log("Add response", response.data);
        const items = response.data.items || [];
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

        setCart({ items, totalQuantity, totalPrice: totalPrice.toFixed(2), isLoading: false, error: null });
    } catch (error) {
        console.error("Error adding item to cart: ", error);

        if (error.response?.status === 401) {
            console.warn("JWT expired. Redirecting to login...");
            // localStorage.removeItem("token"); // Remove invalid token
            window.location.href = "/login";
        }
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