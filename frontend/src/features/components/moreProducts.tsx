import React from 'react';
import { useState, useEffect,} from 'react';
import '../style.css'
import { Button } from '@components/ui/button';
import { Filter, Flame, Minus, ThumbsUp, Plus, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Input } from '@components/ui/input';
import { Checkbox } from '@radix-ui/react-checkbox';
import SortByDropdown from './SortByDropdown';
import { ProductGridCard } from './ProductGridCard';

const MoreProducts = () => {
    const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
    const [isDesktopSideMenuOpen, setIsDesktopSideMenuOpen] = useState(false);
    const [isMdScreen, setIsMdScreen] = useState(false);

    const [isConnectivityExpanded, setIsConnectivityExpanded] = useState(true);
    const [isSeriesExpanded, setIsSeriesExpanded] = useState(true);
    const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(true);
    const [isSortByExpanded, setIsSortByExpanded] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMdScreen(window.innerWidth >= 768);
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleFilterClick = () => {
        if (isMdScreen) {
            setIsDesktopSideMenuOpen((prev) => !prev);
            if (isMobileFilterVisible) setIsMobileFilterVisible(false);
        } else {
            setIsMobileFilterVisible((prev) => !prev);
            if (isDesktopSideMenuOpen) setIsDesktopSideMenuOpen(false);
        }
    };

    return (
        <>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center px-8 py-4 gap-5 justify-between">
                        <div className="flex items-center cursor-pointer" onClick={handleFilterClick}>
                            <Filter height={16} />
                            <div className="text-sm">Filter</div>
                        </div>
                        <div className="flex items-center gap-2 ">
                            <NavLink
                                to="#"
                                className={({ isActive }) => (isActive ? "color-change" : "")}
                            >
                                <div className="flex">
                                    <div className="text-xs">Best Match</div>
                                    <div>
                                        <ThumbsUp height={11} />
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink
                                to="#"
                                className={({ isActive }) => (isActive ? "color-change" : "")}
                            >
                                <div className="flex gap">
                                    <div className="text-xs">Sale</div>
                                    <div className="text-xs">
                                        <Flame height={12} />
                                    </div>
                                </div>
                            </NavLink>
                            <SortByDropdown/>
                        </div>
                    </div>
                    <div className="border-b border-gray-200 mb-3 mx-8" />

                    <div className={`filter-box ${isMobileFilterVisible ? "visible" : "hidden"} md:hidden`}>
                        <div className="flex items-center gap-1 mt-2 mb-4 cursor-pointer">
                            <div className="flex items-center gap-1">
                                <Input
                                    placeholder="Min"
                                    type="number"
                                    className="min-max-input text-xs"
                                />
                                <Minus className="text-xs text-gray-400" />
                                <Input
                                    placeholder="Max"
                                    type="number"
                                    className="min-max-input text-xs"
                                />
                            </div>
                            <Button className="ok-btn">Ok</Button>
                        </div>
                    </div>

                    <div>
                        <ProductGridCard/>
                    </div>
                </div>
            </div>

            {isDesktopSideMenuOpen && (
                <div
                    className="fixed inset-0 z-40 hidden md:block"
                    onClick={() => setIsDesktopSideMenuOpen(false)}
                ></div>
            )}

            <div
                className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-hidden
                    ${isDesktopSideMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                    hidden md:block`}
            >
                <div className="p-4 flex flex-col h-full relative">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b">
                        <div>
                            <NavLink to="/" className="text-[1.25rem] font-bold">
                                <span className="text-violet-500">Apex</span>
                                <span className='font-normal'>Store</span>
                            </NavLink>
                        </div>
                        <div className="cursor-pointer p-1 hover:bg-gray-100 rounded-full" onClick={() => setIsDesktopSideMenuOpen(false)}>
                            <X size={20} className="text-gray-600" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-5">Filter Options</h3>

                    <div className="flex-grow overflow-y-auto pb-20 hide-scrollbar">

                        <div className="mb-4">
                            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsSortByExpanded(prev => !prev)}>
                                <h4 className="font-semibold text-gray-800 uppercase text-sm">Sort By</h4>
                                {isSortByExpanded ? <Minus size={16} className="text-gray-600" /> : <Plus size={16} className="text-gray-600" />}
                            </div>
                            {isSortByExpanded && (
                                <div className="mt-2 space-y-2">
                                    <div className="text-sm text-gray-700 cursor-pointer hover:text-blue-600">Best Match</div>
                                    <div className="text-sm text-gray-700 cursor-pointer hover:text-blue-600">New</div>
                                    <div className="text-sm text-gray-700 cursor-pointer hover:text-blue-600">Name</div>
                                    <div className="text-sm text-gray-700 cursor-pointer hover:text-blue-600">Price - Low to High</div>
                                    <div className="text-sm text-gray-700 cursor-pointer hover:text-blue-600">Price - High to Low</div>
                                    <div className="text-sm text-gray-700 cursor-pointer hover:text-blue-600">Best Sellers</div>
                                </div>
                            )}
                        </div>
                        <div className="border-b border-dashed border-gray-300 my-4"></div>

                        <div className="mb-4">
                            <h4 className="font-semibold text-gray-800 uppercase text-sm">Featured</h4>
                        </div>
                        <div className="border-b border-dashed border-gray-300 my-4"></div>

                        <div className="mb-4">
                            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsConnectivityExpanded(prev => !prev)}>
                                <h4 className="font-semibold text-gray-800 uppercase text-sm">Connectivity</h4>
                                {isConnectivityExpanded ? <Minus size={16} className="text-gray-600" /> : <Plus size={16} className="text-gray-600" />}
                            </div>
                            {isConnectivityExpanded && (
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center">
                                        <Checkbox className="h-4 w-4 text-blue-600 border-gray-300 rounded  cursor-pointer" />
                                        <label htmlFor="lightspped-wireless" className="ml-2 text-sm text-gray-700 cursor-pointer">LIGHTSPEED Wireless</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox className="h-4 w-4 text-blue-600 border-gray-300 rounded  cursor-pointer" />
                                        <label htmlFor="wired" className="ml-2 text-sm text-gray-700 cursor-pointer">Wired</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox className="h-4 w-4 text-blue-600 border-gray-300 rounded  cursor-pointer" />
                                        <label htmlFor="bluetooth" className="ml-2 text-sm text-gray-700 cursor-pointer">Bluetooth</label>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="border-b border-dashed border-gray-300 my-4"></div>

                        <div className="mb-4">
                            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsSeriesExpanded(prev => !prev)}>
                                <h4 className="font-semibold text-gray-800 uppercase text-sm">Series</h4>
                                {isSeriesExpanded ? <Minus size={16} className="text-gray-600" /> : <Plus size={16} className="text-gray-600" />}
                            </div>
                            {isSeriesExpanded && (
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center">
                                        <Checkbox className="h-4 w-4 text-blue-600 border-gray-300 rounded  cursor-pointer" />
                                        <label htmlFor="pro-series" className="ml-2 text-sm text-gray-700 cursor-pointer">PRO Series</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox className="h-4 w-4 text-blue-600 border-gray-300 rounded  cursor-pointer" />
                                        <label htmlFor="g-series" className="ml-2 text-sm text-gray-700 cursor-pointer">G Series</label>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="border-b border-dashed border-gray-300 my-4"></div>

                        <div className="mb-4">
                            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsFeaturesExpanded(prev => !prev)}>
                                <h4 className="font-semibold text-gray-800 uppercase text-sm">Features</h4>
                                {isFeaturesExpanded ? <Minus size={16} className="text-gray-600" /> : <Plus size={16} className="text-gray-600" />}
                            </div>
                            {isFeaturesExpanded && (
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center">
                                        <Checkbox className="h-4 w-4 text-blue-600 border-gray-300 rounded  cursor-pointer" />
                                        <label htmlFor="lightsync-rgb" className="ml-2 text-sm text-gray-700 cursor-pointer">LIGHTSYNC RGB</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox className="h-4 w-4 text-blue-600 border-gray-300 rounded  cursor-pointer" />
                                        <label htmlFor="powerplay-wireless-charging" className="ml-2 text-sm text-gray-700 cursor-pointer">POWERPLAY Wireless Charging</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox className="h-4 w-4 text-blue-600 border-gray-300 rounded  cursor-pointer" />
                                        <label htmlFor="lightforce-hybrid-switches" className="ml-2 text-sm text-gray-700 cursor-pointer">LIGHTFORCE Hybrid Switches</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox className="h-4 w-4 text-blue-600 border-gray-300 rounded  cursor-pointer" />
                                        <label htmlFor="8khz-report-rate" className="ml-2 text-sm text-gray-700 cursor-pointer">8 kHz Report Rate</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox className="h-4 w-4 text-blue-600 border-gray-300 rounded  cursor-pointer" />
                                        <label htmlFor="onboard-memory-profiles" className="ml-2 text-sm text-gray-700 cursor-pointer">Onboard Memory Profiles</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox className="h-4 w-4 text-blue-600 border-gray-300 rounded  cursor-pointer" />
                                        <label htmlFor="ambidextrous-design" className="ml-2 text-sm text-gray-700 cursor-pointer">Ambidextrous Design</label>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="border-b border-dashed border-gray-300 my-4"></div>

                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-300 shadow-lg">
                        <Button
                            onClick={() => setIsDesktopSideMenuOpen(false)}
                            className="w-full bg-gray-800 hover:bg-gray-700 text-white text-sm"
                        >
                            Save Filters
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MoreProducts;