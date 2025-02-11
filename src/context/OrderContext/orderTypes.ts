export interface Product {
    _id: string;
    productId: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface OrderItem {
    _id: number;
    productId: Product;
    quantity: number;
}

export interface Order {
    _id: string;
    userId: string;
    email: string;
    items: OrderItem[];
    totalPrice: number;
    status: "pending" | "shipped" | "delivered";
    shippingAddress: string;
    createdAt: string;
    updatedAt: string;
}


export interface OrderContextType {
    orders: Order[];
    fetchOrders: () => Promise<void>;
    addOrder: (items: OrderItem[], totalPrice: number) => Promise<void>;
}
