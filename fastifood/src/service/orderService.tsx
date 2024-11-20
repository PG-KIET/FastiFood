import {appAxios} from './apiInterceptors'

export const createOrder = async (items: any, totalPrice: number) => {
    try {
       
        const response = await appAxios.post(`/order`, {
            items: items,
            branch: "6719b2787d6a0266863029a7",
            totalPrice: totalPrice,
        });
        return response.data;
    } catch (error) {
        console.error("Create Order Error:", error); // Log lỗi chi tiết
        return null;
    }
};
