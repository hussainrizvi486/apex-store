import { API_URL } from "@api/index";
import { DataTable } from "@components/data-table";
import { authAPI } from "@features/auth/api";
import { useAuth } from "@features/auth/hooks";
import { useQuery } from "@tanstack/react-query";

const useProductQuery = () => {
    return useQuery({
        queryKey: ['products-list'],
        queryFn: async () => {
            const response = await authAPI.get(API_URL + "/product/list");
            return response.data;
        }
    })
}


const Index = () => {
    const { data } = useProductQuery();
    console.log(data)



    return (
        <div>
            {/* <DataTable /> */}
            <h1>List Product</h1>
            <p>Product creation form will go here.</p>
        </div>
    );
}

export default Index;