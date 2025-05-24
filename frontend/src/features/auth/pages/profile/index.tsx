import { Header } from '@components/layouts';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@components/ui/tabs';
import React, { useState } from 'react';

import { getAddressQuery, AddressType } from "../../api/address"
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { DataForm } from '@components/data-form/main';
import { cn } from '@utils/index';
import { DataTable } from '@components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';


export interface ProfileType {
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    profilePicture?: string;
}

const DEFAULT_PROFILE_IMAGE = 'https://cdn-icons-png.flaticon.com/512/6997/6997662.png';


const addressFormField = [

    { label: "Title", name: "title", type: "text" },
    { label: "Address Line 1", name: "address_line_1", type: "text" },
    { label: "Address Line 2", name: "address_line_2", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "State", name: "state", type: "text" },
    { label: "", columnBreak: true },
    { label: "Country", name: "country", type: "text" },
    { label: "Postal Code", name: "postal_code", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone Number", name: "phone_number", type: "text" },
]

const AddAddress = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create</Button>
            </DialogTrigger>

            <DialogContent className='w-full max-w-full '>
                <div>
                    <DataForm fields={addressFormField} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

const AddressTab = () => {
    const { data } = getAddressQuery();

    return (
        <div >
            <div className='mb-4' >
                <div className='flex justify-between items-center my-2'>
                    <div className="text-xl font-semibold">Address Book</div>
                    <div>

                        <AddAddress />

                    </div>
                </div>
                <p className="text-sm text-gray-500">Manage your shipping and billing addresses.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {data?.map((address) => (
                    <AddressCard key={address.id} data={address} />
                ))}
            </div>
        </div>
    )
}
const ProfilePage: React.FC = () => {

    const user: ProfileType = {
        username: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
    };


    return (
        <>
            <Header />
            <div className='mx-auto max-w-6xl'>
                <div className='py-4'>
                    <Tabs defaultValue="orders">
                        <TabsList className='py-6 w-full'>
                            <TabsTrigger value='profile'>Your Account</TabsTrigger>
                            <TabsTrigger value='address'>Address Book</TabsTrigger>
                            <TabsTrigger value='orders'>My Orders</TabsTrigger>
                            <TabsTrigger value='reviews'>My Reviews</TabsTrigger>
                            <TabsTrigger value='wishlist'>Wishlist</TabsTrigger>
                        </TabsList>

                        <TabsContent value='profile'>
                            <ProfileTab />
                        </TabsContent>

                        <TabsContent value='address'>
                            <AddressTab />

                        </TabsContent>

                        <TabsContent value='orders'>
                            <OrdersTab />
                        </TabsContent>
                        <TabsContent value='reviews'>
                            <div>Reviews</div>
                        </TabsContent>
                        <TabsContent value='wishlist'>
                            <div>wishlist</div>
                        </TabsContent>

                    </Tabs>
                </div>
            </div>
        </>
    )

};

export default ProfilePage;


const AddressCard: React.FC<{ data: AddressType }> = (props) => {
    const { data } = props;

    if (!data) {
        return null;
    }

    return (
        <div className="border rounded-md p-4 relative">
            <div className="absolute top-2 right-2 flex space-x-2">

                <button className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>

                <button className="text-gray-500 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            <div className="mb-2">
                <span className="font-medium">{data?.title}</span>
            </div>
            <div className="text-sm text-gray-600">
                <p>{data?.address_line_1} {data?.address_line_2}</p>
                <p>{data?.city}, {data?.state} {data?.postal_code}</p>
                <p>{data?.country}</p>
            </div>
        </div>
    );
};


const ProfileTab: React.FC = () => {
    const user: ProfileType = {
        first_name: 'John',
        last_name: 'Doe',
        username: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
    };

    const data = user;


    const [profile, setProfile] = useState<ProfileType>(data);



    return (
        <div >
            <div className="mb-6">
                <div></div>
            </div>

            <div className='flex justify-between items-start border-b border-gray-300 mb-6'>
                <div className="mb-6 flex flex-col items-center">
                    <label htmlFor="imageUpload" className="cursor-pointer">
                        <img src={user.profilePicture || DEFAULT_PROFILE_IMAGE} alt="Profile"
                            className="w-20 h-20 rounded-full object-cover mb-2 hover:opacity-80 transition" />
                    </label>
                    <input id="imageUpload" type="file" accept="image/*" className="hidden" />
                    <span className="text-base cursor-pointer font-semibold">{profile.first_name} {profile.last_name}</span>
                </div>


                <div>
                    <Button>
                        Edit Profile
                    </Button>
                </div>
            </div>

            <div className='mb-4'>
                <h2 className="text-xl font-semibold">Your Account</h2>
                <p className="text-sm text-gray-500">Manage your profile information.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm mb-1">First Name</label>
                    <Input name="firstName" value={profile.first_name} />
                </div>
                <div>
                    <label className="block text-sm mb-1">Last Name</label>
                    <Input name="lastName" value={profile.last_name} />
                </div>
                <div>
                    <label className="block text-sm mb-1">Username</label>
                    <Input name="username" value={profile.username} />
                </div>
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <Input name="email" type="email" value={profile.email} />
                </div>
            </div>
        </div>
    )

}

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