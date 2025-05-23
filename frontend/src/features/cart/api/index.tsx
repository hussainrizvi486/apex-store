import { authAPI } from "@features/auth/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { use } from "react";



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

export const useCartItems = () => {
    return useQuery<{ items: CartItemType[], total_qty: string, grand_total: string }>({
        queryKey: ["cart", "items"],
        queryFn: async () => {
            const { data } = await authAPI.get("/api/customer/cart");
            return data;
        },
        staleTime: 5 * 60 * 1000, // optional: cache for 5 minutes
        cacheTime: 10 * 60 * 1000 // optional: keep unused data for 10 minutes
    });
};


export const useAddCartItem = () => {
    return useMutation({
        mutationFn: async (itemData: Record<string, any>) => {
            const { data } = await authAPI.post("/api/customer/cart/add-item", itemData);
            return data;
        }
    });
};


export const useUpdateCartItem = () => {
    return useMutation({
        mutationFn: async (updateData: Record<string, any>) => {
            const { data } = await authAPI.post("/api/customer/cart/update", updateData);
            return data;
        },
        onSuccess: () => {

        }
    });
};