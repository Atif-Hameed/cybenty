'use client'
import React, { useEffect, useState } from 'react'
import MaxContainer from '../shared/Layout/MaxContainer'
import { DefenderURLsCards, DefenderURLsCards2, DefenderURLsCards3 } from '@/data'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { getResourcesByCategoryId, searchResource } from '@/services/api'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import TopCategories from '../tips-tricks/TopCategories'
import CustomSelector from '../shared/CustomSelector'
import { SeacrhIcon } from '@/svgs'
import { useSelector } from 'react-redux'
import Pagination from '../shared/Pagination'
import dumySHield from '@/public/assets/icons/dumyShield.svg'


const Defender = () => {

    const param = useSearchParams();
    const id = param.get('id');
    const [currentPage, setCurrentPage] = useState(1);  // State for the current page
    const [loading, setLoading] = useState(true);
    const [resources, setResources] = useState([]);
    const itemsPerPage = 9;  // Set the number of items to show per page
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [top5Categories, setTop5Categories] = useState([]);
    const [selectedSubCategoryOption, setSelectedSubCategoryOption] = useState(null); // To store the selected option
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(''); // To store the selected subCategoryId
    const [allSubCategries, setAllSubCategries] = useState([]);
    const [activeCategoryFromTopCategories, setActiveCategoryFromTopCategories] = useState();
    const [latestSubCategoryId, setLatestSubCategoryId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');


    // Use effect to update active category after top5Categories is updated
    useEffect(() => {
        if (top5Categories.length > 0) {
            setActiveCategoryFromTopCategories(top5Categories[0].subCategoryId); // Set first category as active
        }
    }, [top5Categories]);


    // Whenever activeCategoryFromTopCategories or selectedSubCategoryId changes, update latestSubCategoryId
    useEffect(() => {
        if (activeCategoryFromTopCategories) {
            setLatestSubCategoryId(activeCategoryFromTopCategories);
        }
    }, [activeCategoryFromTopCategories]);

    useEffect(() => {
        if (selectedSubCategoryId) {
            setLatestSubCategoryId(selectedSubCategoryId);
        }
    }, [selectedSubCategoryId]);

    const handleSelectionChange = (newValue) => {
        setSelectedSubCategoryOption(newValue); // Store the entire selected option object
        setSelectedSubCategoryId(newValue.subCategoryId); // Store the selected subCategoryId separately
        // Check if the selected subCategoryId exists in top5Categories
        const foundCategory = top5Categories.find(
            (category) => category.subCategoryId === newValue.subCategoryId
        );
        if (foundCategory) {
            setActiveCategoryFromTopCategories(foundCategory.subCategoryId);
        } else {
            console.log('Selected subCategory is not in top5Categories');
            setActiveCategoryFromTopCategories(null)
        }
    };

   
    const getResources = async () => {
        setLoading(true);
        try {

            let res;
            if (searchTerm != '') {
                try {
                    // Fetch search results
                    res = await searchResource(searchTerm, id);
                    // console.log(res)
                    // If no resources are found, set an empty array
                    setResources(res.resources || []);
                } catch (error) {
                    if (error) {
                        // Handle 404 error (No resources found)
                        console.log("No resources found matching the search keyword.");
                        setResources([]); // Set an empty array when no resources are found
                    } else {
                        throw error; // Re-throw other errors to be caught by the outer catch
                    }
                }
            }
            else {

                res = await getResourcesByCategoryId(id); // Fetch resources based on category ID

                // Existing logic: Ensure resources is an array, then map to get subCategory and subCategoryId
                const subCategories = res.resources?.reduce((acc, resource) => {
                    const exists = acc.some(item => item.subCategoryId === resource.subCategoryId); // Check if subCategoryId already exists
                    if (!exists) {
                        acc.push({
                            subCategory: resource.subCategory,
                            subCategoryId: resource.subCategoryId,
                        });
                    }
                    return acc;
                }, []) || [];

                // console.log(subCategories);
                setAllSubCategries(subCategories);

                if (subCategories.length > 0) {
                    // Set the first subcategory as the default selected option
                    setSelectedSubCategoryOption(subCategories[0].subCategory);  // Set the name of the first subcategory
                    setSelectedSubCategoryId(subCategories[0].subCategoryId);   // Set the ID of the first subcategory
                }

                setResources(res.resources || []);

                // New logic: Collect top 5 most-used subcategories and store in a separate array
                const subCategoryCountMap = res.resources?.reduce((acc, resource) => {
                    const subCategoryId = resource.subCategoryId;
                    if (acc[subCategoryId]) {
                        acc[subCategoryId].count += 1; // Increase count if subcategory already exists
                    } else {
                        acc[subCategoryId] = {
                            subCategory: resource.subCategory,
                            subCategoryId: resource.subCategoryId,
                            count: 1, // Initialize count for new subcategory
                        };
                    }
                    return acc;
                }, {}) || {};

                // Convert the count map to an array and sort by frequency (descending order)
                const sortedSubCategories = Object.values(subCategoryCountMap).sort((a, b) => b.count - a.count);

                // Get the top 5 most used subcategories
                const topSubCategories = sortedSubCategories.slice(0, 5);
                setTop5Categories(topSubCategories)
                // console.log('Top 5 subcategories:', topSubCategories);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    // Filter resources based on the latest updated subcategory ID
    const filteredResources = resources.filter(resource => resource.subCategoryId === latestSubCategoryId);
    console.log(filteredResources)

    // Handle category click
    const handleCategoryClick = (id) => {
        setActiveCategoryFromTopCategories(id);
    };

    // Calculate total pages
    const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

    // Get the items for the current page
    const currentItems = filteredResources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        getResources();
    }, [id, searchTerm]);


    // // Group resources by subcategory
    // const groupedResources = resources.reduce((acc, resource) => {
    //     const subCategory = resource.subCategory || 'Other'; // Handle missing subcategory case
    //     if (!acc[subCategory]) {
    //         acc[subCategory] = [];
    //     }
    //     acc[subCategory].push(resource);
    //     return acc;
    // }, {});



    return (
        <div className='flex justify-center bg-lightBg sm:pt-10 lg:pb-0 md:pb-20 pb-8 pt-8'>
            <MaxContainer>
                <div className='flex justify-center flex-col items-center gap-6 sm:w-[80%] w-[90%] sm:px-0 px-2'>

                    <div className='w-full flex justify-start'>
                        <Link href={'/resources'} className='flex items-center cursor-pointer hover:text-orangeMain  gap-4 '>
                            <FaArrowLeft />
                            Back
                        </Link>
                    </div>

                    <div className='flex flex-col items-center gap-3'>
                        <h1 className='text-secondary font-semibold lg:text-[40px] md:text-3xl text-xl'>
                            Defender Toolbox
                        </h1>
                        <p className='sm:w-[85%] w-full sm:text-lg text-sm text-center'>
                            We have collected a list of credible useful tools to help you in the fight against phishing
                        </p>
                    </div>


                    <div className='flex justify-between sm:flex-row flex-col items-end gap-4 w-full' >
                        <div className='w-full flex-1 flex items-center border-b border-[#3D5A80] py-3 gap-2'>
                            <div className='flex-shrink-0'>
                                <SeacrhIcon />
                            </div>
                            <input
                                type="text"
                                className='w-full outline-none bg-transparent text-blueMain placeholder:text-blueMain'
                                placeholder='Search Here'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                            />
                        </div>
                        <div className='min-w-[20%] sm:w-fit w-full'>
                            <CustomSelector
                                options={allSubCategries}
                                value={selectedSubCategoryOption}
                                onChange={handleSelectionChange}
                                defaultLabel={selectedSubCategoryOption || "Select Category"} // Use default label or selected option
                            />
                        </div>
                    </div>

                    {/* top 5 Categories */}
                    <TopCategories
                        top5Categories={top5Categories}
                        handleCategoryClick={handleCategoryClick}
                        activeCategoryFromTopCategories={activeCategoryFromTopCategories}
                    />



                    {/* urls or links 2*/}
                    <div className='w-full '>

                        {loading ? (
                            <div className='flex justify-center items-center my-10'>
                                <p>Loading...</p> {/* Replace with a spinner if needed */}
                            </div>
                        ) : resources.length === 0 ? (
                            <div className='flex justify-center w-full font-semibold  items-center my-10'>
                                <p >No Resource Found</p>
                            </div>
                        ) : (
                            <div className='w-full'>
                                <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-5'>
                                    {currentItems.map((e, i) => (
                                        <Link href={e.link} target='_blank' key={i}
                                            className={`bg-white hover:shadow-md  h-full group rounded-xl  cursor-pointer sm:p-7 p-4  sm:gap-4 gap-3 w-full flex items-center relative `}>
                                            <div className='flex-shrink-0'>
                                                <div className='bg-orangeMain p-2 rounded-lg'>
                                                    {
                                                        e.infoPicture ?
                                                            <img alt='' className='flex-shrink-0  h-12 rounded-full w-12 object-cover' src={e.infoPicture} />
                                                            :
                                                            <Image alt='' src={dumySHield} className='flex-shrink-0  h-12 rounded-full w-12 object-cover' />
                                                    }
                                                </div>
                                            </div>
                                            <div className='flex-1 h-full flex flex-col justify-between items-start '>
                                                <div className='overflow-hidden break-all'>
                                                    <h1 className='lg:text-2xl group-hover:text-orangeMain  line-clamp-1 overflow-hidden text-ellipsis md:text-xl sm:text-lg capitalize font-semibold'>{e.title}</h1>
                                                    <p style={{ whiteSpace: "pre-line" }} class="line-clamp-2 mt-2 sm:text-base text-sm overflow-hidden text-ellipsis">
                                                        {e.defenderDesription}
                                                    </p>
                                                </div>
                                                {/* <Link href={e.link} target='_blank' className='w-fit'>
                                                        <button className='hover:bg-orangeMain hover:text-white lg:text-base sm:text-sm text-xs rounded-lg bg-transparent p-2 px-3 sm:mt-2 -ml-3 text-blue-400'>
                                                            Visit site
                                                        </button>
                                                    </Link> */}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                        }
                    </div>

                    {/* Pagination */}
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />

                </div>
            </MaxContainer>
        </div>
    )
}

export default Defender
