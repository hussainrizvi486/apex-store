import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const ProductMain = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const imageUrl: string =
        'https://resource.logitech.com/w_464,ar_1,c_pad,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/hero-product-banner/hero-combo-touch-for-ipad-keyboard-case-desktop.png';

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="bg-white ">
                {isMobile ? (
                    <div className="py-6 px-4 sm:px-6 lg:px-8 flex flex-col items-center border-b-2 border-gray-200">
                        <div className="relative aspect-w-16 aspect-h-9 w-full mb-4 rounded-lg overflow-hidden">
                            <img
                                src={imageUrl}
                                alt="Combo Touch for iPad Air"
                                className="max-h-full max-w-full rounded-lg"
                            />
                        </div>
                        <div className="w-full">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2 text-left">
                                Combo Touch for iPad Air
                            </h2>
                            <p className="text-gray-600 mb-3 text-left">
                                <span className="font-semibold">$199.99</span> - $229.99
                            </p>
                            <button className="bg-violet-500 hover:bg-violet-600 text-white font-semibold text-xs py-2.5 px-6 rounded-full text-left">
                                <NavLink to="/cart">
                                    BUY NOW
                                </NavLink>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="pt-12 flex items-center justify-center border-b-2 border-gray-200">
                        <div className="relative max-w-md rounded-lg overflow-hidden">
                            <img
                                src={imageUrl}
                                alt="Combo Touch for iPad Air"
                                className="w-full h-auto object-contain rounded-lg"
                            />
                        </div>
                        <div className="ml-12 flex flex-col justify-center h-ful">
                            <h2 className="text-2xl text-gray-900 mb-4">
                                Combo Touch for iPad Air
                            </h2>
                            <p className="text-md text-gray-600 mb-6">
                                <span className="font-semibold">$199.99</span> - $229.99
                            </p>
                            <button className="bg-violet-500 hover:bg-violet-600 text-white py-2 px-6 rounded-full w-fit curosr-pointer">
                                <NavLink to="/cart">
                                    BUY NOW
                                </NavLink>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};