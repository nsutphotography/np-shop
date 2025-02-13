import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import {User,AuthContextType} from "./authTypes"
import { handleFetchUserDetails, handleLoginUser } from "./authAction";
import log from "../../debugging/debug";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    log("user data",user)
    log("token here",token)

    useEffect(() => {
        if (token) {
            log("fetch user data is called with token",token)
            fetchUserDetails();
        }
    }, [token]);

    const fetchUserDetails = async () => {
        await handleFetchUserDetails({setUser})
        
    };

    const login = async(email: string, password: string) => {
        await handleLoginUser({email,password,setUser,setToken})
        log("user data",user)

    };
    const continueWithGoogle = (data: { "token": string; user: User }) => {
        localStorage.setItem("token", data["token"]);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data["token"]);
        // setUser(data.user);
      };

    const logout = () => {
        log("log out clicked")
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, continueWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}