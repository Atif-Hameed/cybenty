'use client'
import React, { useState } from 'react';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const AdvancedSettings = ({ formData, onInputChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Toggle the password view
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full mt-8 mx-auto border rounded-lg border-[#AFB8B2] shadow-sm">
            {/* Dropdown Header */}
            <div
                className={`flex justify-between bg-[#E5E5E514] items-center p-4 cursor-pointer ${isOpen ? 'border-b border-[#AFB8B2]' : ''}`}
                onClick={toggleDropdown}
            >
                <h3 className="lg:text-2xl md:text-xl font-medium text-gray">More Settings</h3>
                <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1799 12.1288L25.9183 0.96549C26.0322 0.856404 26.168 0.770205 26.3176 0.711999C26.4671 0.653792 26.6275 0.624761 26.789 0.626626C26.9506 0.628491 27.1101 0.661214 27.2582 0.722856C27.4062 0.784498 27.5398 0.873806 27.6509 0.98549C27.8786 1.21393 28.0038 1.51793 27.9999 1.83288C27.996 2.14783 27.8633 2.44891 27.6299 2.67215L15.0235 14.6604C14.9104 14.7689 14.7757 14.8548 14.6273 14.9131C14.4789 14.9714 14.3198 15.0009 14.1593 15C13.9988 14.999 13.8401 14.9677 13.6925 14.9076C13.5449 14.8476 13.4113 14.7602 13.2996 14.6504L0.357076 2.03215C0.128019 1.80626 0 1.50451 0 1.19049C0 0.876472 0.128019 0.574719 0.357076 0.348827C0.469633 0.238453 0.604304 0.150709 0.753113 0.0907909C0.901922 0.0308732 1.06184 0 1.22341 0C1.38497 0 1.54489 0.0308732 1.6937 0.0907909C1.84251 0.150709 1.97718 0.238453 2.08974 0.348827L14.1799 12.1288Z" fill="#777777" />
                </svg>
            </div>

            {/* Dropdown Content */}
            {isOpen && (
                <div className="p-4">
                    <div className='flex flex-col gap-6'>
                        <div>
                            <h1 className='text-gray mb-2'>Password</h1>
                            <div className='relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className='bg-[#FDFDFD] border border-bordered w-full p-3 outline-none  rounded-lg'
                                    value={formData.password}
                                    onChange={onInputChange}
                                    placeholder='Enter password'
                                />
                                {/* Eye icon */}
                                <span
                                    className='absolute right-3 top-3 cursor-pointer'
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <IoMdEye className='text-gray text-lg' />
                                    ) : (
                                        <IoMdEyeOff className='text-gray text-lg' />
                                    )}
                                </span>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-gray mb-2'>Description</h1>
                            <textarea
                                name="description"
                                className='bg-[#FDFDFD] border border-bordered w-full p-3 outline-none  rounded-lg'
                                value={formData.description}
                                onChange={onInputChange}
                                placeholder='Enter description'
                            />
                        </div>
                        <div>
                            <h1 className='text-gray mb-2'>Message</h1>
                            <textarea
                                name="message"
                                className='bg-[#FDFDFD] border border-bordered w-full p-3 outline-none  rounded-lg'
                                value={formData.message}
                                onChange={onInputChange}
                                placeholder='Enter message'
                            />
                        </div>
                        <div>
                            <h1 className='text-gray mb-2'>Lifetime (hours)</h1>
                            <input
                                type="number"
                                name="lifeTime"
                                min={1}
                                className='bg-[#FDFDFD] border border-bordered w-full p-3 outline-none  rounded-lg'
                                value={formData.lifeTime}
                                onChange={onInputChange}
                                placeholder='Enter hours'
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvancedSettings;
