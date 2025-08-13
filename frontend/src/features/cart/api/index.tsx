import { authAPI } from "@features/auth/api";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import apiClient from "../../../main";



export interface CartItemType {
    id: string;
    product: {
        product_name: string;
        cover_image: string;
        description: string;
        category: string;
    };
    quantity: string;
    price: string;
    amount: string;
}




export const useCartQur = () => {
    return useQuery<{ items: CartItemType[], total_qty: string, grand_total: string }>({
        queryKey: ["cart", "items"],
        queryFn: async () => {
            const { data } = await authAPI.get("/api/customer/cart");
            return data;
        },
        staleTime: 5 * 60 * 1000,
    });
};

export const useCartItems = () => {
    return useQuery<{ items: CartItemType[], total_qty: string, grand_total: string }>({
        queryKey: ["cart", "items"],
        queryFn: async () => {
            const { data } = await authAPI.get("/api/customer/cart");
            return data;
        },
        staleTime: 5 * 60 * 1000,
    });
};


export const useAddCartItem = () => {
    return useMutation({
        mutationFn: async (itemData: Record<string, string>) => {
            const { data } = await authAPI.post("/api/customer/cart/add-item", itemData);
            return data;
        }
    });
};


export const useUpdateCartItem = () => {
    return useMutation({
        mutationFn: async (updateData: Record<string, string>) => {
            const { data } = await authAPI.post("/api/customer/cart/update", updateData);
            return data;
        },
        onSuccess: () => {

        }
    });
};



const useCartQuery = () => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const { data } = await authAPI.get("/api/customer/cart");
            return data;
        },

    });
}

const useAddCartMutation = () => {
    return useMutation({
        mutationFn: async (payload: Record<string, string>) => {
            const { data } = await authAPI.post("/api/customer/cart/add-item", payload);
            return data;
        },
        onSuccess: () => {
            return apiClient.invalidateQueries({
                queryKey: ["cart"]
            })
        }
    });
}

const useUpdateCartMutation = () => {
    return useMutation({
        mutationFn: async (payload: Record<string, string>) => {
            const { data } = await authAPI.post("/api/customer/cart/update", payload);
            return data;
        },
        onSuccess: () => {
            return apiClient.invalidateQueries({
                queryKey: ["cart"]
            })
        }
    })
}
export { useCartQuery, useAddCartMutation, useUpdateCartMutation };