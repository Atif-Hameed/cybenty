"use client";
import React, { useEffect, useState } from "react";
import MaxContainer from "../shared/Layout/MaxContainer";
import bulb from "@/public/assets/icons/buldIcon.svg";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import {
  countResourceLikes,
  countResourceViewsClicks,
  getResourcesByCategoryId,
  resourceUnLikes,
  searchResource,
} from "@/services/api";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";
import icon3 from "@/public/assets/icons/info3.svg";
import TopCategories from "../tips-tricks/TopCategories";
import CustomSelector from "../shared/CustomSelector";
import { SeacrhIcon } from "@/svgs";
import Drawer from "../shared/Drawer";
import Pagination from "../shared/Pagination";
import Modal from "../shared/Modal";
import ShareModel from "../shared/ShareModel";
import { ExtractFirstImageUrl, ExtractParagraphs } from "@/utils/blogElements";
import shareIcon from "@/public/assets/icons/cardShare.svg";
import noimg from "@/public/assets/images/dumyImageCard.svg";
import { ColorRing } from "react-loader-spinner";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { useSelector } from "react-redux";
import { toggleFavoriteResource } from "@/services/auth";

const YouKnow = () => {
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [likedResources, setLikedResources] = useState({}); // Track liked state
  const itemsPerPage = 9; // Set the number of items to show per page
  const param = useSearchParams();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const pathname = usePathname();
  const id = param.get("id");
  const view = param.get("view");
  const actionId = param.get("actionId");
  const [top5Categories, setTop5Categories] = useState([]);
  const [selectedSubCategoryOption, setSelectedSubCategoryOption] =
    useState(null); // To store the selected option
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(""); // To store the selected subCategoryId
  const [selectedCardData, setSelectedCardData] = useState(null); // To store data for the open card
  const [allSubCategries, setAllSubCategries] = useState([]);
  const [activeCategoryFromTopCategories, setActiveCategoryFromTopCategories] =
    useState();
  const [latestSubCategoryId, setLatestSubCategoryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showShareModel, setShowShareModel] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [favoriteResources, setFavoriteResources] = useState({});

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
      console.log("Selected subCategory is not in top5Categories");
      setActiveCategoryFromTopCategories(null);
    }
  };

  // share resources
  const showShareResurce = (index, cardData) => {
    // Update the URL with the card id (shareable link)
    const url = new URL(window.location);
    url.searchParams.set("shareId", cardData._id); // Add or update the shareId query parameter
    url.searchParams.set("view", "share"); // Add or update the shareId query parameter
    window.history.pushState({}, "", url); // Update the URL without reloading the page
    setShowShareModel(true); // Show the share modal
  };

  // close resources
  const closeShareResurce = () => {
    const url = new URL(window.location);
    url.searchParams.delete("shareId"); // Remove the shareId query parameter
    url.searchParams.delete("view"); // Remove the shareId query parameter
    window.history.pushState({}, "", url); // Update the URL without reloading the page
    setShowShareModel(false); // Hide the share modal
  };

  // open drawer for cards data
  const handleOpenCard = async (index, cardData) => {
    if (openCardIndex === index) {
      setOpenCardIndex(null);
      setSelectedCardData(null);
    } else {
      setOpenCardIndex(index);
      setSelectedCardData(cardData);

      // Update the URL with the card id (shareable link)
      const url = new URL(window.location);
      url.searchParams.set("actionId", cardData._id); // Add or update the id query parameter
      window.history.pushState({}, "", url); // Update the URL without reloading the page

      console.log(cardData._id);
      // Ensure the cardData has a valid _id before making the API call
      if (cardData && cardData._id) {
        try {
          // Call the API to increment the view count
          await countResourceViewsClicks(cardData._id);
          // getResources();
        } catch (error) {
          console.error("Failed to update view count:", error);
        }
      } else {
        console.error("Invalid card data or missing _id");
      }
    }
  };

  useEffect(() => {
    setOpenCardIndex(null); // Close drawer on page change
  }, [pathname]);

  // get all resources and hadle the states
  const getResources = async () => {
    setLoading(true);
    try {
      let res;
      if (searchTerm != "") {
        try {
          // Fetch search results
          res = await searchResource(searchTerm, id);
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
      } else {
        res = await getResourcesByCategoryId(id); // Fetch resources based on category ID

        // Existing logic: Ensure resources is an array, then map to get subCategory and subCategoryId
        const subCategories =
          res.resources?.reduce((acc, resource) => {
            const exists = acc.some(
              (item) => item.subCategoryId === resource.subCategoryId
            ); // Check if subCategoryId already exists
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
          setSelectedSubCategoryOption(subCategories[0].subCategory); // Set the name of the first subcategory
          setSelectedSubCategoryId(subCategories[0].subCategoryId); // Set the ID of the first subcategory
        }

        setResources(res.resources || []);

        // New logic: Collect top 5 most-used subcategories and store in a separate array
        const subCategoryCountMap =
          res.resources?.reduce((acc, resource) => {
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
        const sortedSubCategories = Object.values(subCategoryCountMap).sort(
          (a, b) => b.count - a.count
        );

        // Get the top 5 most used subcategories
        const topSubCategories = sortedSubCategories.slice(0, 5);
        setTop5Categories(topSubCategories);
        // console.log('Top 5 subcategories:', topSubCategories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResources();
    if (view == "share") {
      closeShareResurce();
    }
  }, [id, searchTerm]);

  // Handle likes and unlikes
  const handleLike = async (resourceId, currentLikeCount, isLiked) => {
    try {
      setLikedResources((prevState) => ({
        ...prevState,
        [resourceId]: !isLiked,
      }));

      // Update like count in local state without refetching
      setResources((prevResources) =>
        prevResources.map((resource) =>
          resource._id === resourceId
            ? {
                ...resource,
                likeCount: isLiked
                  ? currentLikeCount - 1
                  : currentLikeCount + 1,
              }
            : resource
        )
      );

      if (isLiked) {
        // Call unlike API
        await resourceUnLikes(resourceId);
      } else {
        // Call like API
        await countResourceLikes(resourceId);
      }
    } catch (error) {
      console.error("Failed to update like status:", error);
    }
  };

  const handleNextCard = () => {
    if (openCardIndex < currentItems.length - 1) {
      setOpenCardIndex(openCardIndex + 1);
      setSelectedCardData(currentItems[openCardIndex + 1]);
    }
  };

  const handlePreviousCard = () => {
    if (openCardIndex > 0) {
      setOpenCardIndex(openCardIndex - 1);
      setSelectedCardData(currentItems[openCardIndex - 1]);
    }
  };

  // Filter resources based on the latest updated subcategory ID
  const filteredResources = resources.filter(
    (resource) => resource.subCategoryId === latestSubCategoryId
  );

  // Handle category click
  const handleCategoryClick = (id) => {
    setActiveCategoryFromTopCategories(id);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // shw drawer on page render
  useEffect(() => {
    if (actionId && view == "shared") {
      // If there's an id in the URL, find the corresponding card and open it
      const cardToOpen = resources.find(
        (resource) => resource._id === actionId
      );
      if (cardToOpen) {
        setOpenCardIndex(resources.indexOf(cardToOpen)); // Set the open card index
        setSelectedCardData(cardToOpen); // Set the selected card data
      }
    }
  }, [actionId, resources, view]);

  // prevent from page scroll
  useEffect(() => {
    if (openCardIndex !== null) {
      // When drawer is open, disable scrolling on the body
      document.body.style.overflow = "hidden";
    } else {
      // When drawer is closed, restore scrolling on the body
      document.body.style.overflow = "auto";
    }
    // Cleanup on component unmount or when the drawer is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCardIndex]);

  // Get previous and next titles
  const prevTitle =
    openCardIndex > 0 ? currentItems[openCardIndex - 1]?.title : null;
  const nextTitle =
    openCardIndex < currentItems.length - 1
      ? currentItems[openCardIndex + 1]?.title
      : null;

  // Update favorite status after successful API call
  const handleToggleFavorite = async (resourceId) => {
    try {
      // Toggle favorite status in the backend
      const { favoriteResources, favoritedBy } = await toggleFavoriteResource(
        user._id,
        resourceId
      );

      // Update the local favorite status immediately after the API call
      setFavoriteResources((prevState) => ({
        ...prevState,
        [resourceId]: favoritedBy.includes(user._id), // Update the local favorite status
      }));
    } catch (error) {
      console.error("Error toggling favorite resource:", error);
    }
  };

  useEffect(() => {
    // Only run if currentItems and user are available and not already set
    if (
      currentItems.length > 0 &&
      user &&
      Object.keys(favoriteResources).length === 0
    ) {
      const favorites = currentItems.reduce((acc, resource) => {
        acc[resource._id] = resource.favoritedBy.includes(user._id);
        return acc;
      }, {});
      setFavoriteResources(favorites);
    }
  }, [currentItems, user, favoriteResources]);

  return (
    <div className="flex justify-center bg-white sm:pt-20 py-8">
      <MaxContainer>
        <div className="flex justify-center items-center gap-6 sm:w-[80%] w-[90%] sm:px-0 px-2">
          <div className="flex flex-col items-start gap-10">
            <Link
              href={"/resources"}
              className="flex items-center cursor-pointer hover:text-orangeMain  gap-4 "
            >
              <FaArrowLeft />
              Back
            </Link>
            <div className="flex flex-col justify-center items-start">
              <div className="flex items-center gap-2 ">
                <div className="h-14 w-3 bg-orangeMain rounded-full"></div>
                <div className="lg:flex hidden items-center text-secondary gap-1 font-semibold xl:text-[40px] lg:text-3xl text-2xl">
                  <h1>
                    Welcome to Our &quot;Did You Know?&quot; Cybersecurity Page
                  </h1>
                  <Image
                    alt=""
                    className="lg:inline-block hidden h-16"
                    src={bulb}
                  />
                </div>
                <div className="lg:hidden flex items-center text-secondary gap-1 font-semibold xl:text-[40px] lg:text-3xl sm:text-2xl text-lg">
                  <h1>
                    Welcome to Our &quot;Did You Know?&quot; Cybersecurity Page
                  </h1>
                  <div>
                    <Image alt="" src={bulb} />
                  </div>
                </div>
              </div>
              <p className=" xl:text-start text-center  md:text-base sm:text-sm text-xs  md:mt-4 mt-5">
                Explore interesting facts, surprising statistics, and essential
                tips to boost your cybersecurity awareness. Our goal is to keep
                you informed and help you stay one step ahead of cyber threats.
              </p>
            </div>

            <div className="flex justify-between sm:flex-row flex-col items-end gap-4 w-full">
              <div className="w-full flex-1 flex items-center border-b border-[#3D5A80] py-3 gap-2">
                <div className="flex-shrink-0">
                  <SeacrhIcon />
                </div>
                <input
                  type="text"
                  className="w-full outline-none bg-transparent text-blueMain placeholder:text-blueMain"
                  placeholder="Search Here"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                />
              </div>
              <div className="min-w-[20%] sm:w-fit w-full">
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

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center w-full items-center my-10">
                {/* Loading and Error states */}
                {loading && (
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#FF876C",
                      "#FF876C",
                      "#FF876C",
                      "#FF876C",
                      "#FF876C",
                    ]}
                  />
                )}
              </div>
            ) : currentItems.length == 0 ? (
              <div className="flex justify-center w-full font-semibold items-center my-10">
                <p>No Resource Found</p>
              </div>
            ) : (
              <div className="w-full">
                {currentItems?.length > 0 ? (
                  <div className="my-10">
                    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-6">
                      {currentItems.map((e, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-lg group hover:shadow-lg flex flex-col"
                        >
                          <div
                            onClick={() => handleOpenCard(i, e)}
                            className="cursor-pointer relative"
                          >
                            {ExtractFirstImageUrl(e.blog) ? (
                              <img
                                src={ExtractFirstImageUrl(e.blog)}
                                alt="image not available"
                                className="rounded-lg h-[250px] w-full object-cover"
                              />
                            ) : (
                              <div className="rounded-lg h-[250px] w-full dumyCardColor object-cover" />
                            )}
                            {/* Favorite Button */}
                            <div
                              onClick={(event) => {
                                event.stopPropagation();
                                handleToggleFavorite(e._id);
                              }}
                              className="absolute right-3 top-2"
                            >
                              {isLoggedIn && (
                                <div className="bg-white p-2 rounded-full">
                                  {favoriteResources[e._id] ? (
                                    <IoIosHeart className="text-red-500 cursor-pointer text-xl" />
                                  ) : (
                                    <IoIosHeartEmpty className="cursor-pointer text-xl" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="px-3 pt-3 h-full flex-1 justify-between flex flex-col">
                            <div>
                              <h1
                                onClick={() => handleOpenCard(i, e)}
                                className="text-2xl cursor-pointer font-semibold line-clamp-1 group-hover:text-orangeMain"
                              >
                                {e.title}
                              </h1>
                              <p className="text-lg line-clamp-2">
                                {ExtractParagraphs(e.blog)}
                              </p>
                            </div>
                            <div className="border-t mt-3 border-bordered py-3 flex items-center justify-between gap-2">
                              <div className="flex items-center justify-between w-full gap-2">
                                {/* Like Button */}
                                <div
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleLike(
                                      e._id,
                                      e.likeCount,
                                      likedResources[e._id]
                                    );
                                  }}
                                  className="flex cursor-pointer items-center gap-1"
                                >
                                  {likedResources[e._id] ? (
                                    <MdThumbUp className="text-blue-600 sm:text-lg" />
                                  ) : (
                                    <MdOutlineThumbUp className="text-[#000000A1] sm:text-lg" />
                                  )}
                                  <p className="text-[#000000A1] sm:text-sm text-xs">
                                    {e.likeCount} Likes
                                  </p>
                                </div>
                                {/* View Count Display */}
                                <div className="flex items-center gap-1">
                                  <Image
                                    alt=""
                                    src={icon3}
                                    className="sm:h-auto h-3"
                                  />
                                  <p className="text-[#000000A1] sm:text-sm text-xs">
                                    {e.clickCount || "0"} Views
                                  </p>
                                </div>

                                {/* Share Count Display */}
                                <div
                                  className="flex items-center gap-1 cursor-pointer"
                                  onClick={() => showShareResurce(i, e)}
                                >
                                  <Image
                                    alt=""
                                    src={shareIcon}
                                    className="h-4 w-4 "
                                  />
                                  <p className="text-[#000000A1] sm:text-sm text-xs">
                                    {e.shareCount || "0"} Share
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>No resources found for the selected subcategory.</p>
                )}
              </div>
            )}

            {/* drawer */}
            <Drawer
              selectedCardData={selectedCardData}
              setOpenCardIndex={setOpenCardIndex}
              openCardIndex={openCardIndex}
              handlePreviousCard={handlePreviousCard}
              handleNextCard={handleNextCard}
              currentItems={currentItems}
              showShareResurce={showShareResurce}
              view={view}
              prevTitle={prevTitle}
              nextTitle={nextTitle}
            />

            {/* Pagination */}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />

            {/* share modal */}
            <Modal
              onClose={closeShareResurce}
              isOpen={showShareModel}
              bgStyle={"bg-[#00000069]"}
            >
              <ShareModel
                onClose={closeShareResurce}
                updateData={getResources}
              />
            </Modal>
          </div>
        </div>
      </MaxContainer>
    </div>
  );
};

export default YouKnow;
