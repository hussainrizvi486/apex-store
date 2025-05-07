import React, { useState } from 'react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { NavLink } from 'react-router-dom';
import {  ChevronDown, Trash2, Heart, Lock } from 'lucide-react';
import { ProductHeader } from '@features/components/ProductHeader';


export const CartPage = () => {
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const ImgURL: string =
    'https://resource.logitech.com/w_464,ar_1,c_pad,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/hero-product-banner/hero-combo-touch-for-ipad-keyboard-case-desktop.png';

  return (
    <>
      <ProductHeader />
      <div className="max-w-7xl mx-auto p-4 flex justify-center bg-gray-50">
        <main className="mx-auto p-4 md:p-8 w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-900 text-center pt-6 p-2 ">Your Cart</h1>
                <p className="text-gray-600 text-sm text-center mb-2 p-4 md:p-3 border-b border-gray-200">Review your items below</p>
                <div className="space-y-6 px-4 md:px-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={ImgURL}
                        alt="Product 1"
                        className="h-24 w-24 rounded-md object-cover"
                      />
                      <div className='max-w-[250px] mx-4'>
                        <h3 className="text-md md:text-lg font-semibold text-gray-900">Logitech MX Master 3S</h3>
                        <p className="text-gray-500 text-xs md:text-sm">Performance Wireless Mouse</p>
                        <p className="text-gray-700 font-semibold mt-2">$119.99</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <div className="flex items-center rounded-3xl border border-gray-300">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 rounded-s-2xl hover:bg-gray-100 bg-transparent cursor-pointer"
                        >
                          -
                        </Button>
                        <Input
                          className="w-8 text-center rounded-none border-l-0 border-r-0"
                          placeholder='1'
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 rounded-e-2xl hover:bg-gray-100 bg-transparent cursor-pointer"
                        >
                          +
                        </Button>
                      </div>
                      <div className='flex items-center'>
                        <Button variant="ghost" size="sm" className="text-gray-700 hover:text-red-500 flex items-center gap-1 cursor-pointer">
                          <Trash2 size={20} />
                          <span className="sm:hidden md:inline lg:hidden">Remove</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-500 flex items-center gap-1 cursor-pointer">
                          <Heart size={20}/>
                          <span className="sm:hidden md:inline lg:hidden">Move to Wishlist</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm mt-4 hidden lg:block">
                <NavLink to="/" className="text-blue-500 hover:underline">
                  Continue Shopping
                </NavLink>
              </div>
            </div>


            <div className="w-full lg:w-[35%]">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4 pt-2">
                  <h2 className="text-lg font-semibold">Summary (3)</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setIsPromoOpen(!isPromoOpen)}
                  >
                    <span>{isPromoOpen ? 'Hide' : 'Enter'} your promo code</span>
                    <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isPromoOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
                {isPromoOpen && (
                  <div className="mb-4">
                    <Input placeholder="Enter promo code" className="w-full" />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="text-gray-900 font-medium">$549.97</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Estimated Shipping</span>
                    <span className="text-gray-500">Free - Standard</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Estimated Tax</span>
                    <span className="text-gray-900">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Savings</span>
                    <span className="text-gray-500">$0.00</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                  <h3 className="text-xl font-bold">Total</h3>
                  <span className="text-xl font-bold">$549.97</span>
                </div>
                <div className="mt-4 space-y-2">
                  <Button className="w-full bg-yellow-400 text-gray-900 py-3 rounded-md flex items-center justify-center">
                    <Lock className="mr-2 h-4 w-4" />
                    Klarna.
                  </Button>
                  <div className="text-center text-sm text-gray-600">or</div>
                  <Button className="w-full text-white py-3 rounded-md flex items-center justify-center">
                    CONTINUE TO CHECKOUT
                  </Button>
                </div>
                <div className="mt-6 text-center">
                  <h4 className="text-sm font-medium">We accept</h4>
                  <div className="flex justify-center gap-2 mt-2">
                    <div className="h-6 w-6 bg-gray-500 rounded-sm"></div>
                    <div className="h-6 w-6 bg-blue-500 rounded-sm"></div>
                    <div className="h-6 w-6 bg-black rounded-sm"></div>
                    <div className="h-6 w-6 bg-yellow-500 rounded-sm"></div>
                    <div className="h-6 w-6 bg-gray-500 rounded-sm"></div>
                    <div className="h-6 w-6 bg-blue-700 rounded-sm"></div>
                    <div className="h-6 w-6 bg-gray-800 rounded-sm"></div>
                    <div className="h-6 w-6 bg-red-600 rounded-sm"></div>
                    <div className="h-6 w-6 bg-blue-600 rounded-sm"></div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500 flex flex-col items-center gap-1">
                  <div className='flex items-center gap-1'>
                    <Lock className="h-3 w-3" />
                    <span>Money-Back Guarantee</span>
                  </div>
                  <span>With easy returns</span>
                  <div className='flex items-center gap-1'>
                    <Lock className="h-3 w-3" />
                    <span>Secure Checkout</span>
                  </div>
                  <span>Shopping is always safe and secure</span>
                  <div className="mt-4">
                    <h4 className="font-medium">Need help?</h4>
                    <div className='flex items-center gap-1'>
                      <NavLink to="#" className="underline text-blue-500">Read checkout FAQ</NavLink>
                      or
                      <NavLink to="#" className="underline text-blue-500">Chat with an expert</NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};




