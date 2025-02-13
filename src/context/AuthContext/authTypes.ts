export interface User {
    id: string; // Required
    email: string; // Required
    name?: string; // Optional
    profileImage?: string; // Optional
    authProvider?: string; // Optional
}


export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => void;
    continueWithGoogle:(data: { "token": string; user: User }) =>void;
    logout: () => void;
}