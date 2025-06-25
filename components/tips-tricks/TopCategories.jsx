import React from 'react'

const TopCategories = ({ top5Categories, handleCategoryClick, activeCategoryFromTopCategories }) => {
    return (
        <div className='w-full'>
            <h1 className="text-gray sm:text-xl mb-4">Top Categories</h1>
            <div className="flex w-full flex-wrap sm:gap-4 gap-2">
                {top5Categories.length > 0 && top5Categories?.map((category) => (
                    <div
                        key={category.subCategoryId}
                        onClick={() => handleCategoryClick(category.subCategoryId)}
                        className={`sm:p-4 p-2 sm:w-[180px] w-[48%] truncate flex  justify-center hover:bg-[#DBCDF0] hover:text-blueMain hover:border-transparent border rounded-lg cursor-pointer sm:text-sm text-xs transition-colors duration-200
                            ${activeCategoryFromTopCategories === category.subCategoryId
                                ? 'bg-[#DBCDF0] text-blueMain border-transparent'
                                : 'bg-white text-black border-bordered'
                            }`}
                    >
                        {category.subCategory}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopCategories
