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
        console.error("Create Order Error:", error); 
        return null;
    }
};


export const getOrderById = async (id: string) => {
    try {
        const response = await appAxios.get(`/order/${id}`);
        return response.data;
    } catch (error) {
        console.error("Fetch Order Error:", error); 
        return null;
    }
};

export const fetchCustomerOrders = async (userId: string) => {
    try {
        const response = await appAxios.get(`/order?customerId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Fetch Order Customer Error:", error); 
        return null;
    }
};

export const fetchOrders = async (status: string, userId: string, branchId:string) => {

    let uri = status == 'available' ? `/order?status=${status}&branchId=${branchId}` : 
    `/order?branchId=${branchId}&deliveryPartnerId=${userId}`

    try {
        const response = await appAxios.get(uri);
        return response.data;
    } catch (error) {
        console.error("Fetch Order Delivery Error:", error); 
        return null;
    }
};



export const sendLiveOrderUpdate = async (id: string, location: any, status: string) => {
    try {
        const response = await appAxios.patch(`/order/${id}/status`,{
            deliveryPersonLocation: location,
            status
        });
        return response.data;
    } catch (error) {
        console.error("sendLiveOrderUpdate Error:", error); 
        return null;
    }
};

export const confirmOrder = async (id: string, location: any) => {
    try {
        const response = await appAxios.post(`/order/${id}/confirm`,{
            deliveryPersonLocation: location,
        });
        return response.data;
    } catch (error) {
        console.error("confirmOrder Error:", error); 
        return null;
    }
};




