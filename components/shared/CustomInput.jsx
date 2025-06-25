'use client';
import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const CustomInput = ({ type, placeholder, onChange, value, icon, name, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full">
            <div
                tabIndex="0"
                className={`bg-[#CF9FFF0F] w-full py-0.5 flex relative gap-2 justify-between items-center px-3 rounded-lg 
                            ${error ? 'border-2 border-red-500' : 'border-0'} 
                            focus-within:outline-none focus-within:ring-2 ${error ? 'focus-within:ring-red-500' : 'focus-within:ring-[#CF9FFF]'}`}
            >
                <div className="w-fit text-gray text-xl">
                    {icon}
                </div>
                <input
                    type={showPassword && type === 'password' ? 'text' : type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    name={name}
                    className={`flex-1 py-3 px-1 bg-transparent h-full outline-none placeholder:text-gray 
                                ${error ? 'border-red-500' : ''}`}
                />
                {type === 'password' && (
                    <div
                        className="absolute right-3 cursor-pointer text-gray"
                        onClick={handleTogglePassword}
                    >
                        {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default CustomInput;
