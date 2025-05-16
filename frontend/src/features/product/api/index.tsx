import { API_URL } from '@api/index';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Products list hook
export const useProductsList = () => {
    return useQuery({
        queryKey: ['get-products'],
        queryFn: async () => {
            const { data } = await axios.get(API_URL + 'api/get/product/list');
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        // cacheTime: 1000 * 60 * 10, // 10 minutes
        refetchOnWindowFocus: false,
        retry: 1, // Enable at least 1 retry for better UX
    });
};

// Single product detail hook
export const useProductDetails = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}api/get/product/detail?id=${id}`);
            return data;
        },
        enabled: !!id, // Prevent query from running if no ID
        staleTime: 1000 * 60 * 5, // 5 minutes
        // cacheTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
    });
};




export const useProductReviews = (id: string) => {
    return useQuery({
        queryKey: ["product_reviews", id],
        queryFn: async () => {
            const { data } = await axios.get(API_URL + "api/get/product/reviews");
            return data;
        },
        enabled: !!id, // Prevent query from running if no ID
    })
}


