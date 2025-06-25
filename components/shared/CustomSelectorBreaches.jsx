'use client';
import { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { BiSolidTrashAlt } from 'react-icons/bi';

const CustomSelectorBreaches = ({ emails, selectedEmail, handleEmailChange, handleDeleteEmail, loadingEmails }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref to track the dropdown

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (email) => {
        handleEmailChange({ target: { value: email } });
        setIsOpen(false); // Close dropdown after selecting
    };

    // Handle clicks outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // Close dropdown if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    // Filter emails to only show verified ones
    const verifiedEmails = emails.filter(email => email.verificationStatus === 'verified');

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className="px-4 cursor-pointer flex items-center justify-between"
                onClick={toggleDropdown}
            >
                <span>{selectedEmail || 'Select Email Address'}</span>
                <FiChevronDown />
            </div>

            {isOpen && (
                <div className="absolute z-10  w-full bg-white border border-bordered mt-2 rounded-lg max-h-60 overflow-y-auto">
                    {loadingEmails ? (
                        <div className="p-2 text-gray-500">Loading emails...</div>
                    ) : verifiedEmails.length === 0 ? (
                        <div className="p-2 text-xs text-gray-500">No verified emails available</div>
                    ) : (
                        verifiedEmails.map((item) => (
                            <div key={item._id} className="flex items-center justify-between w-full  p-2 gap-2 hover:bg-slate-200">
                                <div
                                    className="cursor-pointer  text-sm flex-1 w-[70%] truncate "
                                    onClick={() => handleSelect(item.email)}
                                >
                                    {item.email}
                                </div>

                                {/* <div className="flex items-center gap-1">
                                    <span className={`text-[10px] ${item.verificationStatus === 'verified' ? 'text-green-500' : 'text-red-500'}`}>
                                        {item.verificationStatus === 'verified' ? 'Verified' : 'Unverified'}
                                    </span>
                                    <BiSolidTrashAlt
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering select
                                            handleDeleteEmail(item._id, item.email);
                                        }}
                                        className="text-red-500 text-xs cursor-pointer"
                                    />
                                </div> */}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomSelectorBreaches;