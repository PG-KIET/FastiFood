import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "@state/storage";
import { useAuthStore } from "@state/authStore";
import { resetAndNavigate } from "@utils/NavigationUtil";
import { appAxios } from "./apiInterceptors";

export const deliveryLogin = async (email: string, password: string) => {
    try {

        const response = await axios.post(`${BASE_URL}/delivery/login`, { email, password });
        const { accessToken, refreshToken, deliveryPartner } = response.data;
        tokenStorage.set('accessToken', accessToken);
        tokenStorage.set('refreshToken', refreshToken);
        const { setUser } = useAuthStore.getState();
        setUser(deliveryPartner);
    } catch (error) {
        console.error('Login Error: ', error);  // Log lỗi chi tiết tại đây
        throw error;  // Đảm bảo rằng lỗi được ném ra để có thể bắt trong handleAuth
    }
};




export const customerLogin = async (phone: string) => {
    try {
        console.log('Sending login request to:', `${BASE_URL}/customer/login`);  // Log đường dẫn API
        const response = await axios.post(`${BASE_URL}/customer/login`, { phone });
        const { accessToken, refreshToken, customer } = response.data;
        tokenStorage.set('accessToken', accessToken);
        tokenStorage.set('refreshToken', refreshToken);
        const { setUser } = useAuthStore.getState();
        setUser(customer);
    } catch (error) {
        console.error('Login Error: ', error);  // Log lỗi chi tiết tại đây
        throw error;  // Đảm bảo rằng lỗi được ném ra để có thể bắt trong handleAuth
    }
};

export const refreshUser = async (setUser: any) => {
    try {
        const response = await appAxios.get(`/user`)
        setUser(response.data.user)
     

    } catch (error) {
        console.error('Login Error: ', error);  
    }
};


export const refresh_token = async () => {
    try {
        const refreshToken = tokenStorage.getString('refreshToken');

        const response = await axios.post(`${BASE_URL}/refresh-token`, {
            refreshToken
        });

        const new_access_token = response.data.accessToken
        const new_refresh_token = response.data.refreshToken

        tokenStorage.set('accessToken', new_access_token);
        tokenStorage.set('refreshToken', new_refresh_token);

       return new_access_token
    } catch (error) {
        console.error('refresh token Error: ', error);  
        tokenStorage.clearAll()
        resetAndNavigate("CustomerLogin")
       
    }
};
