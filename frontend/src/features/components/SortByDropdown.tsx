import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react'; 

interface SortByDropdownProps {
    onSortChange: (newSortOption: string) => void; 
    initialSort?: string; 
}

const SortByDropdown: React.FC<SortByDropdownProps> = ({ onSortChange, initialSort = 'Featured' }) => {
    // useState hooks ko explicitly type karein
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(initialSort);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const sortOptions: string[] = [
        'New',
        'Name',
        'Price - Low to High',
        'Price - High to Low',
        'Best Sellers',
        'Featured'
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => { 
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option: string) => { 
        setSelectedOption(option);
        setIsOpen(false);
        if (onSortChange) {
            onSortChange(option);
        }
    };

    return (
        <div className="relative z-10" ref={dropdownRef}>
            <button
                className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-xs font-semibold text-gray-700   cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                SORT BY: {selectedOption.toUpperCase()}
                <ChevronDown size={15} className="ml-2" />
            </button>

            {isOpen && (
                <div className="absolute right-0 left-0 mt-1 w-42 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    <div className="py-1">
                        {sortOptions.map((option: string) => ( 
                            <div
                                key={option}
                                className={`block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100
                                    ${selectedOption === option ? 'bg-gray-100 font-medium' : ''}`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortByDropdown;