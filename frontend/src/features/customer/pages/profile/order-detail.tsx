import React from 'react'
import { Header } from '@components/layouts';
import { Button } from '@components/ui/button'
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const mockData = {
    items: [
        {
            product: {
                name: "Product name ",
                cover_image: "http://localhost:8000/media/products/rs-wheel-hub-pc-front-angle-gallery-1.webp"
            },
            quantity: 1,
            price: 34.00
        }
    ],
    subtotal: 34.00,
    discount: 0,
    shipping: 0,
    total: 39.44,
    customer: {
        name: "David william",
        orders: 0,
        email: "abc@gmail.com",
        phone: "123456789",
        shipping_address: {
            name: "David william",
            city: "North L Chowk",
            street: "L 420",
            zip: "chowk 5656",
            country: "Sindh",
            phone: "123456789"
        }
    },
    billing_address: {
        same_as_shipping: true
    },
};

export const OrdersDetail: React.FC = () => {
    const data = mockData;

    return (
        <>
            <Header />
            <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
                <div className="mb-6">
                    <div className='flex gap-3 items-center p-2'>
                        <Link to='/profile' className='flex items-center'>
                            <ArrowLeft size={22} />
                        </Link>
                        <h2 className="text-lg font-semibold ">Products</h2>
                    </div>
                    {data.items.map((item: any, index: number) => (
                        <div key={index} className="border border-gray-300 rounded mt-4 p-4 flex justify-between items-center">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <div className='h-14 w-14 mr-3 shrink-0 shadow-md'>
                                    <img src={item.product.cover_image} alt={item.product.name} className="h-full w-full object-cover rounded" />
                                </div>
                                <span className="text-sm">{item.product.name}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm">Qty: {item.quantity}</span>
                                <span className="ml-2 text-sm">$ {item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between mb-6">
                    <div className="w-full mb-4 sm:mb-0 border border-gray-300 rounded p-4 flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Payment</h2>
                            <div className="flex flex-col justify-between mb-4 gap-3">
                                <div className="space-y-2 text-sm">
                                    <p className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>Rs {data.subtotal}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Add discount:</span>
                                        <span>{data.discount || '—'}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Add shipping or delivery:</span>
                                        <span>{data.shipping || '—'}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Estimated tax:</span>
                                        <span>GST 16%</span>
                                    </p>
                                </div>

                                <div>
                                    <p className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>$ {data.total}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Button>Buy this again</Button>
                            <Button>Your review</Button>
                        </div>
                    </div>

                    <div className="w-full sm:ml-4 border border-gray-300 rounded p-4">
                        <h2 className="text-lg font-semibold mb-2">Customer</h2>
                        <div className='flex flex-col text-sm gap-1'>
                            <p>{data.customer.name}<span className="text-gray-500 ml-2">({data.customer.orders} orders)</span></p>
                            <p>Contact information: {data.customer.email}</p>
                            <p>Phone: <span>{data.customer.phone || 'No phone number'}</span></p>
                        </div>

                        <h3 className="font-semibold mt-4 mb-2">Shipping address</h3>
                        <div className='text-sm flex flex-col gap-1'>
                            <p>{data.customer.shipping_address.name}</p>
                            <p>{data.customer.shipping_address.city}</p>
                            <p>{data.customer.shipping_address.street}</p>
                            <p>{data.customer.shipping_address.zip}</p>
                            <p>{data.customer.shipping_address.country}</p>
                            <p>{data.customer.shipping_address.phone}</p>
                        </div>

                        <h3 className="font-semibold mt-4 mb-2">Billing address</h3>
                        <p className='text-sm'>{data.billing_address.same_as_shipping ? 'Same as shipping address' : 'Different address'}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

