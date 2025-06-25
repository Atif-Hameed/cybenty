'use client';

import React, { useState } from 'react';
import MaxContainer from '../shared/Layout/MaxContainer';
import { BsEnvelope } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import Button from '../shared/Button';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        zipCode: '',
        projectType: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required.";
        if (!formData.address) tempErrors.address = "Address is required.";
        if (!formData.phone) tempErrors.phone = "Phone number is required.";
        if (!formData.email) tempErrors.email = "Email is required.";
        if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid.";
        if (!formData.zipCode) tempErrors.zipCode = "Zip Code is required.";
        if (!formData.projectType) tempErrors.projectType = "Project Type is required.";
        if (!formData.message) tempErrors.message = "Message is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error('Please fix the errors before submitting.');
            return;
        }

        setLoading(true); // Start loading when form is submitted

        try {
            const response = await axios.post('/api/send-email', formData);

            if (response.data.status === 'sent') {
                toast.success('Email sent successfully!');
                setFormData({
                    name: '',
                    address: '',
                    phone: '',
                    email: '',
                    zipCode: '',
                    projectType: '',
                    message: '',
                });
            } else {
                toast.error('Failed to send the email. Please try again.');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false); // Stop loading after API call finishes
        }
    };

    return (
        <div className='bg-white w-full sm:py-20 py-8 flex justify-center'>
            <Toaster/>
            <MaxContainer>
                <div className='flex justify-center items-center gap-6 w-[80%] sm:px-0 px-2'>
                    <div className='flex justify-between md:flex-row flex-col items-center gap-8'>
                        {/* Animated Contact Info Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='md:w-[45%] w-full text-[#04022E] flex flex-col md:items-start items-center md:pl-10'
                        >
                            <h1 className='xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold mb-3'>Get in Touch</h1>
                            <p className='md:text-start text-center'>We would love to hear from you! Whether you have questions about your question</p>
                            <div className='flex flex-col md:items-start ms:mt-10 mt-4'>
                                <div className='flex items-center gap-3 my-4'>
                                    <div className='p-3 bg-orangeMain rounded-full'>
                                        <BsEnvelope className='text-white text-lg' />
                                    </div>
                                    <div>
                                        <h1 className='text-2xl font-medium'>Email Address</h1>
                                        <p className='text-sm'>Fakeemail@gmail.com</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div className='p-3 bg-orangeMain rounded-full'>
                                        <FiPhoneCall className='text-white text-lg' />
                                    </div>
                                    <div>
                                        <h1 className='text-2xl font-medium'>Phone no</h1>
                                        <p className='text-sm'>123-456-1456</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Animated Form Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='md:w-[55%] w-full bg-[#F0F0F0] lg:p-6 p-4 rounded-lg lg:space-y-6 space-y-3'
                        >
                            <h1 className='lg:text-3xl md:text-2xl text-xl font-semibold text-center'>Contact Us</h1>
                            <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:gap-5 gap-3'>
                                    <div className='relative'>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className='w-full lg:text-base text-sm placeholder:text-black bg-white px-4 p-3 rounded-md text-black outline-none'
                                            placeholder='Name'
                                        />
                                        {errors.name && <span className='text-red-500 absolute -bottom-5 left-0 text-sm'>{errors.name}</span>}
                                    </div>
                                    <div className='relative'>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className='w-full lg:text-base text-sm placeholder:text-black bg-white px-4 p-3 rounded-md text-black outline-none'
                                            placeholder='Address'
                                        />
                                        {errors.address && <span className='text-red-500 absolute -bottom-5 left-0 text-sm'>{errors.address}</span>}
                                    </div>
                                    <div className='relative'>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className='w-full lg:text-base text-sm placeholder:text-black bg-white px-4 p-3 rounded-md text-black outline-none'
                                            placeholder='Telephone Number'
                                        />
                                        {errors.phone && <span className='text-red-500 absolute -bottom-5 left-0 text-sm'>{errors.phone}</span>}
                                    </div>
                                    <div className='relative'>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className='w-full lg:text-base text-sm placeholder:text-black bg-white px-4 p-3 rounded-md text-black outline-none'
                                            placeholder='Email'
                                        />
                                        {errors.email && <span className='text-red-500 absolute -bottom-5 left-0 text-sm'>{errors.email}</span>}
                                    </div>
                                    <div className='relative'>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            className='w-full lg:text-base text-sm placeholder:text-black bg-white px-4 p-3 rounded-md text-black outline-none'
                                            placeholder='Zip Code'
                                        />
                                        {errors.zipCode && <span className='text-red-500 absolute -bottom-5 left-0 text-sm'>{errors.zipCode}</span>}
                                    </div>
                                    <div className='relative'>
                                        <input
                                            type="text"
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleChange}
                                            className='w-full lg:text-base text-sm placeholder:text-black bg-white px-4 p-3 rounded-md text-black outline-none'
                                            placeholder='Type of Project'
                                        />
                                        {errors.projectType && <span className='text-red-500 absolute -bottom-5 left-0 text-sm'>{errors.projectType}</span>}
                                    </div>
                                </div>
                                <div className='relative my-5'>
                                    <textarea
                                        rows={5}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className='w-full lg:text-base text-sm placeholder:text-black bg-white px-4 p-3 rounded-md text-black outline-none'
                                        placeholder='Message'
                                    ></textarea>
                                    {errors.message && <span className='text-red-500 absolute -bottom-4 left-0 text-sm'>{errors.message}</span>}
                                </div>

                                <div className='w-full mt-4'>
                                    <Button label={loading ? 'Submitting...' : 'Submit'} disabled={loading} />
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </MaxContainer>
        </div>
    );
}

export default Form;
