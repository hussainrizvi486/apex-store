import React from 'react';
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface Product {
    imageUrl: string;
    badge?: string;
    title: string;
    description: string;
    price: string;
    colors: string;
    quantity: string;
    buttonText: string;
}

const frSmallSS: Product[] = [
    {
        imageUrl: 'https://cubeonline.pk/cdn/shop/files/00-600x600_153f55f8-a560-4368-8c30-fe53b85551ee.png?v=1723801084',
        title: 'MX Master 3S',
        description: 'WH-1000XM3 headphones take you even deeper into silence with further improvements to our industry- leading noise cancellation, and smart listening that adjusts to your situation.',
        price: '$119.99',
        colors: 'Colors',
        quantity: 'Quantity',
        buttonText: 'Shop Deals',
    },
]
const FrLargeSS: Product[] = [
    {
        imageUrl: 'https://cubeonline.pk/cdn/shop/files/00-600x600_153f55f8-a560-4368-8c30-fe53b85551ee.png?v=1723801084',
        title: 'MX Master 3S',
        description: 'WH-1000XM3 headphones take you even deeper into silence with further improvements to our industry- leading noise cancellation, and smart listening that adjusts to your situation.',
        price: '$119.99',
        colors: 'Colors',
        quantity: 'Quantity',
        buttonText: 'Add to cart',
    },
]

export const ProductMain = () => {
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false); 
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const FrLargeScreen = () => {
        return (
            <>
                <main className="w-full bg-gray-100 text-gray-900 py-22 px-8 overflow-hidden">
                    {FrLargeSS.map((largeSS) => (
                        <section key={largeSS.title} className="container mx-auto gap-8 items-center flex ">

                            <div className="space-y-2">
                                <p className="text-sm text-gray-400 uppercase tracking-wider">{largeSS.title}</p>

                                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                    ONLY MUSIC. <br className="hidden md:inline" /> NOTHING ELSE.
                                </h1>

                                <p className="text-3xl font-semibold text-violet-500">{largeSS.price}</p>

                                <p className="text-base text-gray-400 leading-relaxed max-w-xl">
                                    {largeSS.description}
                                </p>

                                <div className="flex gap-6 mt-8">
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase">{largeSS.colors}</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <div className="w-7 h-7 rounded-full bg-black border-2 border-gray-800 cursor-pointer flex items-center justify-center">
                                                <span className="w-4 h-4 rounded-full bg-black border border-gray-500"></span>
                                            </div>

                                            <div className="w-7 h-7 rounded-full bg-gray-600 border-2 border-gray-800 cursor-pointer flex items-center justify-center">
                                                <span className="w-4 h-4 rounded-full bg-gray-100 border border-gray-600"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ml-0">
                                        <p className="text-sm text-gray-400 uppercase">{largeSS.quantity}</p>
                                        <div className="flex items-center space-x-3 mt-2">
                                            <button className="bg-gray-700 text-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-gray-600 transition-colors">
                                                -
                                            </button>
                                            <span className="text-lg font-semibold">1</span>
                                            <button className="bg-gray-700 text-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-gray-600 transition-colors">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-8">
                                    <NavLink to="/cart" className="px-6 py-3 bg-violet-500 text-white rounded-full flex items-center gap-3 hover:bg-violet-600 transition-colors text-lg font-semibold cursor-pointer">
                                        {largeSS.buttonText} <ShoppingCart size={20} />
                                    </NavLink>
                                    <NavLink to='/' className="w-12 h-12 flex items-center justify-center border border-gray-700 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer">
                                        <Heart size={24} />
                                    </NavLink>
                                </div>
                            </div>

                            <div className="relative w-160 h-160 lg:w-150 lg:h-150 flex lg: justify-center items-center mt-12">
                                <img
                                    src={largeSS.imageUrl}
                                    alt="Product Headphones"
                                    className='w-full h-full object-contain'
                                />
                            </div>
                        </section>
                    ))}
                </main>
            </>
        );
    };

    const FrSmallScreen = () => {
        const smallSS = frSmallSS[0]; 

        return (
            <>
                <main
                    className="relative w-full h-[calc(100vh-60px)] bg-cover bg-center flex flex-col items-center justify-center text-white text-center p-4"
                    style={{ backgroundImage: `url(${smallSS.imageUrl})` }}
                >
                    <div className="absolute inset-0 bg-black opacity-40"></div>

                    <div className="relative z-10 space-y-4">
                        <p className="text-sm uppercase tracking-wider">{smallSS.title}</p>

                        <h1 className="text-4xl font-bold leading-tight">
                            ONLY MUSIC. <br /> NOTHING ELSE.
                        </h1>

                        <NavLink
                            to="/cart"
                            className="inline-flex items-center gap-3 px-6 py-3 bg-violet-500 text-white rounded-full hover:bg-violet-600 transition-colors text-lg font-semibold cursor-pointer"
                        >
                            {smallSS.buttonText} <ShoppingCart size={20} />
                        </NavLink>
                    </div>
                </main>
            </>
        );
    };

    return (
        <main className="border-b border-gray-200">
            {isLargeScreen ? <FrLargeScreen /> : <FrSmallScreen />}
        </main>
    );
};