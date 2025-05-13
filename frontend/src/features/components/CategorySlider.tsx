import React from 'react';

export const CategorySlider = () => {
  interface Category {
    name: string;
  }

  const categories: Category[] = [
    { name: 'Webcams' },
    { name: 'Headsets & Earbuds' },
    { name: 'iPad Keyboard Cases' },
    { name: 'Driving' },
    // Add the rest of your categories here
  ];

  const categoryImage =
    'https://cubeonline.pk/cdn/shop/files/00-600x600_153f55f8-a560-4368-8c30-fe53b85551ee.png?v=1723801084';

  return (
    <div className="py-6">
      <div className="overflow-x-hidden py-2 px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-flow-col auto-cols-min gap-7">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={categoryImage}
                  alt={category.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 text-center break-words line-clamp-1 h-[20px] w-[70px] sm:h-[45px] sm:w-[90px]">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};