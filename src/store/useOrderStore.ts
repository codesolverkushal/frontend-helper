import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CheckoutSessionRequest = {
    cartItems:{
        menuId:string;
        name:string;
        image:string;
        price:string;
        quantity:string;
    }[];
    deliveryDetails:{
        name:string;
        email:string;
        contact:string;
        address:string;
        city:string;
        country:string
    },
    restaurantId:string;
}

export interface Orders extends CheckoutSessionRequest {
    _id:string;
    status:string;
    totalAmount:number;
}

export type OrderState = {
    loading:boolean;
    orders:Orders[];
    createCheckoutSession: (checkoutSessionRequest:CheckoutSessionRequest) => Promise<void>;
    getOrderDetails: () => Promise<void>;

    
}

const API_END_POINT: string = "http://localhost:8000/api/v1/order";
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(persist((set => ({
    loading: false,
    orders: [],
    createCheckoutSession: async (checkoutSession: CheckoutSessionRequest) => {
        try {
            set({ loading: true });
            console.log(checkoutSession);
            const response = await axios.post(`${API_END_POINT}/checkout/create-checkout-session`, checkoutSession, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.location.href = response.data.session.url;
            set({ loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
    getOrderDetails: async () => {
        try {
            set({loading:true});
            const response = await axios.get(`${API_END_POINT}/`);
          
            set({loading:false, orders:response.data.orders});
        } catch (error) {
            set({loading:false});
        }
    }
    
})), {
    name: 'order-name',
    storage: createJSONStorage(() => localStorage)
}))