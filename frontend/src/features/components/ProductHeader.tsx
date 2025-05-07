import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingCart, User, X, Globe, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Input } from '@components/ui/input';

export const ProductHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1000);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const LargeScreenHeader = () => {
    return (
      <>
        <div className="bg-gray-100 border-b border-gray-200 text-sm">
          <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
            <div className="flex gap-4">
              <NavLink to="/" className="text-gray-800 hover:text-gray-900">
                ApexSoftware
              </NavLink>
              <span className="text-gray-400">|</span>
              <NavLink to="#" className="text-gray-600 hover:text-gray-900">
                Business
              </NavLink>
              <span className="text-gray-400">|</span>
              <NavLink to="#" className="text-gray-600 hover:text-gray-900">
                Education
              </NavLink>
            </div>
            <div className="flex items-center gap-2">
              <NavLink to="#" className="text-gray-600 hover:text-gray-900">
                Support
              </NavLink>
              <span className="text-gray-400">|</span>
              <Globe size={16} className="text-gray-600" />
              <span className='text-xs'>US, EN</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <NavLink to="/" className="text-[1.25rem] font-bold">
            <span className="text-violet-500">Apex</span>
            <span className='font-normal'>Store</span>
          </NavLink>

          <div className="flex items-center justify-between flex-grow">
            {/* Nav Links */}
            <div className="flex items-center gap-7 ml-4">
              <NavLink to="/" className="text-gray-700 font-semibold hover:text-gray-900">
                Shop
              </NavLink>
              <NavLink to="#" className="text-gray-700 font-semibold hover:text-gray-900">
                Planet & People
              </NavLink>
              <NavLink to="#" className="text-gray-700 font-semibold hover:text-gray-900">
                Software
              </NavLink>
              <NavLink to="#" className="text-gray-700 font-semibold hover:text-gray-900">
                Deals
              </NavLink>
            </div>
            {/* Searchbar and Icons */}
            <div className="flex items-center gap-6  ">
              <div className="flex items-center rounded-md bg-gray-100 p-2">
                <Input type="text" placeholder="Search..." className="h-7 w-50 border-none bg-transparent focus:outline-none" />
                <Search size={18} className="text-gray-600" />
              </div>
              <Heart size={20} className="text-gray-600" />
              <NavLink to="/login">
                <User size={20} className="text-gray-600" />
              </NavLink>
              <NavLink to="/cart">
                <ShoppingCart size={20} className="text-gray-600" />
              </NavLink>
            </div>
          </div>
        </div>
      </>
    );
  };

  const SmallScreenHeader = () => {
    return (
      <>
        <div className="flex justify-between items-center p-4">
          {/* Logo */}
          <NavLink to="/" className="text-[1.25rem] font-bold">
            <span className="text-violet-500">Apex</span>
            <span className='font-normal'>Store</span>
          </NavLink>

          {/* Menu Button */}
          <div className="flex items-center gap-6">
            <Search size={18} className='text-gray-600' />
            <NavLink to="/login">
              <User size={20} className='text-gray-600' />
            </NavLink>
            <NavLink to="/cart">
              <ShoppingCart size={20} className='text-gray-600' />
            </NavLink>
            <button onClick={() => setMenuOpen(true)}>
              <Menu size={20} className='text-gray-600' />
            </button>
          </div>
        </div>

        {/* Sidebar Menu  */}
        <div
          className={`fixed top-0 right-0 h-full w-90 bg-gray-50 z-50 shadow-xl transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="absolute top-0 left-0 h-full w-1 bg-violet-500" />

          <div className="flex flex-col h-full justify-between">
            <div className='flex flex-col gap-5'>
              <div>
                {/* Close Button */}
                <div className="flex justify-end p-4">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X size={22} className="text-gray-600" />
                  </button>
                </div>

                {/* Menu Items */}
                <ul className="space-y-3 px-7 font-medium text-gray-900">
                  <li className="py-1.5">
                    <NavLink to="/">
                      Shop
                    </NavLink>
                  </li>
                  <li className="py-1.5">
                    <NavLink to="#">
                      Shop by category
                    </NavLink>
                  </li>
                  <li className="py-1.5">
                    <NavLink to="#">
                      Interest
                    </NavLink>
                  </li>
                  <li className="py-1.5">
                    <NavLink to="#">
                      Planet & People
                    </NavLink>
                  </li>
                  <li className="py-1.5">
                    <NavLink to="#">
                      Software
                    </NavLink>
                  </li>
                  <li className="py-1.5">
                    <NavLink to="#">
                      Deals
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* Middle Section */}
              <div className="px-6 pt-4 border-t border-gray-200 space-y-1.5.5 text-sm">
                <div className="font-medium text-gray-700 pb-3">Apex Store</div>
                <div className="text-gray-500 pb-1.5">Business</div>
                <div className="text-gray-500 pb-1.5">Education</div>
                <div className="text-gray-500 border-y py-3 border-gray-200">Support</div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="px-6 py-4 border-t border-gray-200 text-sm flex justify-between items-center text-gray-900">
              <div className="flex items-center gap-1.5">
                <Globe size={20} className="text-gray-600" />
                <span>US, EN</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart size={20} className="text-gray-600" />
                <span>Wishlist</span>
              </div>
            </div>
          </div>
        </div >
      </>
    );
  };

  return (
    <header className="border-b border-gray-200">
      {isLargeScreen ? <LargeScreenHeader /> : <SmallScreenHeader />}
    </header>
  );
};












