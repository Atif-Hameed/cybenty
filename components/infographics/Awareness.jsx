"use client";
import React, { useEffect, useState } from "react";
import MaxContainer from "../shared/Layout/MaxContainer";
import Image from "next/image";
import img from "@/public/assets/images/modelImg.png";
import demo1 from "@/public/assets/images/demo1.png";
import { AwarenessCards } from "@/data";
import Button from "../shared/Button";
import Link from "next/link";
import { GrAttachment } from "react-icons/gr";
import InfographicModel from "../shared/InfographicModel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  countResourceLikes,
  countResourceViewsClicks,
  getResourcesByCategoryId,
  resourceUnLikes,
} from "@/services/api";
import {
  IoIosCheckmarkCircleOutline,
  IoIosHeart,
  IoIosHeartEmpty,
} from "react-icons/io";
import icon1 from "@/public/assets/icons/info1.svg";
import icon2 from "@/public/assets/icons/info2.svg";
import icon3 from "@/public/assets/icons/info3.svg";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineThumbUp,
} from "react-icons/md";
import { GrDownload } from "react-icons/gr";
import { MdThumbUp } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import InfoDetails from "./InfoDetails";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import shareIcon from "@/public/assets/icons/cardShare.svg";
import Modal from "../shared/Modal";
import InfoShareModel from "../shared/InfoShareModel";
import { toggleFavoriteResource } from "@/services/auth";
import { useSelector } from "react-redux";
import Pagination from "../shared/Pagination";

const Awareness = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openCardIndices, setOpenCardIndices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedResources, setLikedResources] = useState({});
  const router = useRouter();
  const param = useSearchParams();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const id = param.get("id");
  const targetId = param.get("targetId");
  const [openShare, setOpenShare] = useState(false);
  const [targetUrl, setTargetUrl] = useState(false);
  const pathName = usePathname();
  const path = window.location.href;
  const parsedUrl = new URL(path);
  const domain = `${parsedUrl.protocol}//${parsedUrl.host}`;
  const user = useSelector((state) => state.user.user);
  const [favoriteResources, setFavoriteResources] = useState({});

  const handleOpenCard = (index) => {
    setOpenCardIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index]
    );
  };

  const getResources = async () => {
    setLoading(true);
    try {
      const res = await getResourcesByCategoryId(id);
      setResources(res.resources || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (targetId) {
      setIsModalOpen(true);
    }
    getResources();
  }, [id, targetId]);

  // Calculate total pages
  const totalPages = Math.ceil(resources.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = resources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle opening the modal and count views
  const openModalWithImage = async (targetID, category) => {
    try {
      await countResourceViewsClicks(targetID); // Count resource views/clicks
      router.push(
        `/infographics?id=${id}&targetId=${targetID}&category=${category}`
      );
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to count views:", error);
    }
  };

  const closeModal = () => {
    router.push(`/infographics?id=${id}`);
    setIsModalOpen(false);
  };

  // Handle resource likes and unlikes with live state handling
  const handleLike = async (resourceId, currentLikeCount, isLiked) => {
    try {
      // Toggle the liked state
      setLikedResources((prevState) => ({
        ...prevState,
        [resourceId]: !isLiked,
      }));

      // Update the like count in the local state without refetching resources
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
        // If already liked, call unlike API
        await resourceUnLikes(resourceId);
      } else {
        // If not liked, call like API
        await countResourceLikes(resourceId);
      }
    } catch (error) {
      console.error("Failed to update like status:", error);
    }
  };

  // Navigate to the next resource
  const goToNextResource = () => {
    const currentIndex = resources.findIndex(
      (resource) => resource._id === targetId
    );
    const nextIndex = (currentIndex + 1) % resources.length; // Loop back to the first if at the end
    const nextResourceId = resources[nextIndex]._id;
    const category = resources[nextIndex].pictureCategory;
    router.push(
      `/infographics?id=${id}&targetId=${nextResourceId}&category=${category}`
    );
  };

  // Navigate to the previous resource
  const goToPrevResource = () => {
    const currentIndex = resources.findIndex(
      (resource) => resource._id === targetId
    );
    const prevIndex = (currentIndex - 1 + resources.length) % resources.length; // Loop back to the last if at the beginning
    const prevResourceId = resources[prevIndex]._id;
    const category = resources[prevIndex].pictureCategory;
    router.push(
      `/infographics?id=${id}&targetId=${prevResourceId}&category=${category}`
    );
  };

  // open share model
  const openShareModel = async (targetID, category) => {
    setTargetUrl(
      `${domain}/infographics?id=${id}&targetId=${targetID}&category=${category}`
    );
    setOpenShare(true);
  };

  // close share model
  const closeShareModel = () => {
    setTargetUrl(`${domain}/infographics?id=${id}`);
    setOpenShare(false);
  };

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
    <div className="flex justify-center bg-[#FCFCFC] sm:py-20 py-8">
      <MaxContainer>
        <div className="flex flex-col items-center justify-center md:gap-6 gap-2 sm:w-[80%] w-[90%] sm:px-0 px-2">
          <div className="w-full flex justify-start">
            <Link
              href={"/resources"}
              className="flex items-center cursor-pointer hover:text-orangeMain  gap-4 "
            >
              <FaArrowLeft />
              Back
            </Link>
          </div>

          <h1 className="text-secondary lg:text-[40px] md:text-3xl text-center font-semibold text-2xl">
            Cybersecurity Awareness Posters
          </h1>
          <p className="md:text-lg sm:text-sm text-xs font-light sm:w-[92%] w-full text-center md:mt-2">
            These posters will help everyone to be aware of cyber risks and
            threats. As 95% of all data breaches occur due to human error, the
            human element is often seen as the weakest link in the chain. By
            making only a few changes to your technological habits could protect
            your organization and the ones you care about the most. Please post
            and share.
          </p>

          {loading ? (
            <div className="flex justify-center items-center my-10">
              <p>Loading...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="flex justify-center w-full font-semibold  items-center my-10">
              <p>No Resource Found</p>
            </div>
          ) : (
            <div
              className={`grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full md:mt-20 sm:mt-10 mt-5`}
            >
              {currentItems.map((e, i) => (
                <div
                  key={i}
                  className="flex flex-col  w-full sm:items-start items-center"
                >
                  <div className=" bg-white  gap-3 flex w-full flex-col items-start justify-between rounded-lg">
                    <div
                      onClick={() =>
                        openModalWithImage(e._id, e.pictureCategory)
                      }
                      className="cursor-pointer relative w-full flex justify-start"
                    >
                      <img
                        alt=""
                        src={e.infoPicture}
                        className="w-full h-[250px] object-cover rounded-xl"
                        unoptimized
                      />

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

                    <div className="flex items-center pb-2 px-4 justify-between w-full">
                      <div className="flex items-center gap-1 bg-[#F6F6F6] sm:px-3 px-2 py-1 rounded-full ">
                        <GrDownload className="text-[11px] text-[#000000A1] mb-1" />
                        <p className="text-[#000000A1] text-xs">
                          {e.downloadCount || "0"}
                        </p>
                      </div>
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                          handleLike(e._id, e.likeCount, likedResources[e._id]);
                        }}
                        className="flex items-center gap-1 cursor-pointer bg-[#F6F6F6] sm:px-3 px-2 py-1 rounded-full "
                      >
                        {likedResources[e._id] ? (
                          <MdThumbUp className="text-blue-600  text-xs" />
                        ) : (
                          <MdOutlineThumbUp className="text-[#000000A1] text-xs " />
                        )}
                        <p className="text-[#000000A1] text-xs">
                          {e.likeCount}
                        </p>
                      </div>
                      <div className="flex items-center gap-0 bg-[#F6F6F6] sm:px-3 px-2 py-1 rounded-full ">
                        <Image alt="" src={icon3} className="h-2" />
                        <p className="text-[#000000A1] text-xs">
                          {e.clickCount || "0"}
                        </p>
                      </div>
                      <div
                        onClick={() => openShareModel(e._id, e.pictureCategory)}
                        className="flex items-center cursor-pointer gap-1 bg-[#F6F6F6] sm:px-3 px-2 py-1 rounded-full "
                      >
                        <Image alt="" src={shareIcon} className="h-3.5" />
                        <p className="text-[#000000A1] text-xs">
                          {e.shareCount || "0"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-1 p-2 px-4 mb-3">
                      <p className="text-sm  bg-[#4B6BFB0D] px-2 py-1 rounded-lg text-[#4B6BFB] font-medium">
                        Infographics
                      </p>
                      <h1 className="text-[#181A2A] xl:text-2xl text-xl font-medium">
                        {e.title}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
          {/* {totalPages > 9 && (
            <div className="flex justify-center items-center mt-6 sm:mb-20 mb-7">
              <button
                className={`sm:px-4 px-2 sm:text-base text-xs border rounded-lg py-2 mx-1 ${
                  currentPage === 1
                    ? "text-white bg-[#FF876C] border-[#FF876C]"
                    : "text-[#777777] bg-white border-[#777777]"
                }`}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  className={`sm:px-3 px-2 py-2 sm:text-base text-xs mx-1 border rounded-lg ${
                    currentPage === pageIndex + 1
                      ? "text-white bg-[#FF876C] border-[#FF876C]"
                      : "text-[#777777] bg-white border-[#777777]"
                  }`}
                  onClick={() => handlePageChange(pageIndex + 1)}
                >
                  {pageIndex + 1}
                </button>
              ))}
              <button
                className={`sm:px-4 px-2 border sm:text-base text-xs rounded-lg py-2 mx-1 ${
                  currentPage === totalPages
                    ? "text-white bg-[#FF876C] border-[#FF876C]"
                    : "text-[#777777] bg-white border-[#777777]"
                }`}
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )} */}
        </div>
      </MaxContainer>

      {/* Infographic Modal */}
      <InfographicModel isOpen={isModalOpen} onClose={closeModal}>
        <InfoDetails
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          onClose={closeModal}
        />
      </InfographicModel>

      {isModalOpen && (
        <>
          <div
            className="hover:bg-white transition-colors duration-300 hover:bg-opacity-10 cursor-pointer p-3 z-50 rounded-full fixed left-2 top-1/2 -translate-y-1/2"
            onClick={goToPrevResource}
          >
            <MdKeyboardArrowLeft className="text-2xl text-white" />
          </div>

          <div
            className="hover:bg-white transition-colors duration-300 hover:bg-opacity-10 cursor-pointer p-3 z-50 rounded-full fixed right-2 top-1/2 -translate-y-1/2"
            onClick={goToNextResource}
          >
            <MdKeyboardArrowRight className="text-2xl text-white" />
          </div>
        </>
      )}

      {/* share modal */}
      <Modal
        onClose={closeShareModel}
        isOpen={openShare}
        bgStyle={"bg-[#00000069]"}
      >
        <InfoShareModel
          onClose={closeShareModel}
          updateData={getResources}
          targetUrl={targetUrl}
        />
      </Modal>
    </div>
  );
};

export default Awareness;
