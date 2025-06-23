import { Input } from "@components/ui/input";
import { authAPI } from "@features/auth/api";
import { useQuery } from "@tanstack/react-query";
import { cn, formatCurrency, integer } from "@utils/index";
import { ListFilter as ListFilterIcon } from "lucide-react";
import { Link } from "react-router-dom";


const useOrdersQuery = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await authAPI.get("/api/customer/orders/list");
            return response.data;
        }
    })
}

const OrderStatus = ({ status }: { status: string }) => {
    const getStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'shipped':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className={cn("px-2 py-1 rounded-full border text-xs font-medium", getStatusStyle(status))}>
            {status.toUpperCase()}
        </div>
    );
}


const Index = () => {

    const { data, } = useOrdersQuery();
    // isLoading, isError
    return (
        <div className="px-2 py-4 bg-accent">
            <div className="text-lg font-semibold">My Orders</div>
            <div className="my-2 flex gap-2">
                <Input placeholder="Search orders..." className="flex-auto rounded-full px-4 " />

                <button className="cursor-pointer rounded-full p-1 hover:bg-gray-300 transition-colors">
                    <ListFilterIcon className="size-6" />
                </button>
            </div>

            <div className="mt-4 ">
                {data?.map((val, index) => (
                    <OrderCard order={val} key={index} />
                ))}
            </div>
        </div>
    )
}


interface TypeOrder {
    id: string;
    order_id: string;
    status: string;
    total_qty: number;
    total_amount: number;
    items: Array<{
        product: {
            cover_image: string;
            product_name: string;
        };
        price: number;
        quantity: number;
        discount: number;
        amount: number;
    }>;
}
const OrderCard = ({ order }: { order: TypeOrder }) => {
    return (
        <Link to={"/profile/orders/" + order.id}>

            <div className="border rounded-md p-2 text-sm mb-4 bg-white" >
                <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold">ID: #{order.order_id}</div>
                    <div><OrderStatus status={order.status} /></div>
                </div>

                <div className="font-medium pb-2 flex items-center justify-between border-b text-xs">
                    <div>Total Items: {order.total_qty}</div>
                    <div>Grand Total: {formatCurrency(order.total_amount)}</div>
                </div>


                {
                    order.items.map((item, j) => {
                        const { product } = item;
                        return (
                            <div key={j} className="mb-4">
                                <div className="flex items-center gap-2">
                                    <img src={product.cover_image} alt={item.product.product_name} className="h-12 w-12 border shadow-sm object-contain" />
                                    <div>
                                        <div className="line-clamp-2">{product.product_name}</div>
                                        <div className="text-xs font-semibold">{formatCurrency(item.price)}</div>
                                    </div>
                                </div>

                                <div className="mt-2 border p-2">
                                    <div className="flex justify-between text-xs mt-1">
                                        <div ><span className="font-semibold">Quantity:</span> {integer(item.quantity)}</div>
                                        <div><span className="font-semibold">Discount:</span> {formatCurrency(item.discount)}</div>
                                    </div>
                                    <div className="flex justify-between text-xs mt-1">
                                        <div><span className="font-semibold">Total:</span> {formatCurrency(item.amount)}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div></Link>
    )
}

export default Index;