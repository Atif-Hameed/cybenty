"use client";
import Button from "@/components/shared/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GrAttachment, GrDownload } from "react-icons/gr";
import { useSelector } from "react-redux";
import demo1 from "@/public/assets/images/demo1.png";
import {
  countResourceDownloads,
  getResourcesByCategoryId,
  indiviualResource,
} from "@/services/api";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import MaxContainer from "@/components/shared/Layout/MaxContainer";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BsArrowLeft } from "react-icons/bs";
import icon3 from "@/public/assets/icons/info3.svg";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";
import shareIcon from "@/public/assets/icons/shareIcon.svg";
import { jsPDF } from "jspdf";
import Modal from "../shared/Modal";
import ShareModel from "../shared/ShareModel";
import InfoShareModel from "../shared/InfoShareModel";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { storage } from "@/utils/firebase";
import { backend_url } from "@/utils/config";

const InfoDetails = ({ onClose, isModalOpen, setIsModalOpen }) => {
  const param = useSearchParams();
  const id = param.get("id");
  const pathname = usePathname();
  const targetId = param.get("targetId");
  const category = param.get("category");
  const [resources, setResources] = useState([]);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [emailLoading, setEmailLoading] = useState(false); // Loading state for email submission
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [filteredResources, setFilteredResources] = useState([]);
  const [text, setText] = useState("Copy");
  const [formData, setFormData] = useState({
    email: "",
    imgSrc: "",
  });
  const [openShare, setOpenShare] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const targetUrl = window.location.href;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const baseUrl = window.location.origin; // Get the full domain
      setShareUrl(
        `${baseUrl}${pathname}?id=${id}&targetId=${targetId}&category=${category}`
      );
    }
  }, [id, targetId, category, pathname]);

  // console.log(isLoggedIn)

  const getResources = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const res = await getResourcesByCategoryId(id);
      setResources(res.resources || []); // Ensure it's an array

      // Filter resources by the category (case-insensitive) and exclude the current targetId
      const filtered = (res.resources || []).filter(
        (resource) =>
          resource?.pictureCategory?.toLowerCase() === category.toLowerCase() &&
          resource._id !== targetId
      );

      // Limit to maximum 3 resources
      setFilteredResources(filtered.slice(0, 3));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const getTargetResource = async () => {
    setLoading(true);
    try {
      const res = await indiviualResource(targetId);
      // console.log(res);
      setData(res.resource);
      setFormData((prevFormData) => ({
        ...prevFormData,
        imgSrc: res.resource.infoPicture, // Set the image source here
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    if (id && targetId) {
      getResources();
      getTargetResource();
    }
    // handleChangeIMG();
  }, [id, targetId]);

  const handleChange = (e) => {
    setError("");
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setEmailLoading(true); // Set email loading to true during submission

    if (!formData.email) {
      setError("Please enter your email.");
      setEmailLoading(false); // Stop loading on error
      return;
    }

    try {
      const response = await axios.post("/api/send-img", formData);

      // console.log(response)

      if (response.status == 200) {
        setMessage("Email sent successfully");
        setFormData({
          email: "",
          imgSrc: formData.imgSrc, // Reset email, but keep imgSrc
        });
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmailLoading(false); // Stop loading after submission attempt
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setText("Copied"); // Update text to "Copied"

        // Reset the text back to "Copy" after 2 seconds
        setTimeout(() => {
          setText("Copy");
        }, 2000);
      })
      .catch(() => {
        setText("Failed to copy");
      });
  };

  // Function to handle download and count the download
  const handleDownload = async (fileUrl) => {
    try {
      // Make a request to the backend to convert the image to base64
      const response = await fetch(
        `${backend_url}/convert-to-base64?url=${encodeURIComponent(fileUrl)}`
      );
      const res = await response.json();

      if (res?.base64) {
        // Create a PDF with the image
        const pdf = new jsPDF();
        pdf.addImage(res?.base64, "PNG", 10, 10, 180, 160); // Adjust format as needed

        // Download the PDF
        pdf.save(`${data?.title}.pdf`);
      }
    } catch (error) {
      console.error("Error downloading or converting the file:", error);
    }
  };

  const handleChangeIMG = (newId, newCategory) => {
    if (typeof window !== "undefined") {
      const baseUrl = window.location.origin; // Get the full domain
      setShareUrl(
        `${baseUrl}${pathname}?id=${id}&targetId=${newId}&category=${newCategory}`
      );
    }
    setIsModalOpen(true);
    router.push(
      `/infographics?id=${id}&targetId=${newId}&category=${newCategory}`
    );
  };

  // open share model
  const openShareModel = () => {
    setOpenShare(true);
  };

  // close share model
  const closeShareModel = () => {
    setOpenShare(false);
  };

  return (
    <div className="flex justify-center bg-white px-4 py-3 relative w-full h-full">
      <div className="flex flex-col items-center w-full h-full bg-white overflow-auto justify-center  ">
        <div className="flex justify-end w-full items-center px-4">
          <div className=" flex items-center">
            <div className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-black hover:bg-opacity-10 duration-300 transition-colors">
              <Image
                onClick={openShareModel}
                alt=""
                src={shareIcon}
                className="h-6 w-6 cursor-pointer"
              />
            </div>
            <div className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-black hover:bg-opacity-10 duration-300 transition-colors">
              <IoMdClose
                onClick={onClose}
                className="text-3xl text-[#777] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-full bg-white sm:p-5 relative">
          <div className=" grid grid-cols-12 gap-4 mt-5 lg:flex-row flex-col h-full bg-[#FCFCFC]  items-start   overflow-auto  ">
            {loading ? (
              <div className="flex lg:col-span-7 min-h-[400px] h-full col-span-12 bg-[#bdbaba46] justify-center items-center ">
                <p>Loading...</p> {/* Replace with a spinner if needed */}
              </div>
            ) : data === "" ? (
              <div className="flex lg:col-span-7 col-span-12 bg-[#bdbaba46] justify-center w-full font-semibold items-center my-10">
                <p>No Image Found</p>
              </div>
            ) : (
              <div className="lg:col-span-7 col-span-12 w-full bg-[#bdbaba46] flex justify-center object-contain items-center">
                <img
                  alt=""
                  src={data.infoPicture}
                  className=" object-contain max-h-[700px] w-full"
                />
              </div>
            )}

            <div
              className={`lg:col-span-5 col-span-12 w-full flex flex-col  justify-between  sticky top-0 h-fit rounded-lg p-3`}
            >
              {/* <div>
                                <div className='bg-[#4B6BFB0D] text-[#4B6BFB] text-sm w-fit font-medium px-3 py-1 rounded-lg' >
                                    Infographic
                                </div>
                                <h1 className='font-medium mt-2 xl:text-3xl sm:text-2xl text-xl'>{data?.title}</h1>
                            </div> */}

              <div className="mt-2 border border-bordered p-5 rounded-[20px]">
                <span className="text-2xl font-bold">{data?.title}</span>

                <div className="bg-[#AA41BD] mt-2 text-sm w-fit rounded-md text-white px-4 py-2">
                  Love this item?
                </div>
                <h1 className="sm:text-lg  font-medium mt-3">
                  Download for free
                </h1>

                <div>
                  {isLoggedIn ? (
                    <div className="">
                      <div
                        onClick={() => handleDownload(data.infoPicture)}
                        className="text-white cursor-pointer bg-orangeMain text-sm px-4 py-2 w-fit rounded-md mt-3"
                      >
                        Download
                      </div>
                    </div>
                  ) : (
                    <div className="my-4">
                      <h1 className="text-[#202020] mb-2 font-medium sm:text-base text-sm">
                        Enter your email*
                      </h1>
                      <form onSubmit={handleSubmit}>
                        <input
                          type="email"
                          className="bg-white w-full p-3 mb-3 outline-none border border-[#BDBDBD] rounded-lg"
                          name="email"
                          value={formData.email}
                          placeholder="Email address"
                          onChange={handleChange}
                        />
                        <div className="w-fit mt-4">
                          <button
                            type="submit"
                            className="bg-orangeMain text-sm hover:scale-105 px-6 py-3 justify-center rounded-lg w-full items-center text-white flex gap-2"
                          >
                            {emailLoading ? "Sending..." : "Send me a Copy!"}
                          </button>
                        </div>
                      </form>
                      {error && <p className="text-red-500 mt-2">{error}</p>}
                      {message && (
                        <p className="text-green-500 mt-2">{message}</p>
                      )}
                    </div>
                  )}
                </div>

                <h1 className="sm:text-lg font-medium mt-3">
                  Get Unlimited Downloads
                </h1>
              </div>

              {isLoggedIn ? (
                ""
              ) : (
                <p className="sm:text-base text-sm  font-medium mt-8">
                  Exisitng User?{" "}
                  <Link href={"/login"} className="text-[#E099ED]">
                    Sign In
                  </Link>
                </p>
              )}
            </div>
          </div>

          <div className="my-4">
            <h1 className="font-medium mt-2 sm:text-3xl text-xl max-w-[60%] truncate">
              {data?.title}
            </h1>
            {
              filteredResources.length > 0 ? (
                <div className="mt-16">
                  <div className="flex items-center mb-8 flex-wrap w-full justify-between">
                    <h1 className="sm:text-2xl  text-xl font-medium">
                      You might also like
                    </h1>
                    <h1
                      onClick={onClose}
                      className="font-medium cursor-pointer text-end"
                    >
                      View All
                    </h1>
                  </div>

                  <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {filteredResources.map((resource) => (
                      <div
                        onClick={() =>
                          handleChangeIMG(
                            resource._id,
                            resource.pictureCategory
                          )
                        }
                        key={resource._id}
                        className="bg-white cursor-pointer  w-full flex flex-col gap-4 justify-center items-center"
                      >
                        <img
                          alt={resource.title}
                          src={resource.infoPicture || ""}
                          className="xl:h-[300px] lg:h-[250px] md:h-[200px] h-[220px] object-cover rounded-2xl w-full"
                        />
                        <div className="w-full lg:px-3 px-2">
                          <div className="flex items-center pb-2 justify-between w-full">
                            <div className="flex items-center gap-1 bg-[#F6F6F6] px-4 py-1 rounded-full">
                              <GrDownload className="text-xs text-[#000000A1] mb-1" />
                              <p className="text-[#000000A1] text-xs">
                                {resource.downloadCount || "0"}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 bg-[#F6F6F6] px-4 py-1 rounded-full">
                              <MdOutlineThumbUp className="text-[#000000A1] text-xs" />
                              <p className="text-[#000000A1] text-xs">
                                {resource.likeCount}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 bg-[#F6F6F6] px-4 py-1 rounded-full">
                              <Image alt="" src={icon3} className="h-2.5" />
                              <p className="text-[#000000A1] text-xs">
                                {resource.clickCount || "0"}
                              </p>
                            </div>
                            <div className="flex items-center cursor-pointer gap-0 bg-[#F6F6F6] sm:px-3 px-2 py-1 rounded-full ">
                              <Image alt="" src={shareIcon} className="h-2.5" />
                              <p className="text-[#000000A1] text-xs">
                                {resource.shareCount || "0"}
                              </p>
                            </div>
                          </div>
                          <div className="w-full mt-3">
                            <div className="bg-[#4B6BFB0D] text-[#4B6BFB] text-sm w-fit font-medium px-3 py-1 rounded-lg">
                              Infographic
                            </div>
                            <h1 className="font-medium mt-3 sm:text-2xl  text-xl">
                              {resource.title}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null /* Hide section if no suggestions */
            }
          </div>
        </div>
      </div>

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

export default InfoDetails;
