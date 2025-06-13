import { cn } from "@utils/index";

const data = [
    {
        "customer": {
            "customer_name": "John Doe",
        },
        "order_id": "12345",
        "order_date": "2023-10-01",
        "status": "Delivered",
        "total_amount": 150.00,
        "total_qty": 3,
        "items": [
            {
                "product": {
                    "product_name": "Product 1",
                    "product_id": "prod_001",
                    "image_url": "https://example.com/product1.jpg"
                },
                "quantity": 1,
                "amount": 50.00,
                "price": 50.00,
            },
        ]
    },
    {
        "customer": {
            "customer_name": "Jane Smith",
        },
        "order_id": "12346",
        "order_date": "2023-10-02",
        "status": "Shipped",
        "total_amount": 200.00,
        "total_qty": 4,
        "items": [
            {
                "product": {
                    "product_name": "Product 2",
                    "product_id": "prod_002",
                    "image_url": "https://example.com/product2.jpg"
                },
                "quantity": 2,
                "amount": 100.00,
                "price": 50.00,
            },
            {
                "product": {
                    "product_name": "Product 3",
                    "product_id": "prod_003",
                    "image_url": "https://example.com/product3.jpg"
                },
                "quantity": 2,
                "amount": 100.00,
                "price": 50.00,
            },
        ]
    },
    {
        "customer": {
            "customer_name": "Ali Khan",
        },
        "order_id": "12347",
        "order_date": "2023-10-03",
        "status": "Pending",
        "total_amount": 75.00,
        "total_qty": 2,
        "items": [
            {
                "product": {
                    "product_name": "Product 4",
                    "product_id": "prod_004",
                    "image_url": "https://example.com/product4.jpg"
                },
                "quantity": 1,
                "amount": 25.00,
                "price": 25.00,
            },
            {
                "product": {
                    "product_name": "Product 5",
                    "product_id": "prod_005",
                    "image_url": "https://example.com/product5.jpg"
                },
                "quantity": 1,
                "amount": 50.00,
                "price": 50.00,
            },
        ]
    }
];


const OrderStatus = ({ status }: { status: string }) => {
    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
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
            {status}
        </div>
    );
};
const Index = () => {
    return (
        <div className="px-2 py-4">
            <div className="text-lg font-semibold">Orders</div>
            <div className="mt-4">
                {data.map((val, index) => (
                    <div className="shadow-md rounded-md p-2 text-sm">
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold">ID: #{val.order_id}</div>
                            <div><OrderStatus status={val.status} /></div>
                        </div>

                        <div className="font-medium">
                            <div >Total Items: {val.total_qty}</div>
                            <div >Total Amount: {val.total_amount}</div>
                        </div>


                        {
                            val.items.map((item, j) => {
                                return (
                                    <div key={j} className="mb-2">
                                        <div className="flex items-center gap-2">
                                            <img src="https://cdn-icons-png.flaticon.com/512/2875/2875878.png" alt={item.product.product_name} className="h-8 w-8 shadow-sm object-contain" />
                                            <div>{item.product.product_name}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Index;