
import React from 'react';
import { cn } from "@utils/index";


const Section: React.FC<{
    children: React.ReactNode;
    label: string;
}> = ({ children, label }) => (
    <div className="mb-6 border-b border-gray-300 pb-6 ">
        <h2 className="text-base font-semibold mb-4">{label}</h2>
        <div className='flex gap-2'>
            {children}
        </div>
    </div>
);

const Column: React.FC<{ children: React.ReactNode, columnsLength: number }> = ({ children }) => (
    <div className="basis-full">
        {children}
    </div>
);


export { Section, Column };