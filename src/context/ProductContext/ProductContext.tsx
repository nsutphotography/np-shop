import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { fetchProducts,handleSearchProducts } from "./productAction";
// import { fetchProducts } from "../services/productService"; // Import API call function

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductContextType {
  products: Product[];
  searchProducts: (searchTerm: string) => void
  loading: boolean;
  error: string | null | undefined;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null | undefined>(null);

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    fetchProducts(token, setProducts, setError, setLoading);
  }, []);
  
  const searchProducts = (searchTerm: string) => {
    const token = localStorage.getItem('token') || '';
    handleSearchProducts(token, searchTerm, setProducts, setError, setLoading);
  };

  return (
    <ProductContext.Provider value={{ products,searchProducts, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = ()=>{
    const context = useContext(ProductContext);
    if(!context){
        throw new Error("useProducts must be used within an ProductProvider");

    }
    return context;
}