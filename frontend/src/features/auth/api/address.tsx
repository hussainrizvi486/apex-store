import { useQuery } from '@tanstack/react-query';
import { authAPI } from "@features/auth/api";


export interface AddressType {
    user: string;
    title: string;
    address_line_1: string;
    address_line_2: string;
    country: string;
    state: string;
    city: string;
    postal_code: string;
    email: string;
    phone_number: string;
}


export const getAddressQuery = () => {
    return useQuery<AddressType[]>({
        queryKey: ["address-list"],
        queryFn: async () => {
            const { data } = await authAPI.get("/auth/api/user/address/list");
            return data;
        },
        staleTime: 5 * 60 * 1000, // optional: cache for 5 minutes
        cacheTime: 10 * 60 * 1000 // optional: keep unused data for 10 minutes
    })
}
