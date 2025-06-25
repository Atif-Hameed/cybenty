"use client";
import { getAssignment, getAssignmentMembers } from "@/services/assignment";
import cyberwhite from "@/public/assets/icons/cyberwhite.svg";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../shared/Button";
import Image from "next/image";
import { useSocket } from "@/contexts/socket";
import { startTeamGame } from "@/actions/game.action";

const InviteSend = () => {
  const [members, setMembers] = useState([]);
  const [assignment, setAssignment] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [starting, setStarting] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const assignmentId = params.get("assignment");
  const email = params.get("email");
  const memberId = params.get("memberId");
  const userType = params.get("user");
  const user = useSelector((state) => state?.user?.user);
  const socket = useSocket();
  const memberWithUserId = members.find(member => member.userId);
  const mainMemberId = memberWithUserId?._id;

  const getData = async () => {
    try {
      const assignment = await getAssignment(assignmentId);
      const members = await getAssignmentMembers(assignmentId);
      setMembers(members.data);
      setAssignment(assignment);
    } catch (error) {
      console.log("error getting members", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!assignmentId) return;

    getData();

    if (socket) {

      // Join the assignment-specific room
      socket.emit('join_assignment', assignmentId);

      // Listen for game start event
      const handleGameStarted = (data) => {
        if (userType === 'member') {
          // Only redirect if the event is for this specific member
          if (data.memberId === memberId) {
            window.location.href = data.redirectTo;
          } else {
            console.log("This game start event is for another member, ignoring.");
          }
        }
      };

      // Listen for member joined event (when someone accepts invitation)
      const handleMemberJoined = (data) => {
        setMembers(prevMembers =>
          prevMembers.map(member =>
            member._id === data.memberId
              ? { ...member, status: "ACCEPTED" }
              : member
          )
        );
      };

      // Listen for member declined event (when someone declines invitation)
      const handleMemberDeclined = (data) => {
        // console.log("Member declined event received:", data);
        setMembers(prevMembers =>
          prevMembers.map(member =>
            member._id === data.memberId
              ? { ...member, status: "DECLINED" }
              : member
          )
        );
      };

      socket.on('game_started', handleGameStarted);
      socket.on('member_joined', handleMemberJoined);
      socket.on('member_declined', handleMemberDeclined);

      return () => {
        socket.off('game_started', handleGameStarted);
        socket.off('member_joined', handleMemberJoined);
        socket.off('member_declined', handleMemberDeclined);
      };
    }
  }, [assignmentId, socket, userType]);


  const handleStartAssignment = async () => {
    setStarting(true);

    try {
      // Call the startTeamGame API
      const { data, error } = await startTeamGame(
        assignmentId,
        user?._id,
        user?.email,
        assignment?.assessmentId?._id
      );


      if (error) {
        setStarting(false);
        setError(error)
      } else {
        // Only redirect the owner (members will be redirected via socket)
        router.push(
          `/dashboard/assessments/game/${assignment?.assessmentId?._id}?type=${assignment?.assignmentType}&userId=${user._id}&assignmentId=${assignmentId}&memberId=${mainMemberId}`
        );
      }

    } catch (err) {
      setError(err.message);
      setStarting(false);
    } finally {
      setStarting(false);
    }
  };


  if (loading) {
    return <h1 className="pt-20 font-semibold text-center">Loading...</h1>;
  }

  return (
    <div className="flex justify-center sm:p-10 p-6 items-center">
      <div className="border xl:w-[50%] lg:w-[70%] w-full border-bordered md:rounded-xl bg-white">
        <div className="bg-[#F5F6FA40] border-b py-2 sm:px-6 px-4  border-bordered md:rounded-t-xl">
          <h1 className="text-black font-semibold text-center lg:text-2xl text-xl">
            {assignment?.assessmentId?.assessmentName}
          </h1>
        </div>

        <div className="p-6 sm:px-16 flex flex-col items-center gap-6 w-full">
          <div className=" xl:w-40 w-32 xl:h-40 h-32 flex justify-center items-center rounded-full">
            <img src={assignment?.assessmentId?.logo} className="rounded-full h-full w-full" alt="" />
          </div>
          {/* <h1 className="text-black font-semibold text-center lg:text-2xl text-xl">
            {assignment?.assessmentId?.assessmentName}
          </h1> */}

          <h1 className="text-[#979797]  text-center lg:text-2xl text-xl">
            <span className="text-primary font-semibold">
              {
                members?.filter((member) => member?.status === "ACCEPTED")
                  ?.length
              }
            </span>{" "}
            people have joined
          </h1>

          {
            userType == 'member' ?
              <h1 className="text-darkPurple font-semibold text-center lg:text-2xl text-xl">
                Team Lead has not Started Yet.
              </h1>
              :
              <button
                onClick={() => handleStartAssignment()}
                className={`font-medium bg-primary rounded-md text-white text-center  text-xl px-6 py-2 transition-colors  ${starting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                disabled={starting}
              >
                {starting ? (
                  <span className="flex items-center justify-center gap-2 text-white">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    Starting...
                  </span>
                ) : (
                  <span className="text-white">Start</span>
                )}
              </button>
          }

          <p className="text-sm mt-2 text-red-500">{error}</p>


          <div className="sm:w-fit w-full text-gray mt-10">
            {members?.map((member) => (
              <div key={member?._id} className="w-full">
                {
                  user?.email === member?.email ? ''
                    :
                    <div

                      className=" px-4 flex gap-2 break-all border items-start border-bordered p-2 rounded-md mb-2"
                    >
                      <span className="h-8 w-8 mt-1 bg-lightGray text-slate-700 p-1 rounded-full flex items-center justify-center" >{(member?.user?.name ? member?.user?.name : member?.email).charAt(0).toUpperCase()}</span>
                      <div className="flex flex-col">
                        <span>{member?.user?.name ? member?.user?.name : member?.email}</span>
                        <span className="italic text-xs">{member?.status}</span>
                      </div>
                    </div>
                }

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteSend;
