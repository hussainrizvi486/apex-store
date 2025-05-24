import { cn } from '@utils/index';
import { DataTable } from '@components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';



interface TypeOrder {
    order: string;
    date: string;
    customer: string;
    channel: string;
    total: string;
    paymentstatus: string;
    fulfillmentstatus: string;
    items: string;
    deliverystatus: string;
    deliverymethod: string;
    tags: string;
}

const TempColumns: ColumnDef<TypeOrder>[] = [
    {
        accessorKey: 'order',
        header: 'Order',

    },
    {
        accessorKey: 'date',
        header: 'Date',
    },
    {
        accessorKey: 'customer',
        header: 'Customer',

    },

    {
        accessorKey: 'total',
        header: 'Total',
        meta: {
            align: 'right'
        },
    },
    {
        accessorKey: 'paymentstatus',
        header: 'Payment Status',
    },

    {
        accessorKey: 'items',
        header: 'Items',
        cell: ({ row }) => {
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <div className='hover:[&_svg]:block flex items-center text-sm gap-1 w-[65px] cursor-pointer'>
                            <div>{row.original.items}</div>
                            <div><ChevronDown className='size-4 hidden' /></div>
                        </div>
                    </PopoverTrigger>

                    <PopoverContent>
                        <div className='w-[200px]'>
                            <div className='text-sm  mb-4'>Items</div>
                            <div className="flex items-center gap-1">
                                <div className='shrink-0'><img src="https://m.media-amazon.com/images/I/61Q56A7UfNL._AC_SL1500_.jpg" className='h-8 w-8  rounded-full' /></div>
                                <div className='text-xs whitespace-nowrap overflow-hidden text-ellipsis'>Gaming Mechanical keyboards Asus</div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover >
            );
        }
    },

    {

        accessorKey: 'deliverystatus',
        header: 'Delivery Status',
    }
]



let orderData: TypeOrder[] = [
    {
        "order": "#1013",
        "date": "Today at 12:09",
        "customer": "Code Soft Test Customer",
        "channel": "",
        "total": "CHF 112.00",
        "paymentstatus": "Paid",
        "fulfillmentstatus": "Unfulfilled",
        "items": "2 items",
        "deliverystatus": "",
        "deliverymethod": "Shipping",
        "tags": ""
    },
    {
        "order": "#1012",
        "date": "Today at 12:03",
        "customer": "Code Soft Test Customer",
        "channel": "",
        "total": "CHF 112.00",
        "paymentstatus": "Paid",
        "fulfillmentstatus": "Unfulfilled",
        "items": "2 items",
        "deliverystatus": "Pending",
        "deliverymethod": "Shipping",
        "tags": ""
    },
    {
        "order": "#1011",
        "date": "Today at 11:59",
        "customer": "Code Soft Test Customer",
        "channel": "",
        "total": "CHF 111.00",
        "paymentstatus": "Paid",
        "fulfillmentstatus": "Unfulfilled",
        "items": "1 item",
        "deliverystatus": "",
        "deliverymethod": "Shipping",
        "tags": ""
    },
    {
        "order": "#1010",
        "date": "Yesterday at 18:39",
        "customer": "Code Soft Test Customer",
        "channel": "",
        "total": "CHF 111.00",
        "paymentstatus": "Paid",
        "fulfillmentstatus": "Unfulfilled",
        "items": "1 item",
        "deliverystatus": "",
        "deliverymethod": "Shipping",
        "tags": ""
    },
    {
        "order": "#1009",
        "date": "Yesterday at 12:22",
        "customer": "Code Soft Test Customer",
        "channel": "",
        "total": "CHF 111.00",
        "paymentstatus": "Paid",
        "fulfillmentstatus": "Unfulfilled",
        "items": "1 item",
        "deliverystatus": "",
        "deliverymethod": "Shipping",
        "tags": ""
    },
    {
        "order": "#1008",
        "date": "Yesterday at 9:53",
        "customer": "Stephan Kueng 456",
        "channel": "Online Store",
        "total": "CHF 1.00",
        "paymentstatus": "Paid",
        "fulfillmentstatus": "Unfulfilled",
        "items": "1 item",
        "deliverystatus": "",
        "deliverymethod": "Standardversand",
        "tags": ""
    },
    {
        "order": "#1007",
        "date": "Thursday at 17:35",
        "customer": "Test Codes",
        "channel": "",
        "total": "CHF 2.00",
        "paymentstatus": "Paid",
        "fulfillmentstatus": "Unfulfilled",
        "items": "2 items",
        "deliverystatus": "",
        "deliverymethod": "Shipping",
        "tags": ""
    },
    {
        "order": "#1006",
        "date": "Thursday at 17:30",
        "customer": "Test Codes",
        "channel": "",
        "total": "CHF 2.00",
        "paymentstatus": "Paid",
        "fulfillmentstatus": "Unfulfilled",
        "items": "2 items",
        "deliverystatus": "",
        "deliverymethod": "Shipping",
        "tags": ""
    },
    {
        "order": "#1005",
        "date": "Thursday at 17:26",
        "customer": "Alina Küng",
        "channel": "",
        "total": "CHF 1.00",
        "paymentstatus": "Paid",
        "fulfillmentstatus": "Unfulfilled",
        "items": "1 item",
        "deliverystatus": "",
        "deliverymethod": "Shipping",
        "tags": ""
    }
]



const OrdersTab: React.FC = () => {
    return (
        <div>
            <div className='text-sm my-4'>My Orders</div>
            <div>
                {/* <DataTable columns={TempColumns} data={orderData} /> */}
            </div>
        </div>
    )
}