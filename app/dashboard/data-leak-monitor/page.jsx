"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { Tooltip } from "react-tooltip";
import {
  getCheckedEmails,
  updateCheckedEmailData,
  deleteCheckedEmail,
} from "@/services/checkEmails";
import LeakMonitorTable from "@/components/dashboard/invites/LeakMonitorTable";
import AuthHeading from "@/components/shared/AuthHeading";
import { FiPlus, FiX } from "react-icons/fi";
import Link from "next/link";
import CustomSwitchButton from "@/components/dashboard/shared/CustomSwitchButton";
import CustomSelectorBreaches from "@/components/shared/CustomSelectorBreaches";
import { TbReload } from "react-icons/tb";
import NoEmails from "@/components/dashboard/invites/NoEmails";
import { FormatLastCheckDate } from "@/utils/FormatLastCheckDate";
import { getAdminSettings } from "@/services/api";

const Page = () => {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  const param = useSearchParams();
  const emailParam = param.get("email"); // Email from URL params
  const userId = user._id;
  const [selectedEmail, setSelectedEmail] = useState(""); // State for selected email
  const [data, setData] = useState([]); // Table data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emails, setEmails] = useState([]); // Checked emails list
  const [loadingEmails, setLoadingEmails] = useState(true); // Loading state for emails
  const hasFetched = useRef(false); // Ref to track the first fetch
  const [lastCheckDate, setLastCheckDate] = useState();
  const [howToUrl, setHowToUrl] = useState("#");

  const getSettingsData = async () => {
    try {
      const res = await getAdminSettings();
      setHowToUrl(res?.learnHowToUrl || "#");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getSettingsData();
  }, []);

  // Debounced fetch for email breaches
  const debouncedFetchBreaches = useRef(
    debounce(async (userId, email) => {
      setLoading(true);
      setError("");
      try {
        console.log(userId, email)
        const res = await updateCheckedEmailData(userId, email);
        console.log(res);

        if (res) {
          // Extract lastCheckedDate and breaches from both existing and updated email data
          const lastCheckDate = res?.existingCheckedEmail?.lastCheckedDate || res?.updatedCheckedEmail?.lastCheckedDate;
          const breaches = res?.existingCheckedEmail?.breaches || res?.updatedCheckedEmail?.breaches || [];

          // Update lastCheckDate and breaches state accordingly
          setLastCheckDate(lastCheckDate);
          setData(breaches.length ? breaches : []);
          setError(breaches.length ? "" : "No breaches found for this email.");
        }
      } catch (err) {
        setError(
          err.message || "An error occurred while checking email breaches."
        );
      } finally {
        setLoading(false);
      }
    }, 500)
  ).current;


  // Fetch checked emails
  const fetchCheckedEmails = async () => {
    setLoadingEmails(true);
    try {
      const res = await getCheckedEmails(userId);
      // console.log(res)
      setEmails(res?.checkedEmails || []);
      // If there's no emailParam, find the first verified email
      if (!emailParam) {
        const verifiedEmail = res?.checkedEmails?.find(
          (email) => email.verificationStatus === "verified"
        );
        if (verifiedEmail) {
          setSelectedEmail(verifiedEmail.email);
          router.push(
            `/dashboard/data-leak-monitor?email=${verifiedEmail.email}`,
            undefined,
            {
              shallow: true,
            }
          );
        }
      } else {
        setSelectedEmail(emailParam);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch checked emails.");
    } finally {
      setLoadingEmails(false);
    }
  };

  // Handle email change
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setSelectedEmail(newEmail);
    router.push(`/dashboard/data-leak-monitor?email=${newEmail}`, undefined, {
      shallow: true,
    }); // Update the URL query param

    if (newEmail) {
      debouncedFetchBreaches(userId, newEmail);
    } else {
      setData([]);
      setError("");
    }
  };

  // Handle email deletion
  const handleDeleteEmail = async (id, email) => {
    try {
      await deleteCheckedEmail(id);
      await fetchCheckedEmails(); // Refresh email list
      if (selectedEmail === id) {
        setSelectedEmail("");
        setData([]);
        setError("");
      }
      if (email == emailParam) {
        if (email == selectedEmail) {
          setSelectedEmail("");
        }
        const currentParams = new URLSearchParams(param);
        currentParams.delete("email");
        // Push the updated URL without the 'email' param
        router.push(`${window.location.pathname}?${currentParams.toString()}`);
      }
    } catch (err) {
      setError(err.message || "Failed to delete email.");
    }
  };

  // Fetch emails on component mount
  useEffect(() => {
    fetchCheckedEmails();
  }, []);

  // Fetch breaches when selectedEmail changes
  useEffect(() => {
    if (selectedEmail && userId && !hasFetched.current) {
      // Ensure userId is also available
      debouncedFetchBreaches(userId, selectedEmail); // Pass both userId and email
      hasFetched.current = true;
    }
  }, [selectedEmail, userId]);

  // console.log(emails)

  return (
    <div>
      <div className="bg-white flex flex-col items-start h-full font-poppins justify-center p-6 pt-10">
        <div className="flex sm:flex-row flex-col sm:items-center gap-3 justify-between w-full">
          <div>
            <AuthHeading>
              <span className="text-darkBlue font-medium">
                Data Leak Monitor
              </span>
            </AuthHeading>
            {/* <p className="text-gray font-medium mt-2">
              {loading
                ? "Checking for breaches..."
                : error
                  ? error
                  : !selectedEmail
                    ? "No email addresses added yet"
                    : `${selectedEmail} has been leaked in ${data?.length || 0
                    } data breaches`}
            </p> */}
          </div>
          <button
            onClick={() => router.push("/dashboard/tools/password-checker")}
            className="bg-purple text-white px-4 sm:w-auto w-full py-2 rounded-lg"
          >
            <span className="flex items-center w-full gap-2 md:text-xl">
              <p>+  Manage Email</p>
            </span>
          </button>
        </div>

        {/* Filters */}
        <div className="font-medium my-6 flex xl:flex-row flex-col xl:items-center justify-between w-full gap-4">
          <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4">
            <div className="border border-bordered sm:w-auto w-full rounded-lg  py-3">
              <CustomSelectorBreaches
                emails={emails}
                selectedEmail={selectedEmail}
                handleEmailChange={handleEmailChange}
                handleDeleteEmail={handleDeleteEmail}
                loadingEmails={loadingEmails}
              />
            </div>
            <div className="flex xl:items-center gap-1 xl:flex-row flex-col">
              <div
                data-tooltip-id="notification-tooltip"
                data-tooltip-content="You will be notified after each 30 days if you enable this option."
                className="flex items-center sm:justify-normal justify-between gap-2 sm:w-auto w-full"
              >
                <p className="text-gray">Notification</p>
                <CustomSwitchButton />
              </div>
              <Tooltip
                style={{ width: "300px", fontSize: "12px" }}
                id="notification-tooltip"
              />
              {/* {lastCheckDate && ( */}
              <div className="text-sm space-x-1">
                <span className="font-semibold text-gray">Last Checked:</span>
                <span className="text-gray">
                  {
                    lastCheckDate ? FormatLastCheckDate(lastCheckDate) : '- - -'
                  }
                </span>
              </div>
              {/* )} */}
            </div>
          </div>
          <Link
            href={howToUrl || "#"}
            target="_blank"
            className="rounded-lg text-[#CF9FFF] py-3"
          >
            Learn How To Secure Your Online Accounts
          </Link>
        </div>

        {/* Table or messages */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray">Loading breaches, please wait...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center flex-col items-center w-full h-[40vh]  font-semibold">
            <div className="text-center flex flex-col items-center  2xl:w-[40%] lg:w-[60%]">
              {error.includes("No breaches found") ? (
                <span className="text-green-600 text-2xl">Good News!</span>
              ) : (
                <span className="text-red-500 text-2xl">Oops!</span>
              )}
              <span>{error}</span>
            </div>

            {(error?.includes("This email is unverified") ||
              error?.includes("This email is not verified")) && (
                <button
                  className="flex items-center mt-2 gap-2 group bg-primary rounded-lg p-2 px-4 text-white"
                  onClick={() => window.location.reload()}
                >
                  Reload{" "}
                  <TbReload className="text-lg group-hover:rotate-[360deg] transform transition-all duration-500" />
                </button>
              )}
          </div>
        ) : data && data?.length > 0 ? ( 
          <LeakMonitorTable
            data={data}
            setData={setData}
            email={selectedEmail}
          />
        ) : (
          <NoEmails />
        )}
      </div>
    </div>
  );
};

export default Page;
