"use client";
import React, { useState, useEffect } from "react";
import ShareSecretBoxes from "@/components/dashboard/tools/ShareSecretBoxes";
import AuthHeading from "@/components/shared/AuthHeading";
import { allSecrets } from "@/services/api";
import { deleteSecret } from "@/services/api";
import { convertDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import Pagination from "@/components/shared/Pagination";
import { motion } from "framer-motion"; // Import framer-motion
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const Page = () => {
  const [secrets, setSecrets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeRow, setActiveRow] = useState(null); // State to manage active row
  const router = useRouter();

  const getAllShareSecrets = async () => {
    setLoading(true);
    try {
      const res = await allSecrets();
      setSecrets(res.secrets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await deleteSecret(id);
      setSecrets(secrets.filter((secret) => secret._id !== id));
    } catch (error) {
      console.log(error.message);
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    getAllShareSecrets();
  }, []);

  const filteredSecrets = secrets.filter((secret) => {
    if (activeFilter === "all") return true;
    return secret.status === activeFilter;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSecrets = filteredSecrets.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredSecrets.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Toggle active row
  const handleRowClick = (id) => {
    if (activeRow === id) {
      setActiveRow(null); // Collapse if clicked again
    } else {
      setActiveRow(id); // Expand row
    }
  };

  return (
    <div className="p-6 pt-10">
      <div className="flex sm:flex-row flex-col relative sm:items-center gap-3 justify-between w-full">
        <div>
          <AuthHeading>
            <span className="text-darkBlue font-medium">Share a Secret</span>
          </AuthHeading>
        </div>
        <button
          onClick={() => router.push("/dashboard/tools/send-receive-secret")}
          className="bg-purple text-white px-4 sm:w-auto w-full py-2 rounded-lg"
        >
          <span className="flex items-center w-full gap-2 md:text-lg">
            <FiPlus className="w-4" />
            <p>Create new secret</p>
          </span>
        </button>
      </div>

      <ShareSecretBoxes
        secretData={secrets}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <p>Loading secrets...</p>
        </div>
      ) : currentSecrets.length === 0 ? (
        <div className="flex justify-center items-center mt-10">
          <p>No Share Secret Found</p>
        </div>
      ) : (
        <div className="w-full mt-10 overflow-x-auto">
          <table className="w-full bg-white rounded-t-xl shadow-sm">
            <thead>
              <tr className="bg-white">
                <th className="py-3 px-6 text-sm text-left rounded-tl-xl text-[#202020]">
                  #
                </th>
                <th className="py-3 px-6 text-sm text-left text-[#202020]">
                  Description
                </th>
                <th className="py-3 px-6 text-sm text-left text-[#202020]">
                  Date
                </th>
                <th className="py-3 px-6 text-sm text-left text-[#202020]">
                  Status
                </th>
                <th className="py-3 px-6 text-sm text-left text-[#202020]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {currentSecrets.map((item, index) => (
                <React.Fragment key={item._id}>
                  <tr
                    className="border-t border-bordered/50 cursor-pointer hover:bg-primary/5 transition-colors duration-300"
                    onClick={() => handleRowClick(item._id)}
                  >
                    <td className="py-3 text-gray px-6">{index + 1}</td>
                    <td className="py-3 text-gray px-6  w-[300px] max-w-[300px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.description || "-"}
                    </td>
                    <td className="py-3 text-[#CF9FFF] px-6 cursor-pointer">
                      {convertDate(item.createdAt)}
                    </td>
                    <td className="py-3 text-gray px-6 ">
                      <div
                        className={`w-[150px] flex justify-center capitalize ${
                          item.status === "expired"
                            ? "bg-red-100 text-red-600 border border-red-600"
                            : item.status === "viewed"
                            ? "bg-blue-100 text-blue-600 border border-blue-600 "
                            : item.status === "new"
                            ? "bg-green-100 text-green-600 border border-green-600"
                            : "bg-[#F93C3C14] text-[#FF0000]  border-[#FF0000]"
                        } whitespace-nowrap border px-4 py-2 rounded-lg`}
                      >
                        {item.status}
                      </div>
                    </td>
                    <td className="py-3 text-gray px-6">
                      <button
                        className={`bg-[#F93C3C14] border border-[#F95E3C] p-2 rounded-lg ${
                          deleting === item._id
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => handleDelete(item._id)}
                        disabled={deleting === item._id}
                      >
                        {deleting === item._id ? (
                          <span>Deleting...</span>
                        ) : (
                          <IoTrashOutline className="text-[#EB0505] text-lg" />
                        )}
                      </button>
                    </td>
                  </tr>

                  {/* Conditional details section with smooth animation */}
                  {activeRow === item._id && (
                    <motion.tr
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <td colSpan="5" className="p-6">
                        <div>
                          <span className="pr-1 text-gray font-semibold">
                            Id:
                          </span>{" "}
                          {item._id}
                        </div>
                        <div>
                          <span className="pr-1 text-gray font-semibold">
                            Creation Date:
                          </span>{" "}
                          {convertDate(item.createdAt)}
                        </div>
                        <div>
                          <span className="pr-1 text-gray font-semibold">
                            Expiration Date:
                          </span>{" "}
                          {item.status == "new"
                            ? convertDate(item.expiryTime)
                            : "-"}
                        </div>
                        <div>
                          <span className="pr-1 text-gray font-semibold">
                            Description:
                          </span>{" "}
                          {item.description || "-"}
                        </div>
                        <div>
                          <span className="pr-1 text-gray font-semibold">
                            Message:
                          </span>{" "}
                          {item.message || "-"}
                        </div>
                        <div>
                          <span className="pr-1 text-gray font-semibold">
                            Status:
                          </span>{" "}
                          {item.status}
                        </div>
                        <div>
                          <span className="pr-1 text-gray font-semibold">
                            Life Time:
                          </span>{" "}
                          {item.lifeTime} hours
                        </div>
                        <div>
                          <span className="pr-1 text-gray font-semibold">
                            Secret Deleted:
                          </span>{" "}
                          {item.status == "new" ? "No" : "Yes"}
                        </div>
                        <div>
                          <span className="pr-1 text-gray font-semibold">
                            Password:
                          </span>{" "}
                          {item.passwordHash ? "Yes" : "No"}
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Pagination Component */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            activeColor={"bg-[#b677f1]"}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
