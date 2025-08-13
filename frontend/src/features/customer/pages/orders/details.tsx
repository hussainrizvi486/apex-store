// Add this temporary data object at the top of your component, before the
import { useQuery } from '@tanstack/react-query';
import { authAPI } from '@features/auth/api';
import { ChevronLeft, MapPin, Truck, Clock, CreditCard } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { cn, formatCurrency, integer } from '@utils/index';


// Type definitions
interface OrderItem {
    product: {
        cover_image: string;
        product_name: string;
        product_id: string;
    };
    price: number;
    quantity: number;
    discount: number;
    amount: number;
}

interface ShippingDetails {
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    recipient_name: string;
    contact_number: string;
}

interface PaymentDetails {
    method: string;
    transaction_id: string;
    status: string;
    paid_amount: number;
    payment_date: string;
}

interface OrderDetails {
    order_id: string;
    status: string;
    total_qty: number;
    total_amount: number;
    created_at: string;
    updated_at: string;
    shipping: ShippingDetails;
    payment: PaymentDetails;
    items: OrderItem[];
}

// Order status component (reusing from list.tsx with slight modifications)
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
        <div className={cn("px-3 py-1 rounded-full border text-xs font-medium", getStatusStyle(status))}>
            {status.toUpperCase()}
        </div>
    );
};

// Timeline component for order tracking
const OrderTimeline = ({ status }: { status: string }) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentStep = steps.indexOf(status.toLowerCase());

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-6 px-2">
            {steps.map((step, index) => (
                <div key={step} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center">
                        <div className={cn(
                            "rounded-full h-8 w-8 flex items-center justify-center",
                            index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                        )}>
                            {index + 1}
                        </div>
                        <div className="text-xs mt-1 capitalize font-medium">
                            {step}
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={cn(
                            "flex-1 h-1 mx-2 hidden sm:block",
                            index < currentStep ? "bg-blue-600" : "bg-gray-200"
                        )} />
                    )}
                </div>
            ))}
        </div>
    );
};

// Section component for consistency
const Section = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) => {
    return (
        <div className={cn("bg-white rounded-md p-4 mb-4", className)}>
            <h3 className="text-md font-semibold mb-3 pb-2 border-b">{title}</h3>
            {children}
        </div>
    );
};

// Custom hook to fetch order details
const useOrderDetailsQuery = (orderId: string) => {
    return useQuery({
        queryKey: ['orderDetails', orderId],
        queryFn: async () => {
            const response = await authAPI.get(`api/order/detail/?id=${orderId}`);
            return response.data as OrderType;
        },
        enabled: !!orderId
    });
};

const tempOrderData: OrderDetails = {
    order_id: "ORD-2024-001234",
    status: "shipped",
    total_qty: 3,
    total_amount: 299.97,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-16T14:20:00Z",
    shipping: {
        address: "123 Main Street, Apt 4B",
        city: "New York",
        state: "NY",
        postal_code: "10001",
        country: "United States",
        recipient_name: "John Doe",
        contact_number: "+1 (555) 123-4567"
    },
    payment: {
        method: "Credit Card",
        transaction_id: "TXN_ABC123XYZ789",
        status: "paid",
        paid_amount: 299.97,
        payment_date: "2024-01-15T10:35:00Z"
    },
    items: [
        {
            product: {
                cover_image: "https://via.placeholder.com/150x150/4F46E5/white?text=Product+1",
                product_name: "Wireless Bluetooth Headphones",
                product_id: "PROD-001"
            },
            price: 129.99,
            quantity: 1,
            discount: 10.00,
            amount: 119.99
        },
        {
            product: {
                cover_image: "https://via.placeholder.com/150x150/059669/white?text=Product+2",
                product_name: "USB-C Charging Cable",
                product_id: "PROD-002"
            },
            price: 24.99,
            quantity: 2,
            discount: 0,
            amount: 49.98
        },
        {
            product: {
                cover_image: "https://via.placeholder.com/150x150/DC2626/white?text=Product+3",
                product_name: "Phone Case Premium",
                product_id: "PROD-003"
            },
            price: 39.99,
            quantity: 1,
            discount: 5.00,
            amount: 34.99
        }
    ]
};

interface OrderType {
    id: string,
    order_id: string,
    order_date: string,
    delivery_date: string,
    expected_delivery_date: string,
    customer: {
        first_name: string,
        last_name: string,
        email: string,
        phone_number: string,
    },
    delivery_address: {
        address_line_1: string,
        address_line_2: string,
        city: string,
        state: string,
        postal_code: string,
        country: string,
    },
    status: string,
    total_qty: number,
    total_amount: number,
    items: Array<{
        quantity: number,
        discount: number,

        amount: number,
        price: number,
        uom: string,
        product: {
            id: string,
            product_name: string,
            cover_image: string,
            category: {
                id: string,
                name: string
            },
        }
    }>,
}
const Index = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useOrderDetailsQuery(id || '');
    const order = tempOrderData; // Replace with actual query data when implemented
    console.log(data);
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (isError || !order) {
        return (
            <div className="bg-accent p-4 text-center">
                <div className="bg-white rounded-md p-8">
                    <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
                    <p className="text-gray-600 mb-4">We couldn't find the order details you're looking for.</p>
                    <Link to="/customer/orders" className="text-blue-600 flex items-center justify-center gap-1 hover:underline">
                        <ChevronLeft size={16} /> Back to Orders
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="px-2 py-4 bg-accent min-h-screen">
            <div className="max-w-4xl mx-auto">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div className="flex items-center gap-2 mb-2 sm:mb-0">
                        <Link to="/customer/orders" className="hover:bg-gray-200 p-1 rounded-full">
                            <ChevronLeft size={20} />
                        </Link>
                        <h1 className="text-lg font-semibold">Order #{data?.order_id}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-600">
                            <Clock size={14} className="inline mr-1" />
                            {/* {formatDate(order.created_at)} */}
                        </div>
                        {
                            data?.status ? <OrderStatus status={data?.status} /> : <></>
                        }
                    </div>
                </div>

                {/* <OrderTimeline status={order.status} /> */}

                <div className="">
                    <div className="">
                        <div className="bg-white">
                            {data?.items.map((item, idx) => (
                                <div key={idx} className="flex pb-3 border-b last:border-0 last:pb-0">
                                    <div className="flex-shrink-0 h-20 w-20">
                                        <img
                                            src={item.product.cover_image}
                                            alt={item.product.product_name}
                                            className="object-contain shadow-sm border rounded"

                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className='text-sm font-medium'>
                                            <Link to={`/products/${item.product.id}`} className=" line-clamp-2">
                                                {item.product.product_name}
                                            </Link>
                                            <div>{formatCurrency(item.price)}</div>
                                        </div>

                                        <div className="mt-2 text-sm">
                                            <div>Qty: <span className="font-semibold">{integer(item.quantity)}</span></div>
                                            {/* {item?.discount > 0 && ( */}
                                            <div>Discount: <span className="font-semibold">{formatCurrency(item.discount)}</span></div>
                                            {/* )} */}
                                            <div className="w-full mt-1">
                                                Subtotal: <span className="font-semibold">{formatCurrency(item.amount)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* Shipping Information */}
                        <div className="mt-6 bg-white rounded-md p-4">
                            <div className='mb-4 font-semibold'>Shipping Information</div>
                            {
                                data?.delivery_address && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <MapPin size={18} className="text-gray-500 flex-shrink-0 mt-1" />
                                        <div>
                                            {/* <div className="font-medium">{order.shipping.recipient_name}</div> */}
                                            <div className="text-gray-700">{data?.delivery_address.address_line_1 || ""}</div>
                                            <div className="text-gray-700">{data?.delivery_address.address_line_2 || ""}</div>
                                            <div className="text-gray-700">
                                                {data?.delivery_address.city}, {data?.delivery_address.state} {data?.delivery_address.postal_code}
                                            </div>
                                            <div className="text-gray-700">{data?.delivery_address.country}</div>
                                            <div className="mt-1">Contact: {data?.customer?.phone_number}</div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="mt-4 flex items-center gap-2 text-sm">
                                <Truck size={18} className="text-gray-500" />
                                <div className="text-gray-700">
                                    Estimated delivery: 3-5 business days
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">

                        {/* Payment Information */}
                        {/* <Section title="Payment Information">
                            <div className="text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Method:</span>
                                    <div className="flex items-center gap-1 font-medium">
                                        <CreditCard size={16} />
                                        {order.payment.method}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date:</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Transaction ID:</span>
                                    <span className="font-mono text-xs">{order.payment.transaction_id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className={order.payment.status.toLowerCase() === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                                        {order.payment.status}
                                    </span>
                                </div>
                            </div>
                        </Section> */}

                        {/* Order Summary */}
                        <div className='mt-6 bg-white rounded-md p-4'>
                            <div className='font-semibold'>Order Summary</div>
                            <div className="text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span>{formatCurrency(data?.total_amount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">No of Items:</span>
                                    <span>{formatCurrency(data?.total_qty)}</span>
                                </div>
                                {/* <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping:</span>
                                    <span>{formatCurrency(0)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax:</span>
                                    <span>{formatCurrency(0)}</span>
                                </div> */}
                                <div className="pt-2 mt-2 border-t flex justify-between font-semibold">
                                    <span>Total:</span>
                                    <span>{formatCurrency(data?.total_amount)}</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;