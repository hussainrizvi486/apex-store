import { Header } from '@components/layouts';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@components/ui/tabs';
import React, { useState } from 'react';

import { getAddressQuery, AddressType } from "../../api/address"
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { DataForm } from '@components/data-form/main';


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
                    <Tabs defaultValue="profile">
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

interface Order {
    id: string;
    product: string;
    status: 'pending' | 'completed' | 'cancelled' | 'processing';
    total: number;
    date: string;
}

const DataTable: React.FC = () => {
    // Sample data
    const orders: Order[] = [
        {
            id: 'ORD-001',
            product: 'Wireless Headphones',
            status: 'completed',
            total: 99.99,
            date: '2024-05-20'
        },
        {
            id: 'ORD-002',
            product: 'Smart Watch',
            status: 'processing',
            total: 249.99,
            date: '2024-05-21'
        },
        {
            id: 'ORD-003',
            product: 'Laptop Stand',
            status: 'pending',
            total: 45.00,
            date: '2024-05-22'
        },
        {
            id: 'ORD-004',
            product: 'USB-C Cable',
            status: 'cancelled',
            total: 19.99,
            date: '2024-05-23'
        },
        {
            id: 'ORD-005',
            product: 'Mechanical Keyboard',
            status: 'completed',
            total: 129.99,
            date: '2024-05-24'
        }
    ];

    const DataTableRow: React.FC<{ children: React.ReactNode; isHeader?: boolean }> = ({
        children,
        isHeader = false
    }) => {
        return (
            <tr className={`${isHeader ? 'bg-gray-50' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                {children}
            </tr>
        );
    };

    const DataTableCell: React.FC<{
        children: React.ReactNode;
        isHeader?: boolean;
        className?: string;
    }> = ({ children, isHeader = false, className = '' }) => {
        const baseClasses = "px-6 py-4 text-left";
        const headerClasses = "font-semibold text-gray-900 bg-gray-50";
        const cellClasses = "text-gray-700";

        if (isHeader) {
            return (
                <th className={`${baseClasses} ${headerClasses} ${className}`}>
                    {children}
                </th>
            );
        }

        return (
            <td className={`${baseClasses} ${cellClasses} ${className}`}>
                {children}
            </td>
        );
    };

    const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
        const getStatusStyles = (status: Order['status']) => {
            switch (status) {
                case 'completed':
                    return 'bg-green-100 text-green-800 border-green-200';
                case 'processing':
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
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(status)}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders</h1>
                <p className="text-gray-600">Manage and track your recent orders</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <DataTableRow isHeader>
                                <DataTableCell isHeader>Order ID</DataTableCell>
                                <DataTableCell isHeader>Product</DataTableCell>
                                <DataTableCell isHeader>Status</DataTableCell>
                                <DataTableCell isHeader className="text-right">Total</DataTableCell>
                                <DataTableCell isHeader>Date</DataTableCell>
                            </DataTableRow>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <DataTableRow key={order.id}>
                                    <DataTableCell>
                                        <span className="font-mono text-sm font-medium text-gray-900">
                                            {order.id}
                                        </span>
                                    </DataTableCell>
                                    <DataTableCell>
                                        <div className="font-medium text-gray-900">
                                            {order.product}
                                        </div>
                                    </DataTableCell>
                                    <DataTableCell>
                                        <StatusBadge status={order.status} />
                                    </DataTableCell>
                                    <DataTableCell className="text-right">
                                        <span className="font-semibold text-gray-900">
                                            {formatCurrency(order.total)}
                                        </span>
                                    </DataTableCell>
                                    <DataTableCell>
                                        <span className="text-gray-600">
                                            {formatDate(order.date)}
                                        </span>
                                    </DataTableCell>
                                </DataTableRow>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty state - shown when no data */}
                {orders.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">No orders found</h3>
                        <p className="text-sm text-gray-500">Get started by creating your first order.</p>
                    </div>
                )}
            </div>

            {/* Pagination - for future enhancement */}
            <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{orders.length}</span> of{' '}
                    <span className="font-medium">{orders.length}</span> results
                </div>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                        Previous
                    </button>
                    <button className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

const OrdersTab: React.FC = () => {
    return (
        <div>
            My Orders
            <div>
                <DataTable />
            </div>
        </div>
    )
}