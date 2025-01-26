import axios from "axios";
import debugLib from "debug";
const debug = debugLib("app:cartAction");


export const handleFetchCart = async (setCart) => {
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
        debug("fetch cart data", response.data)
        const items = response.data.items || [];
        // const calculateTotal = () => {
        //   const total = items.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
        //   console.log('Total amount calculated:', total);
        //   return total;
        // };
        // const calculatedTotalPrice = calculateTotal()

        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce(
            (sum, item) => sum + item.productId.price * item.quantity,
            0
        );
        debug("Cart fetched successfully: ", { items, totalQuantity, totalPrice });

        setCart({ items, totalQuantity, totalPrice: totalPrice.toFixed(2), isLoading: false, error: null, });
    } catch (error) {
        debug("Error fetching cart data: ", error);
        setCart((prev) => ({
            ...prev,
            isLoading: false,
            error: error.message,
        }));
    }
};

export const handleAddToCart = async (productId, setCart) => {
    debug("Adding item to cart...");
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
            "http://localhost:3000/cart/add",
            { productId, quantity: 1 },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        debug("Item added to cart successfully. Fetching updated cart...");
        // const items = response.data.items || [];
        // debug("add to cart respons daata item", items)

        // const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        // const totalPrice = items.reduce(
        //   (sum, item) => sum + item.productId.price * item.quantity,
        //   0
        // );
        // debug("Cart fetched successfully: ", { items, totalQuantity, totalPrice });

        // setCart({ items, totalQuantity, totalPrice: totalPrice.toFixed(2), isLoading: false, error: null, });
        await handleFetchCart(setCart); // Fetch the updated cart after adding the item
    } catch (error) {
        debug("Error adding item to cart: ", error);
        //   setCart((prev) => ({
        //     ...prev,
        //     error: "Failed to add product to cart. Please try again later.",
        //   }));
    }
};


export const handleRemoveFromCart = async (productId, cart, setCart) => {
    debug("Removing item from cart...");
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
      await axios.patch(
        `http://localhost:3000/cart/decrease/${productId}`,
        {
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await handleFetchCart(setCart)
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