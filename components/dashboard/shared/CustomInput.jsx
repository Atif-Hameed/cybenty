'use client';
import React, { useState } from 'react';
import { FaEnvelope } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const CustomInput = ({ type, placeholder, onChange, value, icon, name }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            tabIndex="0"
            className="bg-[#CF9FFF0F] w-full py-0.5 flex relative  focus-within:outline gap-2 focus-within:outline-2 focus-within:outline-[#CF9FFF] justify-between items-center px-3 rounded-lg"
        >
            <div className="w-fit text-gray text-xl">
                {icon}
            </div>
            <input
                type={showPassword ? 'text' : type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                name={name}
                className="flex-1 py-3 px-1 bg-transparent h-full outline-none placeholder:text-gray " 
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
    );
};

export default CustomInput;
