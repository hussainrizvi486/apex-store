
import { authAPI } from "@features/auth/api";

export const getCart = async () => {
    const response = await authAPI.get("/api/customer/cart")
    return response.data;
}