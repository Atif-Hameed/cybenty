import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const Pagination = ({ totalPages, currentPage, handlePageChange,activeColor, className }) => {
    const getPageNumbers = () => {
        const pageNumbers = [];

        // If total pages are less than or equal to 7, display all pages
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show the first 3 pages
            pageNumbers.push(1, 2, 3);

            // Show ellipsis after first 3 pages if current page is far enough
            if (currentPage > 4) {
                pageNumbers.push('...');
            }

            // Show pages around the current page: currentPage-1, currentPage, currentPage+1
            if (currentPage > 3 && currentPage < totalPages - 2) {
                pageNumbers.push(currentPage);
            }

            // Show ellipsis before last pages if current page is far enough
            if (currentPage < totalPages - 3) {
                pageNumbers.push('...');
            }

            // Show second-last and third-last pages only if the current page is near the end
            if (currentPage > totalPages - 4) {
                pageNumbers.push(totalPages - 2, totalPages - 1);
            }

            // Always show the last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div>
            {totalPages > 1 && (
                <div className={`flex justify-center items-center mt-6 sm:mb-20 mb-7 ${className}`}>
                    <button
                        className={`px-2 py-2.5 mx-1 ${currentPage === 1 ? 'text-[#C4CDD5] ' : 'text-blueMain '}`}
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <IoIosArrowBack className='text-xl' />
                    </button>

                    {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                            <span key={index} className="px-2">...</span>
                        ) : (
                            <button
                                key={index}
                                className={`px-3 flex justify-center text-center py-1 font-semibold sm:text-sm text-xs mx-1  rounded-lg  ${currentPage === page ? `text-white   ${activeColor || 'bg-blue-800'} ` : 'text-blueMain bg-white'}`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        )
                    ))}

                    <button
                        className={`px-2  py-2.5 mx-1 ${currentPage === totalPages ? 'text-[#C4CDD5] ' : 'text-blueMain '}`}
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <IoIosArrowForward className='text-xl' />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Pagination;
