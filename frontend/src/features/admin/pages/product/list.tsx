import { API_URL } from "@api/index";
import { DataTable } from "@components/data-table";
import { SidebarLayout } from "@components/layouts";
import { authAPI } from "@features/auth/api";
import { useAuth } from "@features/auth/hooks";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

const useProductQuery = () => {
    return useQuery({
        queryKey: ['products-list'],
        queryFn: async () => {
            const response = await authAPI.get(API_URL + "/product/list");
            return response.data;
        }
    })
}


interface Product {
    product_name: string
    id: string
    cover_image: string
    price: number
    category: {
        name: string
        id: string
    }
}
const Index = () => {
    const { data } = useProductQuery();
    console.log(data)

    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: 'product_name',
            header: 'Product Name',
        },
        {
            header: "Category",
            accessorFn: (row) => row.category.name,
        }
    ]

    return (
        <div>
            <DataTable
                data={data?.results || []}
                columns={columns}
            />
            <h1>List Product</h1>
            <p>Product creation form will go here.</p>
        </div>
    );
}

export default Index;