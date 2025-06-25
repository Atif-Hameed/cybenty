"use client";
import cyberwhite from "@/public/assets/icons/cyberwhite.svg";
import { FaRegEdit } from "react-icons/fa";
import { sendAssignmentInvites, updateAssignment } from "@/services/assignment";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Button from "../shared/Button";
import Image from "next/image";
import { getAllTeamMembers, getAssessmentById, updateAssessment } from "@/actions/assessments.action";

const Invite = () => {
  const [email, setEmail] = useState("");
  const [assessment, setAssessment] = useState();
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [alreadyMembers, setAlreadyMembers] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [time, setTime] = useState(0);
  const [timeUpdateLoading, setTimeUpdateLoading] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state?.user?.user);
  const params = useSearchParams();
  const assignmentId = params.get("assignment");
  const assessmentId = params.get("assessment");
  const [fetchLoading, setFetchLoading] = useState(true);



  const fetchTeamMembers = async () => {
    try {
      const { data: members, error } = await getAllTeamMembers(assignmentId);
      if (members) {
        // Filter members with "INVITED" or "ACCEPTED" status
        const invitedOrAcceptedMembers = members?.data.filter(
          (member) =>
            (member.status === "INVITED" || member.status === "ACCEPTED") &&
            member.email.toLowerCase() !== user?.email?.toLowerCase()
        );
        setAlreadyMembers(invitedOrAcceptedMembers);
        // Include their emails in the emails array
        const memberEmails = invitedOrAcceptedMembers.map((member) => member.email);
        setEmails((prevEmails) => [
          ...new Set([...prevEmails, ...memberEmails]), // Avoid duplicates
        ]);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssessment = async () => {
    try {
      setFetchLoading(true);
      const res = await getAssessmentById(assessmentId);
      setAssessment(res?.data?.assessment);
      setTime(res?.data?.assessment?.time || 0);
    } catch (error) {
      console.log(error);
      setFetchLoading(false);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (assessmentId) {
      fetchAssessment();
    }
    if (assignmentId) {
      fetchTeamMembers();
    }
  }, [assessmentId, assignmentId]);

  const handleTimeChange = async (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setTime(value);

      if (!assessmentId || !assignmentId) return;

      try {
        setTimeUpdateLoading(true);
        const { error } = await updateAssignment(assignmentId, { time: value });

        if (error) {
          console.error(error);
          return;
        }

        // Update local assessment state
        setAssessment((prev) => ({
          ...prev,
          time: value,
        }));
      } catch (error) {
        console.error("Error updating time:", error);
      } finally {
        setTimeUpdateLoading(false);
      }
    }
  };

  const handleAddEmail = () => {
    if (!email) {
      setEmailError("Please enter an email");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (emails.includes(email.toLowerCase())) {
      setEmailError("This email has already been added");
      return;
    }

    if (email.toLowerCase() === user?.email?.toLowerCase()) {
      setEmailError("You cannot invite yourself");
      return;
    }

    setEmails([...emails, email.toLowerCase()]);
    setEmail("");
  };

  const handleDeleteEmail = (emailToDelete) => {
    setEmails(emails.filter((e) => e !== emailToDelete));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendInvites = async () => {
    if (emails.length === 0) {
      setInviteError("Add at least one email");
      return;
    }

    const members = emails.map((email) => ({ email }));
    const dataToSend = {
      members,
      userId: user?._id,
      assignmentId,
    };

    try {
      setLoading(true);
      const invites = await sendAssignmentInvites(dataToSend);
      router.push(
        `/dashboard/assessments/invited?assignment=${assignmentId}&email=${user.email}&type=TEAM`
      );
    } catch (error) {
      console.log("error", error);
      setInviteError(error.message || "Failed to send invites");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <h1 className="py-10 font-semibold text-center">Loading...</h1>;
  }

  return (
    <div className="flex justify-center sm:p-10 p-6 items-center">
      <div className="border xl:w-[50%] lg:w-[70%] w-full border-bordered md:rounded-xl bg-white">
        <div className="bg-[#F5F6FA40] border-b py-2 sm:px-6 px-4 border-bordered md:rounded-t-xl">
          <h1 className="text-black font-semibold text-center lg:text-2xl text-xl">
            {assessment?.assessmentName}
          </h1>
        </div>

        <div className="p-6 sm:px-16 flex flex-col items-center gap-6 w-full">
          <div className="xl:w-40 w-32 xl:h-40 h-32 flex justify-center items-center rounded-full">
            <img
              src={assessment?.logo}
              className="h-full w-full rounded-full"
              alt=""
            />
          </div>
          <p className="text-gray text-sm text-center">
            {assessment?.description}
          </p>

          <div className="lg:text-2xl sm:text-xl text-[#979797] flex items-center gap-4 justify-between w-full">
            <h1>Time (in mins)</h1>
            <div className="flex items-center relative gap-2 w-[40%]">
              <input
                type="number"
                min="1"
                value={time}
                onChange={handleTimeChange}
                className="border w-full text-center rounded-md py-2 px-3"
                disabled={timeUpdateLoading}
              />
              {timeUpdateLoading && (
                <div className="absolute right-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-6">
            <h1 className="lg:text-2xl text-xl text-primary w-full">
              Invite Team
            </h1>

            <div className="w-full">
              <p className="font-medium">Email:</p>
              <div className="flex items-center gap-1 w-full flex-wrap">
                <input
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(""); // Clear error when typing
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddEmail();
                    }
                  }}
                  className={`flex-1 px-3 border outline-none rounded-md h-full py-2 bg-[#D9D9D908] ${emailError ? "border-red-500" : "border-bordered"
                    }`}
                />
                <button
                  onClick={handleAddEmail}
                  className="bg-purple rounded-md px-3 py-2.5 h-full"
                >
                  <FaPlus className="text-lg text-white" />
                </button>
              </div>
              {/* Display email error message */}
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}

              <div className="mt-4">
                {emails.length > 0 && (
                  <ul>
                    {emails.map((email, index) => (
                      <li
                        key={index}
                        className={`flex justify-between items-center border p-2 rounded-md mb-2 ${emails.indexOf(email) !== index
                          ? "border-red-500 bg-red-50"
                          : "border-bordered"
                          }`}
                      >
                        <span>{email}</span>
                        <button
                          onClick={() => handleDeleteEmail(email)}
                          className="bg-purple text-white rounded-md p-2.5 text-sm h-full"
                        >
                          <FaTrash />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* Display general invite error */}
            {inviteError && (
              <p className="text-red-500 text-sm">{inviteError}</p>
            )}
            <Button
              onClick={handleSendInvites}
              label={loading ? "Inviting..." : "Send Invite"}
              className={"rounded-md mt-6 sm:w-[40%]"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invite;