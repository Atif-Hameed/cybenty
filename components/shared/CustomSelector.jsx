'use client'
import { LinesIcon } from '@/svgs';
import { useState, useRef, useEffect } from 'react';

const CustomSelector = ({
    options = [],
    value,
    onChange,
    defaultLabel = 'Select an Option',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef(null);

    // Handle dropdown close when clicking outside the component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectorRef.current && !selectorRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option) => {
        onChange(option); // Trigger onChange with the selected option (object with subCategory and subCategoryId)
        setIsOpen(false); // Close dropdown
    };

    return (
        <div className="relative inline-block w-full" ref={selectorRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full border gap-4 flex justify-between sm:text-base text-sm rounded-lg items-center  py-3 md:px-6 sm:px-4 px-2 text-left transition-colors ${isOpen ? 'bg-orangeMain text-white border-orangeMain' : 'bg-white border-bordered text-gray'
                    }`}
            >
                {/* Display the selected subCategory name or defaultLabel */}
                {value?.subCategory || defaultLabel}
                <span className="float-right mt-1">
                    {
                        isOpen ?
                            <LinesIcon color={'#fff'} />
                            :
                            <LinesIcon color={'#777777'} />
                    }
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full max-h-60 select-scroll overflow-auto bg-white rounded-lg shadow-lg">
                    <ul className="">
                        {options.map((option) => (
                            <li
                                key={option.subCategoryId} // Use subCategoryId as key
                                onClick={() => handleSelect(option)} // Pass the entire option (object) to handleSelect
                                className={`cursor-pointer px-4 py-2 text-sm hover:bg-orangeMain hover:text-white ${value?.subCategoryId === option.subCategoryId ? 'bg-orangeMain text-white' : 'text-black'
                                    }`}
                            >
                                {option.subCategory} {/* Display subCategory name */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomSelector;
