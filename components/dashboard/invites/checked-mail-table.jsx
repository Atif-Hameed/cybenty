'use client'
import React, { useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from '../shared/confirmation-model';
import { convertDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';

const CheckedMailTable = ({ emails, loading, onDeleteEmail }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [emailToDelete, setEmailToDelete] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const router = useRouter();

    const handleDeleteClick = (id, email) => {
        setEmailToDelete({ id, email });
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        if (!emailToDelete) return;

        setIsDeleting(true);
        try {
            await onDeleteEmail(emailToDelete.id);
        } catch (error) {
            console.log(object)
        } finally {
            setIsDeleting(false);
            setShowConfirmModal(false);
            setEmailToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowConfirmModal(false);
        setEmailToDelete(null);
    };

    const handleNavigation = (email) => {
        router.push(`/dashboard/data-leak-monitor?email=${email}`)
    }


    return (
        <div>
            <h1 className='text-purple my-3 mt-6 font-medium lg:text-2xl text-xl'>
                Manage Emails
            </h1>
            <div className="w-full overflow-x-auto">
                <table className="w-full bg-white border border-bordered rounded-t-xl shadow-sm">
                    <thead className='border-b border-bordered'>
                        <tr className="bg-[#FCFDFD]">
                            <th className="py-3 px-6 text-sm text-left rounded-tl-xl text-[#202020]">
                                #
                            </th>
                            <th className="py-3 px-6 text-sm text-left text-[#202020]">
                                Emails
                            </th>
                            <th className="py-3 px-6 text-sm text-left text-[#202020]">
                                Date
                            </th>
                            <th className="py-3 px-6 text-sm text-left text-[#202020]">
                                Status
                            </th>
                            <th className="py-3 px-6 text-sm text-end text-[#202020]">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray">
                                    Loading emails...
                                </td>
                            </tr>
                        ) : emails.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray">
                                    No emails found
                                </td>
                            </tr>
                        ) : (
                            emails.map((email, index) => {


                                return (
                                    <tr key={email._id} onClick={() => handleNavigation(email.email)} className={`${email.verificationStatus === 'verified' ? 'hover:bg-slate-100 cursor-pointer' : 'cursor-not-allowed'}   border-b border-bordered`}>
                                        <td className="py-3 text-gray px-6">{index + 1}</td>
                                        <td className="py-3 text-gray px-6">{email.email}</td>
                                        <td className="py-3 text-gray px-6">{convertDate(email.lastCheckedDate)}</td>
                                        <td className="py-3 text-gray px-6">
                                            <button
                                                className={`border w-[100px] py-2 rounded-lg ${email.verificationStatus === 'verified'
                                                    ? 'border-green-600 text-green-600'
                                                    : 'border-red-600 text-red-600'
                                                    }`}
                                            >
                                                {email.verificationStatus === 'verified' ? 'Verified' : 'Unverified'}
                                            </button>
                                        </td>
                                        <td className="py-3 text-gray px-6 flex justify-end">
                                            <button
                                                className='border border-red-600 text-red-600 px-2 py-2 rounded-lg hover:bg-red-50 transition-colors'
                                                onClick={() => handleDeleteClick(email._id, email.email)}
                                                disabled={isDeleting}
                                            >
                                                {isDeleting && emailToDelete?.id === email._id ? (
                                                    'Deleting...'
                                                ) : (
                                                    <RiDeleteBin6Line />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <ConfirmationModal
                    title="Confirm Deletion"
                    message={`Are you sure you want to delete ${emailToDelete?.email}?`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    confirmText={isDeleting ? 'Deleting...' : 'Delete'}
                    cancelText="Cancel"
                    isDeleting={isDeleting}
                />
            )}
        </div>
    );
};

export default CheckedMailTable;