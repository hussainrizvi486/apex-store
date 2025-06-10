import { Header } from '@components/layouts';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@components/ui/tabs';
import React, { useState } from 'react';
import { getAddressQuery, AddressType } from "@features/auth/api/address";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { DataForm } from '@components/data-form/main';
import { cn } from '@utils/index';
import { DataTable } from '@components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, X as CloseIcon, Pencil, Star, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { authAPI } from '@features/auth/api';
import moment from 'moment';
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { Link } from 'react-router-dom';


export interface ProfileType {
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    profilePicture?: string;
}

const DEFAULT_PROFILE_IMAGE = 'https://cdn-icons-png.flaticon.com/512/6997/6997662.png';

const AddAddress = () => {
    return <></>;
};

const EditProfile = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
                <Input />
                <Input />
                <Input />
                <Input />
            </DialogContent>
        </Dialog>
    );
};

const AddressTab = () => {
    const { data } = getAddressQuery();

    return (
        <div className='p-6 max-w-6xl mx-auto'>
            <div className='mb-4'>
                <div className='flex justify-between items-center my-2'>
                    <div className="text-xl font-semibold">Address Book</div>
                    <div>
                        <Link to={"/profile/address/add"}>
                            <Button>Add Address</Button>
                        </Link>
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
    );
};

const ProfilePage: React.FC = () => {
    const user: ProfileType = {
        username: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
    };

    return (
        <>
            {/* <Header /> */}
            <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
                <div className='py-4'>
                    <Tabs defaultValue="orders">
                        <TabsList
                            className='py-6 w-full flex md:overflow-x-visible overflow-x-auto overflow-y-hidden scrollbar-hide'
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            <TabsTrigger value='profile' className='flex-1 min-w-[120px] text-center sm:text-left'>Your Account</TabsTrigger>
                            <TabsTrigger value='address' className='flex-1 min-w-[120px] text-center sm:text-left'>Address Book</TabsTrigger>
                            <TabsTrigger value='orders' className='flex-1 min-w-[120px] text-center sm:text-left'>My Orders</TabsTrigger>
                            <TabsTrigger value='reviews' className='flex-1 min-w-[120px] text-center sm:text-left'>My Reviews</TabsTrigger>
                            <TabsTrigger value='wishlist' className='flex-1 min-w-[120px] text-center sm:text-left'>Wishlist</TabsTrigger>
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
                            <ReviewTab />
                        </TabsContent>
                        <TabsContent value='wishlist'>
                            <WishlistTab />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;

const AddressCard: React.FC<{ data: AddressType }> = (props) => {
    const { data } = props;

    if (!data) {
        return null;
    }

    return (
        <div className="border rounded-md p-6 relative ">
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
        <div className="max-w-6xl mx-auto lg:py-16 sm:py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center space-x-0 border-b border-gray-200 p-3 mb-5">
                <label htmlFor="imageUpload" className="cursor-pointer flex-shrink-0 mb-2 md:mb-4">
                    <img
                        src={user.profilePicture || DEFAULT_PROFILE_IMAGE}
                        alt="Profile"
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover hover:opacity-80 transition"
                    />
                    <input id="imageUpload" type="file" accept="image/*" className="hidden" />
                </label>
                <div className="text-center sm:text-left sm:ml-4">
                    <h1 className="md:text-4xl text-2xl font-semibold text-gray-900">{profile.first_name} {profile.last_name}</h1>
                    <p className="mt-1 md:text-sm text-xs text-gray-500">{profile.email}</p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Your Account</h2>
                <EditProfile />
            </div>

            <p className="text-base text-gray-600 mb-8">
                Manage your profile information.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <Input name="firstName" value={profile.first_name} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <Input name="lastName" value={profile.last_name} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <Input name="username" value={profile.username} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input name="email" type="email" value={profile.email} />
                </div>
            </div>
        </div>
    );
};




const useOrdersQuery = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await authAPI.get("/api/customer/orders/list");
            return response.data;
        }
    });
};



const OrdersTab: React.FC = () => {
    const { data, isLoading, isError } = useOrdersQuery();

    if (isLoading) return <div>Loading orders...</div>;
    if (isError) return <div>Failed to load orders.</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">My Orders</h2>
            {data && data.length > 0 ? (
                data.map((order: any) => (
                    <div
                        key={order.id}
                        className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <div className="text-sm text-gray-500">Order ID</div>
                                <div className="font-medium">{order.order_id}</div>
                            </div>
                            <div className="text-sm text-gray-500">
                                {moment(order.order_date).format('MMMM Do YYYY, h:mm:ss a')}
                            </div>
                        </div>
                        <div className="mb-2 text-sm">
                            <strong>Total Quantity:</strong> {order.total_qty} | <strong>Total Amount:</strong> ${order.total_amount}
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2 text-sm">Items</h4>
                            <ul className="space-y-3">
                                {order.items.map((item: any, idx: number) => (
                                    <li
                                        key={idx}
                                        className="bg-gray-50 border border-gray-100 rounded-lg p-3"
                                    >
                                        <div className='flex items-center gap-3'>
                                            <div className='shrink-0 shadow-md'>
                                                <img src={item.product.cover_image} alt="" className='h-20 w-20 object-cover' />
                                            </div>
                                            <div className="font-medium text-sm">{item.product.name}</div>
                                        </div>
                                        <div className="text-xs text-gray-600 mt-1">
                                            Qty: {item.quantity} | Price: ${item.price} | Amount: ${item.amount}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Link to={"/profile/orders/detail"}>
                                <Button>Order Details</Button>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-gray-500 text-sm">You have no orders yet.</div>
            )}
        </div>
    );
};

interface Review {
    id: number;
    productImage: string;
    productTitle: string;
    productDetails: string;
    sizeLabel: string;
    rating: number;
    satisfactionText: string;
    reviewText: string;
    reviewImages: string[];
    date: string;
}

const reviewsData: Review[] = [
    {
        id: 1,
        productImage: "http://localhost:8000/media/products/rs-wheel-hub-pc-front-angle-gallery-1.webp",
        productTitle: "product name",
        productDetails: "product detail",
        sizeLabel: "CN 42(UK 8)",
        rating: 5,
        satisfactionText: "Very Satisfied",
        reviewText: "My first experience left me very satisfied",
        reviewImages: [
            "http://localhost:8000/media/products/rs-wheel-hub-pc-front-angle-gallery-1.webp",
            "http://localhost:8000/media/products/rs-wheel-hub-pc-front-angle-gallery-1.webp",
            "http://localhost:8000/media/products/rs-wheel-hub-pc-front-angle-gallery-1.webp",
            "http://localhost:8000/media/products/rs-wheel-hub-pc-front-angle-gallery-1.webp"
        ],
        date: "May 6, 2025",
    },
];

const ReviewTab: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            {reviewsData.map(review => (
                <div key={review.id} className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">My Reviews ({reviewsData.length})</h2>

                    <div className="flex gap-3 bg-gray-100 p-3 mb-3">
                        <img
                            alt={review.productTitle}
                            className="w-15 h-15 object-contain mb-3 sm:mb-0"
                            height="60"
                            src={review.productImage}
                            width="60"
                        />
                        <div className="flex flex-col justify-center text-sm leading-tight">
                            <p className="text-gray-900 text-ellipsis">{review.productTitle} - {review.productDetails}</p>
                            <p className="text-gray-600 mt-0.5 text-xs">
                                Black / Label size:
                                <span className="text-gray-400 text-xs"> {review.sizeLabel}</span>
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star size={18} /> <span>{review.rating}</span>
                            </div>
                            <div className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {review.satisfactionText}
                            </div>
                        </div>

                        <div className="text-xs text-gray-500 mt-2 select-none text-right">
                            on {review.date}
                        </div>
                    </div>

                    <p className="text-sm my-3">{review.reviewText}</p>

                    <div className="flex gap-2 mb-4 flex-wrap">
                        {review.reviewImages.map((image, index) => (
                            <div className="relative w-20 h-20 flex-shrink-0 border border-gray-300 rounded mb-2" key={index}>
                                <img
                                    alt="Review image"
                                    className="w-full h-full object-cover"
                                    height="80"
                                    src={image}
                                    width="80"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-600 border-t border-gray-300 pt-2 select-none">
                        <button className="flex items-center gap-1 hover:text-gray-900">
                            <i className="far fa-thumbs-up"></i>
                            Helpful
                        </button>
                        <span>|</span>
                        <button className="hover:text-gray-900 cursor-pointer flex items-center gap-1">
                            <Pencil size={14} /> Edit
                        </button>
                        <span>|</span>
                        <button className="hover:text-gray-900 cursor-pointer flex items-center gap-1">
                            <Trash2 size={14} /> Delete
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
};


const WishlistTab: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">My Wishlist (0)</h2>
        </div>
    );
};