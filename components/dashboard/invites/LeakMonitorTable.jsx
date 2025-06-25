"use client";
import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import CustomRadioButton from "@/components/shared/CustomRadio";
import { updateBreachStatus } from "@/services/checkEmails";
import Link from "next/link";

const LeakMonitorTable = ({ data, setData, email }) => {
  console.log("data leak", data);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedOption, setSelectedOption] = useState({}); // Track selected Yes/No for each row
  const [showPopup, setShowPopup] = useState(false); // Popup state for "No" option
  const [popupContent, setPopupContent] = useState(""); // Dynamic popup content for the "No" option
  const [statusList, setStatusList] = useState(
    data?.map((item) => item.status)
  ); // Track status for each row
  const [confirmStatus, setConfirmStatus] = useState({}); // Track confirmation for each row

  // Function to handle row expansion
  const handleExpand = (name, breachDate, index) => {
    const uniqueId = `${name}-${breachDate}-${index}`; // Create a unique identifier for each row
    setExpandedRow(expandedRow === uniqueId ? null : uniqueId); // Toggle expanded row
  };

  // Function to handle the Yes/No option change
  const handleOptionChange = async (index, option, name, email, id) => {
    setSelectedOption({ ...selectedOption, [index]: option });

    // If "No" is selected, show the popup
    if (option === "No") {
      const updatedData = data?.map((e) => {
        if (e?._id === id) {
          return {
            ...e,
            status: "risk",
          };
        }
        return e;
      });
      setData(updatedData);
      setPopupContent(
        `Visit ${name} and change your password now to secure the account`
      );
      setShowPopup(true);
      await updateBreachStatus(email, name, "risk"); // Call API to update the breach status to 'risk'
      setStatusList(
        statusList.map((status, idx) => (idx === index ? "risk" : status))
      ); // Update the status in the UI
    }
    // If "Yes" is selected, show the confirm button
    else {
      const updatedData = data?.map((e) => {
        if (e?._id === id) {
          return {
            ...e,
            status: "updated",
          };
        }
        return e;
      });
      setData(updatedData);
      setShowPopup(false);
      setConfirmStatus({ ...confirmStatus, [index]: false }); // Reset confirmation on "Yes"
    }
  };

  const handleConfirmClick = async (index, name) => {
    const res = await updateBreachStatus(email, name, "updated"); // Call API to update the breach status to 'updated'
    console.log(res)
    setStatusList(
      statusList.map((status, idx) => (idx === index ? "updated" : status))
    ); // Update the status in the UI
    setConfirmStatus({ ...confirmStatus, [index]: true }); // Mark as confirmed
  };

  const highlightAnchors = (text) => {
    return text.replace(
      /<a href="(.*?)"([^>]*)>(.*?)<\/a>/g,
      `<a href="$1" class="highlighted-link"$2>$3</a>`
    );
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full bg-white rounded-t-xl shadow-sm">
        <thead>
          <tr className="bg-white">
            <th className="py-3 px-6 text-sm text-left rounded-tl-xl text-[#202020]">
              #
            </th>
            <th className="py-3 px-6 text-sm text-left text-[#202020]">
              Email Address
            </th>
            <th className="py-3 px-6 text-sm text-left text-[#202020]">
              Company Breached
            </th>
            <th className="py-3 px-6 text-sm text-left text-[#202020]">
              Date of Breach
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
          {data?.map((item, index) => {
            const uniqueId = `${item.Name}-${item.BreachDate}-${index}`; // Create a unique key for each row
            const currentStatus =
              statusList[index] === "risk"
                ? "Account is on Risk"
                : "Password Updated"; // Display status based on the current value

            return (
              <React.Fragment key={uniqueId}>
                <tr
                  onClick={() =>
                    handleExpand(item.Name, item.BreachDate, index)
                  }
                  className="border-t border-bordered/50 cursor-pointer hover:bg-primary/5 transition-colors duration-300"
                >
                  <td className="py-3 text-gray px-6">{`0${index + 1}`}</td>
                  <td className="py-3 text-gray px-6">{email}</td>
                  <td className="py-3 text-[#CF9FFF] px-6 cursor-pointer">
                    <Link
                      href={`https://www.${item.Name.toLowerCase().replace(
                        /\s+/g,
                        ""
                      )}.com`}
                      target="_blank"
                    >
                      {item.Name}
                    </Link>
                  </td>

                  <td className="py-3 text-gray px-6">{item.BreachDate}</td>
                  <td className="py-3 text-gray px-6">
                    {currentStatus === "Account is on Risk" ? (
                      <span className="bg-[#F93C3C14] whitespace-nowrap text-[#FF0000] border border-[#FF0000] px-4 py-2 rounded-lg">
                        Account is on Risk
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-600 border border-blue-600 px-4 py-2 rounded-lg">
                        Password Updated
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-gray px-6">
                    <button
                      onClick={() =>
                        handleExpand(item.Name, item.BreachDate, index)
                      }
                      className="bg-[#CF9FFF12] border border-[#CF9FFF] p-2 rounded-lg"
                    >
                      <IoIosEye className="text-purple text-lg" />
                    </button>
                  </td>
                </tr>
                {expandedRow === uniqueId && (
                  <tr>
                    <td colSpan={6} className="py-3 px-6 bg-gray-100">
                      <div className="mb-2 text-gray">
                        <span className="font-semibold text-lg">
                          {item.Name}:
                        </span>
                        <span
                          className="text-gray-600"
                          dangerouslySetInnerHTML={{
                            __html: highlightAnchors(
                              item.description.Description
                            ),
                          }}
                        />
                      </div>
                      <div className="text-gray">
                        <span className="font-semibold text-lg">
                          Compromised data:
                        </span>
                        <span className="text-gray-600">
                          {item.description.DataClasses?.join(", ")}
                        </span>
                      </div>
                      <div className="mt-5">
                        <p className="text-gray">
                          Have you changed your {item.Name} account password
                          after {item.BreachDate}?
                        </p>
                        <div className="flex gap-6 items-center mt-2">
                          <div className="flex items-center gap-2">
                            <CustomRadioButton
                              onChange={() =>
                                handleOptionChange(
                                  index,
                                  "Yes",
                                  item.Name,
                                  email,
                                  item?._id
                                )
                              }
                              label="Yes"
                              name={`radio-${index}`}
                              isChecked={item?.status === "updated"}
                            />
                            <p className="text-gray">Yes</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <CustomRadioButton
                              isChecked={item?.status === "risk"}
                              onChange={() =>
                                handleOptionChange(
                                  index,
                                  "No",
                                  item.Name,
                                  email,
                                  item?._id
                                )
                              }
                              label="No"
                              name={`radio-${index}`}
                            />
                            <p className="text-gray">No</p>
                          </div>

                          {/* Show Confirm button if "Yes" is selected */}
                          {selectedOption[index] === "Yes" &&
                            !confirmStatus[index] && (
                              <button
                                className=" bg-primary text-white px-4 py-2 rounded-lg"
                                onClick={() =>
                                  handleConfirmClick(index, item.Name)
                                }
                              >
                                Confirm
                              </button>
                            )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Popup for "No" option */}
      {showPopup && (
        <div className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white md:w-fit w-[80%] sm:p-6 p-4 rounded-lg flex items-center flex-col shadow-lg">
            <h2 className="text-red-600 font-bold text-center sm:text-2xl text-xl mb-4">
              Warning!
            </h2>
            <p className=" lg:w-[80%] w-full text-center">{popupContent}</p>
            <button
              className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
              onClick={handleClosePopup}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeakMonitorTable;
