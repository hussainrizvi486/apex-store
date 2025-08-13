import React, { useEffect, useState } from 'react';
import { ChevronDown, Trash2, Heart, Lock } from 'lucide-react';
import { useCartItems, CartItemType, useUpdateCartItem } from '../api';
import { CounterButton } from '@components/ui/counter-button';
import { decimal, formatCurrency, integer } from '@utils/index';
import { Header } from '@components/layouts';
import { Button } from '@components/ui/button';


const Index = () => {
  const cartQuery = useCartItems();
  const mi = useUpdateCartItem();
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
      <div className="max-w-7xl mx-auto flex justify-center bg-gray-50">
        <main className="mx-auto px-2 py-4 md:p-8 w-full">
          <div className='mb-2'>
            <h2 className="text-2xl ">Cart</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="rounded-lg">
                <div>
                  {cartQuery.data?.items.length > 0 ? (
                    cartQuery.data?.items.map((data) => (
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
                  <div className="text-lg font-semibold">Summary ({integer(cartQuery?.data?.total_qty) || 0})</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div >Subtotal</div>
                    <div >${parseFloat(cartQuery?.data?.grand_total).toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div >Total Items</div>
                    <div >{integer(cartQuery?.data?.items?.length) || 0}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div >Total Quantity</div>
                    <div >{integer(cartQuery?.data?.total_qty) || 0}</div>
                  </div>

                </div>
                <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                  <h3 className="text-base font-semibold">Total</h3>
                  <span className="text-base font-semibold">${parseFloat(cartQuery.data.grand_total).toFixed(2)}</span>
                </div>

                <Button className='w-full mt-2'>
                  Checkout
                </Button>

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
    <div key={data.id} className="flex flex-col sm:flex-row justify-between bg-white border border-gray-300 p-3 rounded-md mb-2">

      <div className="mb-2 flex gap-2 w-full sm:w-auto sm:mb-0">
        <div className='border border-gray-200 overflow-hidden shrink-0'>
          <img
            src={product.cover_image}
            alt={product.product_name}
            className="h-24 w-24 rounded-md object-contain shadow-sm border"
          />
        </div>

        <div className='flex-auto'>
          <div className="text-sm font-medium line-clamp-2">{product.product_name}</div>
          <div className="text-gray-700 font-semibold mt-2">{formatCurrency(data.price)}</div>
        </div>
      </div>

      <div className="shrink-0 flex flex-row-reverse items-center justify-between sm:block">
        <div className="flex justify-end mb-4">
          <button className="cursor-pointer">
            <Trash2 className="size-6 stroke-red-700" />
          </button>
        </div>
        <CounterButton count={integer(data.quantity || 1)} />
      </div>
    </div >
  )
}



export default Index;