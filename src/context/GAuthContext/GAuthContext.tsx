import { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface guser {
  email: string;
  profileImage: string;
  _id: string;
}

interface GAuthContextType {
  guser: guser | null;
  gToken: string | null;
  glogin: (data: { "g-token": string; guser: guser }) => void;
  glogout: () => void;
}

export const GAuthContext = createContext<GAuthContextType | undefined>(undefined);

export const GAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [guser, setGUser] = useState<guser | null>(null);
  const [gToken, setGToken] = useState<string | null>(
    localStorage.getItem("g-token") || null
  );

  useEffect(() => {
    if (gToken) {
      const storedUser = localStorage.getItem("g-user");
      if (storedUser) {
        // setGUser(JSON.parse(storedUser));
      }
    }
  }, [gToken]);

  const glogin = (data: { "g-token": string; guser: guser }) => {
    localStorage.setItem("g-token", data["g-token"]);
    localStorage.setItem("g-guser", JSON.stringify(data.guser));
    // setGToken(data["g-token"]);
    // setGUser(data.guser);
  };

  const glogout = () => {
    localStorage.removeItem("g-token");
    localStorage.removeItem("g-guser");
    // setGToken(null);
    // setGUser(null);
  };

  return (
    <GAuthContext.Provider value={{ guser, gToken, glogin, glogout }}>
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
