import { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface User {
  email: string;
  profileImage: string;
  _id: string;
}

interface GAuthContextType {
  user: User | null;
  gToken: string | null;
  login: (data: { "g-token": string; user: User }) => void;
  logout: () => void;
}

export const GAuthContext = createContext<GAuthContextType | undefined>(undefined);

export const GAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [gToken, setGToken] = useState<string | null>(
    localStorage.getItem("g-token") || null
  );

  useEffect(() => {
    if (gToken) {
      const storedUser = localStorage.getItem("g-user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [gToken]);

  const login = (data: { "g-token": string; user: User }) => {
    localStorage.setItem("g-token", data["g-token"]);
    localStorage.setItem("g-user", JSON.stringify(data.user));
    setGToken(data["g-token"]);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("g-token");
    localStorage.removeItem("g-user");
    setGToken(null);
    setUser(null);
  };

  return (
    <GAuthContext.Provider value={{ user, gToken, login, logout }}>
      {children}
    </GAuthContext.Provider>
  );
};

// Custom Hook to use the context safely
export const useGAuth = () => {
  const context = useContext(GAuthContext);
  if (!context) {
    throw new Error("useGAuth must be used within GAuthProvider");
  }
  return context;
};
