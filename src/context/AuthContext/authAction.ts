import axios from 'axios';
import { User } from './authTypes';
import log from '../../debugging/debug';

interface LoginReq {
    email: string;
    password: string;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}
interface HandleLogin {

}
interface LoginResponse {
    token: string;
    user?: any; // You can replace `any` with a proper user type if available
}
interface GetUserDetailsReq {

    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface GetUserResponse {
    user: User;
}

export const handleLoginUser = async ({ email, password, setUser }: LoginReq): Promise<void> => {
    try {
        const response = await axios.post<LoginResponse>(`${import.meta.env.VITE_BASE_URL}/user/login`, { email, password });
        log("login response", response.data)
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user)

        // return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            switch (error.response.status) {
                case 401:
                    throw new Error('Invalid email or password. Please check and try again.');
                case 500:
                    throw new Error('Internal server error. Please try again later.');
                default:
                    throw new Error(error.response.data?.message || 'An error occurred. Please try again.');
            }
        } else {
            throw new Error('Unable to connect to the server. Please check your internet connection.');
        }
    }
};


export const handleFetchUserDetails = async ({ setUser }: GetUserDetailsReq): Promise<void> => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get<GetUserResponse>(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token in headers
            },
        });

        log("Fetched user details", response.data);
        setUser(response.data.user);

    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            switch (error.response.status) {
                case 401:
                    throw new Error("Unauthorized access. Please log in again.");
                case 404:
                    throw new Error("User not found.");
                default:
                    throw new Error(error.response.data?.message || "Failed to fetch user details.");
            }
        } else {
            throw new Error("Network error. Please check your connection.");
        }
    }
};