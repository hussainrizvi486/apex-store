import React, { useState } from 'react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { NavLink } from 'react-router-dom';
import { ChevronDown, Trash2, Heart, Lock } from 'lucide-react';
import { ProductHeader } from '@features/components/ProductHeader';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api';
import { useAuth } from '@features/auth/hooks';
import { CounterButton } from '@components/ui/counter-button';
import { decimal, formatCurrency } from '@utils/index';
import { Header } from '@components/layouts';


export const CartPage = () => {
  const cartQuery = useQuery({
    queryKey: ['get_cart'],
    queryFn: getCart,
  });

  const cart = cartQuery.data || { items: [], grand_total: "0.00", total_qty: "0" };
  const [isPromoOpen, setIsPromoOpen] = useState(false);

  // Show loading state while cart data is being fetched
  if (cartQuery.isLoading) {
    return (
      <>
        <div className="max-w-7xl mx-auto p-4 flex justify-center bg-gray-50">
          <div className="text-center py-16">Loading your cart...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-4 flex justify-center bg-gray-50">
        <main className="mx-auto p-4 md:p-8 w-full">
          <div className='mb-2'>
            <h2 className="text-2xl ">Cart</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="rounded-lg">
                <div>
                  {cart?.items.length > 0 ? (
                    cart?.items.map((data) => (
                      <>
                        <CartItem data={data} />
                      </>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  )}

                </div>
              </div>

            </div>

            <div className="w-full lg:w-[35%]">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4 pt-2">
                  <h2 className="text-lg font-semibold">Summary ({cart.total_qty || 0})</h2>
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
                    <span className="text-gray-900 font-medium">${parseFloat(cart.grand_total).toFixed(2)}</span>
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
                  <span className="text-xl font-bold">${parseFloat(cart.grand_total).toFixed(2)}</span>
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


const CartItem = ({ data }) => {
  const { product } = data;
  return (
    <div key={data.id} className="flex flex-col sm:flex-row justify-between bg-white border border-gray-300 p-3 rounded-md">
      <div className="flex gap-2 w-full sm:w-auto">

        <div className='border border-gray-200 overflow-hidden shrink-0'>
          <img
            src={product.cover_image}
            alt={product.product_name}
            className="h-24 w-24 rounded-md object-contain"
          />
        </div>

        <div className='flex-auto'>
          <div className="text-sm font-medium line-clamp-2">{product.product_name}</div>
          <div className="text-gray-700 font-semibold mt-2">{formatCurrency(data.price)}</div>
        </div>
      </div>


      <div className='shrink-0'>
        <div className='flex justify-end mb-4'>
          <button className='cursor-pointer'>
            <Trash2 className='size-6 stroke-red-700' />
          </button>
        </div>
        <CounterButton />
      </div>
    </div >
  )
}
