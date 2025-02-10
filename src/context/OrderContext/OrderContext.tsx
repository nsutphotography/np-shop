import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { log } from "../../debugging/debug";
import { handleFetchOrders } from "./orderAction";
import { Order, OrderItem, OrderContextType } from "./orderTypes"

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    log("order history context",orders)

    const fetchOrders = async () => {

        const orders = await handleFetchOrders();
        setOrders(orders);
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
              console.log("befor eadd",orders)
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
