import { API_URL } from "@api/index";
import { DataTable } from "@components/data-table";
import { SidebarLayout } from "@components/layouts";
import { Button } from "@components/ui/button";
import { authAPI } from "@features/auth/api";
import { useAuth } from "@features/auth/hooks";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";



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

    const { user } = useAuth();
    const { data, error } = useProductQuery();


    const columns: ColumnDef<Product>[] = [
        {
            header: 'Product',
            cell: ({ row }) => {
                const product = row.original;
                return (<Link to={`/admin/product/${product.id}`}>
                    <div className="flex items-center gap-2">
                        <div className="h-12 w-12 shrink-0 rounded-sm border border-gray-200">
                            <img src={product.cover_image} alt="" className="h-full w-full object-contain" />
                        </div>
                        <div className="line-clamp-3">{product.product_name}</div>
                    </div>
                </Link>)
            }
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'uom',
            header: 'UOM',
        },
        {
            header: "Category",
            accessorFn: (row) => row.category.name,
        }
    ]

    return (
        <div >
            <div className="flex items-center justify-between mb-4 p-3 bg-white shadow-sm rounded-md mt-4">
                <div className="text-lg font-medium">Products</div>

                <div >
                    <Link to="/admin/product/create">
                        <Button size="sm">
                            Add Product
                        </Button>
                    </Link>
                </div>
            </div>


            <div>
                <DataTable
                    data={data?.results || []}
                    columns={columns}
                />
            </div>

        </div>
    );
}

export default Index;