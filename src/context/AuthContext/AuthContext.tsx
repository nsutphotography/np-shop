import { createContext, useState, useEffect, ReactNode } from "react";
import {User,AuthContextType} from "./authTypes"

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            fetchUserDetails();
        }
    }, [token]);

    const fetchUserDetails = async () => {
        try {
            const res = await fetch("/api/user", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data: User = await res.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching user", error);
        }
    };

    const login = (newToken: string, userData: User) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("token", newToken);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

