"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { RiCloseLargeLine } from "react-icons/ri";
import uplaodIcon from "@/public/assets/icons/uplaodIcon.svg";
import { RenderBlogContent } from "@/utils/blogElements";
import { IoMdClose, IoMdShare } from "react-icons/io";
import { IoIosShareAlt } from "react-icons/io";
import shareNew from "@/public/assets/icons/shareNew.svg";
import shareIcon from "@/public/assets/icons/shareIcon.svg";

const Drawer = ({
  setOpenCardIndex,
  selectedCardData,
  openCardIndex,
  handlePreviousCard,
  handleNextCard,
  currentItems,
  showShareResurce,
  view,
  prevTitle,
  nextTitle,
}) => {
  // Function to remove the id query param from the URL
  const removeIdFromUrl = () => {
    const url = new URL(window.location);
    url.searchParams.delete("actionId"); // Removes the 'id' parameter
    url.searchParams.delete("view");
    window.history.pushState({}, "", url); // Update the URL without reloading the page
  };

  return (
    <div>
      <div
        className={`fixed inset-0 bg-[#BDB4B47D]  z-20 transition-opacity duration-300 ease-in-out ${
          openCardIndex !== null
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setOpenCardIndex(null); // Close the drawer
          removeIdFromUrl(); // Remove the 'id' query param from the URL
        }}
      ></div>

      {/* Drawer content */}
      <div
        className={`fixed top-[65px] right-0 h-[calc(100%-65px)] lg:w-[40%] md:w-[50%] sm:w-1/2 w-[70%] bg-white overflow-auto shadow-lg  sm:p-5 p-3 z-20 transition-transform transform ${
          openCardIndex !== null ? "translate-x-0" : "translate-x-full"
        } duration-300 ease-in-out drawer`}
      >
        {selectedCardData && (
          <div className="flex flex-col items-start justify-between h-full">
            <div className="w-full">
              <div className="flex justify-between items-start lg:gap-8 sm:gap-5 gap-3 mb-5">
                <h1 className="lg:text-2xl sm:text-xl mt-6 text-lg break-all font-bold border-b-4 pb-1 border-orangeMain capitalize">
                  {selectedCardData.title}
                </h1>
                <div className="flex items-center  gap-1 flex-shrink-0">
                  {/* <Image
                    onClick={() => showShareResurce(1, selectedCardData)}
                    alt=""
                    src={shareNew}
                    className="cursor-pointer h-9"
                  /> */}

                  <div
                    onClick={() => showShareResurce(1, selectedCardData)}
                    className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-black hover:bg-opacity-10 duration-300 transition-colors"
                  >
                    <Image
                      alt=""
                      src={shareIcon}
                      className="h-6 w-6 cursor-pointer"
                    />
                  </div>

                  {/* <Image alt='' src={uplaodIcon} className='cursor-pointer sm:w-auto w-6' onClick={() => showShareResurce(1, selectedCardData)} /> */}

                  <div
                    onClick={() => {
                      setOpenCardIndex(null); // Close the drawer
                      removeIdFromUrl(); // Remove the 'id' query param from the URL
                    }}
                    className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-black hover:bg-opacity-10 duration-300 transition-colors"
                  >
                    <IoMdClose className="text-3xl text-[#777] cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Render Blog Content */}
              <div className="mt-6">
                {selectedCardData.blog ? (
                  RenderBlogContent(selectedCardData.blog)
                ) : (
                  <p>No blog content available.</p>
                )}
              </div>

              {selectedCardData.link && (
                <div className="mt-2">
                  <Link
                    href={selectedCardData.link}
                    className="text-blue-500 sm:text-lg"
                  >
                    {selectedCardData.link}
                  </Link>
                </div>
              )}
            </div>

            {/* Next and Previous Buttons */}
            {view != "shared" && (
              <div className="flex justify-between flex-wrap w-full pb-3 mt-4">
                <div className="flex flex-col items-start">
                  <button
                    onClick={handlePreviousCard}
                    disabled={openCardIndex === 0}
                    className={`sm:text-base text-sm py-2 flex items-center gap-2 ${
                      openCardIndex === 0 ? " text-gray " : " text-orangeMain "
                    }`}
                  >
                    <BiArrowBack className="sm:text-xl text-lg" />
                    Previous
                  </button>
                  <h1 className="-mt-2 font-semibold lg:max-w-[250px] sm:max-w-[150px] max-w-[100px] truncate">
                    {prevTitle}
                  </h1>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    onClick={handleNextCard}
                    disabled={openCardIndex === currentItems.length - 1}
                    className={`sm:text-base text-sm py-2 flex items-center gap-2 ${
                      openCardIndex === currentItems.length - 1
                        ? " text-gray "
                        : " text-orangeMain "
                    }`}
                  >
                    Next
                    <BiArrowBack className="sm:text-xl text-lg rotate-180" />
                  </button>
                  <h1 className="-mt-2 font-semibold lg:max-w-[250px] sm:max-w-[150px] max-w-[100px] truncate">
                    {nextTitle}
                  </h1>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
