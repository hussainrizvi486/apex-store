
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@components/ui/tabs';
import React, { useEffect, useState } from 'react';
import { getAddressQuery, AddressType } from "@features/auth/api/address";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@components/ui/dialog';

import { ChevronDown, X as CloseIcon, Menu as MenuIcon, Star, XIcon, SquarePenIcon, UserIcon, BookmarkIcon, TruckIcon, StarIcon, HeartIcon, LogOut, MapPinPlusIcon, Pencil, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { authAPI } from '@features/auth/api';
import moment from 'moment';
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { Link } from 'react-router-dom';
import { Tuple } from '@reduxjs/toolkit';


export interface ProfileType {
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    profilePicture?: string;
}

const DEFAULT_PROFILE_IMAGE = 'https://cdn-icons-png.flaticon.com/512/6997/6997662.png';

const EditProfile = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <SquarePenIcon size={16} className='md:hidden' />
                    <Button className='hidden md:block'>Edit Profile</Button>
                </div>
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
        <div className='max-w-6xl mx-auto pt-6 md:p-6 '>
            <div className='mb-4'>
                <div className='flex justify-between items-center my-2'>
                    <div className="text-lg md:text-xl font-semibold">Address Book</div>
                </div>
                <p className="text-xs md:text-sm text-gray-500">Manage your shipping and billing addresses.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {data?.map((address) => (
                    <AddressCard key={address.id} data={address} />
                ))}
            </div>
            <div className='flex justify-end sm:justify-start'>
                <Link to={"/profile/address/add"}>
                    <Button>Add Address</Button>
                </Link>
            </div>

        </div>
    );
};

const Header = () => {
    const [open, setOpen] = useState(false);
    const sidebarRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <div className='absolute right-0 top-0 pr-2 sm:pr-4 pt-3 sm:py-4 z-40'>
            <button
                onClick={() => setOpen(true)}
                className="md:hidden cursor-pointer p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Open menu"
            >
                <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>

            {open && (
                <div className="fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300" />
            )}

            <div
                className={`fixed top-0 right-0 w-[280px] xs:w-[300px] sm:w-80 h-[100dvh] overflow-y-auto shadow-xl z-50 bg-gray-800 text-white transition-all duration-300 ease-in-out transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
                ref={sidebarRef}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h2 className="text-xl font-semibold">My Account</h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        aria-label="Close menu"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to=""
                                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                                onClick={() => setOpen(false)}
                            >
                                <UserIcon className="w-5 h-5 mr-3" />
                                <span className="text-base">Your Account</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to=""
                                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                                onClick={() => setOpen(false)}
                            >
                                <BookmarkIcon className="w-5 h-5 mr-3" />
                                <span className="text-base">Address Book</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to=""
                                className="flex items-center  p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                                onClick={() => setOpen(false)}
                            >
                                <TruckIcon className="w-5 h-5 mr-3" />
                                <span className="text-base">My Orders</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to=""
                                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                                onClick={() => setOpen(false)}
                            >
                                <StarIcon className="w-5 h-5 mr-3" />
                                <span className="text-base">My Reviews</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to=""
                                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                                onClick={() => setOpen(false)}
                            >
                                <HeartIcon className="w-5 h-5 mr-3" />
                                <span className="text-base">Wishlist</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
                    <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
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
            <Header />
            <div className='mx-auto max-w-6xl px-2 sm:px-6 lg:px-8'>
                <div className='py-4'>
                    <Tabs defaultValue="orders">
                        <TabsList
                            className='py-6 w-full  md:overflow-x-visible overflow-x-auto overflow-y-hidden scrollbar-hide hidden md:flex'
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
        <div className="border border-gray-300 rounded-lg shadow-lg p-4 relative bg-white">

            <div className="mb-4">
                <span className="text-lg font-semibold text-gray-800">{data?.title}</span>
            </div>
            <div className="text-sm text-gray-700">
                <p>{data?.address_line_1} {data?.address_line_2}</p>
                <p>{data?.city}, {data?.state} {data?.postal_code}</p>
                <p>{data?.country}</p>
            </div>
            <div className="flex justify-end space-x-2">
                <button className="text-gray-600 hover:text-gray-800 transition duration-200 flex text-xs gap-1 items-center">
                    <Pencil className='w-4 h-4' /> <span>Edit</span>
                </button>
                <span className='text-gray-600'>|</span>
                <button className="text-gray-600 hover:text-red-600 transition duration-200 flex text-xs gap-1 items-center">
                    <Trash2 className='w-4 h-4' /> <span >Delete</span>
                </button>
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
        <div className="max-w-6xl mx-auto md:p-6">
            <div className="flex flex-col sm:flex-row items-center space-x-0 border-b border-gray-200 p-3 mb-5">
                <label htmlFor="imageUpload" className="cursor-pointer flex-shrink-0 mb-2 md:mb-4">
                    <img
                        src={user.profilePicture || DEFAULT_PROFILE_IMAGE}
                        alt="Profile"
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover hover:opacity-80 transition"
                    />
                    <input id="imageUpload" type="file" accept="image/*" className="hidden" />
                </label>
                <div className="text-center sm:text-left sm:ml-4 relative">
                    <h1 className="flex gap-2 md:text-4xl text-2xl font-semibold text-gray-900">
                        {profile.first_name} {profile.last_name}<span className="md:hidden mt-2"><EditProfile /></span>
                    </h1>
                    <p className="mt-1 md:text-sm text-xs text-gray-500">{profile.email}</p>
                </div>
            </div>

            <div className="flex md:hidden">
                <h2 className="text-xl font-semibold text-gray-900">Your Account</h2>
            </div>

            <div className="hidden md:flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-gray-900">Your Account</h2>
                <div>
                    <EditProfile />
                </div>
            </div>

            <p className="text-sm text-gray-600 md:text-base mb-5 md:mb-8 ">
                Manage your profile information.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2 md:gap-x-6 md:gap-y-4 ">
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
        <div className="max-w-6xl mx-auto py-4 md:p-6 ">
            <h2 className="text-lg font-semibold mb-4">My Orders</h2>
            {data && data.length > 0 ? (
                data.map((order: any) => (
                    <div
                        key={order.id}
                        className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm"
                    >
                        <div className="flex justify-between md:items-center mb-3">
                            <div>
                                <div className="text-xs md:text-sm text-gray-500">Order ID</div>
                                <div className="text-xs md:font-medium">{order.order_id}</div>
                            </div>
                            <div className="text-xs md:text-sm text-gray-500">
                                {moment(order.order_date).format('MMMM Do YYYY, h:mm:ss a')}
                            </div>
                        </div>
                        <div className="mb-2 text-xs md:text-sm flex flex-col md:flex-row gap-1 ">
                            <div><strong>Total Quantity:</strong> {order.total_qty}</div><div className='hidden md:block'>|</div><div><strong>Total Amount:</strong> ${order.total_amount}</div>
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
                                            <div className="font-medium text-xs md:text-sm">{item.product.name}</div>
                                        </div>
                                        <div className="text-xs text-gray-600 mt-2 flex flex-col sm:flex-row gap-1">
                                            <div>Qty: {item.quantity}</div><span className='hidden sm:block'>|</span><div>Price: ${item.price}</div><span className='hidden sm:block'>|</span><div>Amount: ${item.amount}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Link to={"/profile/orders/detail"}>
                                <Button className='text-xs sm:text-sm '>Order Details</Button>
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
        <div className="max-w-6xl mx-auto py-4 md:p-6 ">
            <h2 className="text-lg font-semibold mb-4">My Reviews ({reviewsData.length})</h2>
            {reviewsData.map(review => (
                <div key={review.id} className="border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
                    <div className="flex gap-3 items-center bg-gray-100 rounded-xl p-3 mb-3">
                        <img
                            alt={review.productTitle}
                            className="w-15 h-15 object-cover"
                            src={review.productImage}
                        />
                        <div className="flex flex-col justify-center text-sm leading-tight max-h-[50px] md:h-auto overflow-hidden">
                            <p className="text-gray-900 md:h-auto whitespace-nowrap overflow-hidden text-ellipsis">
                                {review.productTitle} - {review.productDetails}
                            </p>
                            <p className="flex flex-col gap-1 md:flex-row text-gray-600 mt-0.5 text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                                Black / Label size:
                                <span className="text-gray-400 text-xs"> {review.sizeLabel}</span>
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between mb-2'>
                        <div className="flex items-center gap-2 text-xs md:text-sm">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star size={18} /> <span>{review.rating}</span>
                            </div>
                            <div className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {review.satisfactionText}
                            </div>
                        </div>

                        <div className="text-xs text-gray-500 select-none">
                            {review.date}
                        </div>
                    </div>

                    <p className="text-sm my-3">{review.reviewText}</p>

                    <div className="flex gap-2 flex-wrap">
                        {review.reviewImages.map((image, index) => (
                            <div className="relative w-15 h-15 sm:w-20 sm:h-20 flex-shrink-0 border border-gray-300 rounded mb-2" key={index}>
                                <img
                                    alt="Review image"
                                    className="w-full h-full object-cover"
                                    src={image}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


const WishlistTab: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto py-4 md:p-6">
            <h2 className="text-lg font-semibold mb-4">My Wishlist (0)</h2>
        </div>
    );
};