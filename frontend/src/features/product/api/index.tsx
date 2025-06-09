import { API_URL } from '@api/index';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


export const useProductsList = () => {
    return useQuery({
        queryKey: ['get-products'],
        queryFn: async () => {
            const { data } = await axios.get(API_URL + 'api/get/product/list');
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
    });
};


export const useProductDetails = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}api/get/product/detail?id=${id}`);
            return data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
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
        enabled: !!id,
    })
}


