import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
}

interface OrderItem {
    product: Product;
    quantity: number;
}

interface Order {
    _id: string;
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    status: "pending" | "shipped" | "delivered";
    createdAt: string;
}

interface OrderContextType {
    orders: Order[];
    fetchOrders: () => Promise<void>;
    addOrder: (items: OrderItem[], totalPrice: number) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<any[]>([]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("jwt_token");
            const response = await axios.get<{ orders: Order[] }>("/api/orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };

    const addOrder = async (items: OrderItem[], totalPrice: number) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/orders/add`,
                { items, totalPrice ,shippingAddress:"hi3"},
                { headers: { Authorization: `Bearer ${token}` } }
              );

              console.log("after add ordre",response.data);
            setOrders((prev) => [...prev, response.data]);
            console.log("after add ordre",orders);
        } catch (error) {
            console.error("Error placing order", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <OrderContext.Provider value={{ orders, fetchOrders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within an OrderProvider");
    }
    return context;
};
