import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Orders } from './useOrderStore';

export type MenuItem = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}
export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    menus: MenuItem[];
    imageUrl: string;
}

export type SearchedRestaurant = {
    data:Restaurant[]
}



interface RestaurantStore {
    loading: boolean;
    restaurant: Restaurant | null;
    searchedRestaurant: SearchedRestaurant | null;
    createRestaurant: (formData: FormData) => Promise<void>;
    getRestaurant: () => Promise<void>;
    updateRestaurant: (formData: FormData) => Promise<void>;
    searchRestaurant: (searchText: string, searchQuery: string, selectedCuisines: string[]) => Promise<void>;
    addMenuToRestaurant: (menu: MenuItem) => void;
    updateMenuToRestaurant: (updatedMenu: MenuItem) => void;
    setAppliedFilter: (value: string) => void;
    resetAppliedFilter: () => void;
    appliedFilter: string[];
    getSingleRestaurant:(restaurantId: string) => Promise<void>;
    singleRestaurant: Restaurant | null;
    restaurantOrder:Orders[],
    getRestaurantOrders: () => Promise<void>;
    updateRestaurantOrder: (orderId:string, status:string) => Promise<void>;

}



const API_END_POINT = "http://localhost:3000/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantStore>()(
    persist(
        (set,get) => ({
            loading: false,
            restaurant: null,
            searchedRestaurant: null,
            appliedFilter: [],
            singleRestaurant: null,
            restaurantOrder: [],
            createRestaurant: async (formData: FormData) => {
                try {
                    set({ loading: true });
                    const response = await axios.post(`${API_END_POINT}/`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (response.data.success) {
                        toast.success(response.data.message);
                        set({ loading: false });
                    }
                } catch (error: any) {
                    toast.error(error.response.data.message);
                    set({ loading: false });
                }
            },
            getRestaurant: async () => {
                try {
                    set({ loading: true });
                    const response = await axios.get(`${API_END_POINT}/`);
                    if (response.data.success) {
                        set({ loading: false, restaurant: response.data.restaurant });
                    }
                } catch (error: any) {
                    if (error.response.status === 404) {
                        set({ restaurant: null });
                    }
                    set({ loading: false });
                }
            },
            updateRestaurant: async (formData: FormData) => {
                try {
                    set({ loading: true });
                    const response = await axios.put(`${API_END_POINT}/`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (response.data.success) {
                        toast.success(response.data.message);
                        set({ loading: false });
                    }
                } catch (error: any) {
                    toast.error(error.response.data.message);
                    set({ loading: false });
                }
            },
            searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: any) => {
                try {
                    set({ loading: true });

                    const params = new URLSearchParams();
                    params.set("searchQuery", searchQuery);
                    params.set("selectedCuisines", selectedCuisines.join(","));

                    // await new Promise((resolve) => setTimeout(resolve, 2000));
                    const response = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);
                    if (response.data.success) {
                        set({ loading: false, searchedRestaurant: response.data });
                    }
                } catch (error) {
                    set({ loading: false });
                }
            },
            addMenuToRestaurant: (menu: MenuItem) => {
                set((state: any) => ({
                    restaurant: state.restaurant ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] } : null,
                }))

            },
            updateMenuToRestaurant:  (updatedMenu: MenuItem) => {
                set((state: any) => {

                    if (state.restaurant) {
                        const updatedMenuList = state.restaurant.menus.map((menu: any) => menu._id === updatedMenu._id ? updatedMenu : menu);
                        return {
                            restaurant: {
                                ...state.restaurant,
                                menus: updatedMenuList
                            }
                        }
                    }
                    // if state.restaruant is undefined then return state
                    return state;
                })
            },
            setAppliedFilter: (value: string) => {
                set((state) => {
                    const isAlreadyApplied = state.appliedFilter.includes(value);
                    const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item) => item !== value) : [...state.appliedFilter, value];
                    return { appliedFilter: updatedFilter }
                })
            },
            resetAppliedFilter: () => {
                set({ appliedFilter: [] })
            },

            getSingleRestaurant: async (restaurantId: string) => {
                try {
                    const response = await axios.get(`${API_END_POINT}/${restaurantId}`);
                    if (response.data.success) {
                        set({ singleRestaurant: response.data.restaurant })
                    }
                } catch (error) { }
            },

            getRestaurantOrders: async () => {
                try {
                    const response = await axios.get(`${API_END_POINT}/order`);
                    if (response.data.success) {
                        set({ restaurantOrder: response.data.orders });
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            updateRestaurantOrder: async (orderId: string, status: string) => {
                try {
                    const response = await axios.put(`${API_END_POINT}/order/${orderId}/status`, { status }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.data.success) {
                        const updatedOrder = get().restaurantOrder.map((order: Orders) => {
                            return order._id === orderId ? { ...order, status: response.data.status } : order;
                        })
                        set({ restaurantOrder: updatedOrder });
                        toast.success(response.data.message);
                    }
                } catch (error: any) {
                    toast.error(error.response.data.message);
                }
            }


        }),
        {
            name: 'user-data', // Key to store data in localStorage
            storage: createJSONStorage(() => localStorage)
        }
    )
);


