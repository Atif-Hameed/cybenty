import React from 'react';
import { IoCheckmarkSharp } from "react-icons/io5";

const CustomCheckBox = ({ label, isChecked, onChange, name, value }) => {
    return (
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                value={value}
                id={`custom-checkbox-${label}`}
                className="hidden peer"
                checked={isChecked}
                onChange={onChange}
                name={name}
            />
            <label
                htmlFor={`custom-checkbox-${label}`} // Matching label for checkbox
                className="w-5 h-5 relative rounded-sm border border-[#CF9FFF2B] bg-[#CF9FFF0F] cursor-pointer peer-checked:bg-purple flex items-center justify-center"
            >
                {isChecked && (
                    <IoCheckmarkSharp className='text-lg text-white' />
                )}
            </label>
            <p className="text-gray">{label}</p>
        </div>
    );
};

export default CustomCheckBox;
