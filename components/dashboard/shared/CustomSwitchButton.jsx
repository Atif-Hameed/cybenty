'use client'
import { toggleUserNotifications } from '@/services/auth';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CustomSwitchButton = () => {
    const user = useSelector((state) => state.user.user); // get the current user from Redux
    const [isOn, setIsOn] = useState(user?.notification); // Initialize the state based on the user’s notification status


    const handleToggle = async () => {
        try {
            // Update the local state first (optimistic UI update)
            const updatedStatus = !isOn;
            setIsOn(updatedStatus);

            // Call the API to update the notification status on the backend
            const response = await toggleUserNotifications(user._id); // Call your backend API
            console.log(response)

            // If API call was successful, update the local state with the response status
            if (response.notification !== undefined) {
                setIsOn(response.notification);
            }
        } catch (error) {
            console.error('Error updating notification status:', error);
            // In case of error, revert the UI to its previous state
            setIsOn(isOn);
        }
    };

    return (
        <div className='flex items-center'>
            <div
                onClick={handleToggle} // Call handleToggle on click
                className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-[#CF9FFF]' : 'bg-[#d9d9d9]'}`}
            >
                <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-7' : 'translate-x-0'}`}
                />
            </div>
        </div>
    );
};

export default CustomSwitchButton;
