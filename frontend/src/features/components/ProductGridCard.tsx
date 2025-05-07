import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface Product {
  imageUrl: string;
  badge?: string;
  title: string;
  description: string;
  price: string;
  buttonText: string;
}

const products: Product[] = [
  {
    imageUrl: 'https://resource.logitech.com/e_trim/w_350,h_263,ar_4:3,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/migration-assets-for-delorean-2025/gallery/mx-master-3s-left-profile-view-black.png',
    badge: 'Best Seller',
    title: 'MX Master 3S',
    description: 'Performance Wireless Mouse',
    price: '$119.99',
    buttonText: 'Add to cart',
  },
  {
    imageUrl: 'https://resource.logitech.com/e_trim/w_350,h_263,ar_4:3,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/migration-assets-for-delorean-2025/gallery/mx-master-3s-left-profile-view-black.png',
    badge: 'Special Offer',
    title: 'MX Anywhere 3S',
    description: 'Compact Wireless Performance Mouse',
    price: '$89.99',
    buttonText: 'Add to cart',
  },
  {
    imageUrl: 'https://resource.logitech.com/e_trim/w_350,h_263,ar_4:3,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/migration-assets-for-delorean-2025/gallery/mx-master-3s-left-profile-view-black.png',
    badge: 'Special Offer',
    title: 'MX Master 3S for Mac',
    description: 'Performance Wireless Mouse',
    price: '$119.99',
    buttonText: 'Add to cart',
  },
  {
    imageUrl: 'https://resource.logitech.com/e_trim/w_350,h_263,ar_4:3,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/migration-assets-for-delorean-2025/gallery/mx-master-3s-left-profile-view-black.png',
    badge: 'Special Offer',
    title: 'MX Anywhere 3S for Mac',
    description: 'Compact Wireless Performance Mouse',
    price: '$89.99',
    buttonText: 'Add to cart',
  },
  {
    imageUrl: 'https://resource.logitech.com/e_trim/w_350,h_263,ar_4:3,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/migration-assets-for-delorean-2025/gallery/mx-master-3s-left-profile-view-black.png',
    badge: 'Best Seller',
    title: 'MX Ergo S',
    description: 'Elevate your comfort and precision with MX Ergo S',
    price: '$119.99',
    buttonText: 'Buy now',
  },
  {
    imageUrl: 'https://resource.logitech.com/e_trim/w_350,h_263,ar_4:3,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/migration-assets-for-delorean-2025/gallery/mx-master-3s-left-profile-view-black.png',
    badge: 'Low Inventory',
    title: 'MX Anywhere 3 for Mac',
    description: 'Compact Performance Mouse',
    price: '$79.99',
    buttonText: 'Add to cart',
  },
];

export const ProductGridCard = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="rounded-xl overflow-hidden md:col-span-2 lg:col-span-2">
            <div className="bg-red-100 rounded-xl p-6 flex flex-col justify-center h-full">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Mice</h2>
              <p className="text-gray-600 text-sm mb-4">
                Shop wireless and wired mice. Choose from the Bluetooth®, performance,
                ergonomic, business, EDU, travel, compact, and WFH product range.
              </p>
              <div className="w-full h-48 bg-red-200 rounded-md overflow-hidden">
                <img
                  src="https://resource.logitech.com/e_trim/w_350,h_263,ar_4:3,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/migration-assets-for-delorean-2025/gallery/mx-master-3s-left-profile-view-black.png"
                  alt="Featured Mouse"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {products.map((product, index) => (
            <div key={product.title} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-contain p-4"
                />
                {product.badge && (
                  <div className={`absolute top-2 left-2 text-xs font-semibold rounded-full px-2 py-1 ${product.badge === 'Best Seller' ? 'bg-blue-100 text-blue-700' :
                      product.badge === 'Special Offer' ? 'bg-green-100 text-green-700' :
                        product.badge === 'Low Inventory' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-200 text-gray-700'
                    }`}>
                    {product.badge}
                  </div>
                )}
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                  <Heart size={16}/>
                </button>
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 tracking-tight mb-1">{product.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.description}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{product.price}</p>
                  <button className="text-xs text-gray-700 hover:text-gray-900 flex items-center gap-1.5">
                    <NavLink to="/cart">
                      {product.buttonText}
                    </NavLink>
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
