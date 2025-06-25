"use client";
import React, { useEffect, useState } from "react";
import CircularProgress from "../shared/CircularProgressbar";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { getUserEligibilitySolo, getUserTeamPlay, getUserTeamPlays } from "@/actions/assessments.action";
import { startAssignment } from "@/services/assignment";
import Image from "next/image";

const AssessmentDetail = ({ assessment, onClose, count, user, isAssigned, isComplete }) => {
  const [soloLoading, setSoloLoading] = useState(false);
  const [teamLoading, setTeamLoading] = useState(false);
  const [soloPlayed, setSoloPlayed] = useState(false);
  const [teamPlayed, setTeamPlayed] = useState(false);
  const [userTeams, setUserTeams] = useState([]);
  const [error, setError] = useState(null);
  const [soloAssignment, setSoloAssignment] = useState(null);
  const router = useRouter();



  // Check if there's an in-progress SOLO assignment
  const soloInProgress = isAssigned && assessment.status === "ACTIVE" && !isComplete && assessment.assessmentId;

  // Check for in-progress TEAM assignments
  const teamInProgress = userTeams.find(
    (team) =>
      // team.assessmentId === (isAssigned ? assessment.assessmentId._id : assessment?._id) &&
      team.assessmentId === (isAssigned ? assessment._id : assessment?._id) &&
      team.status === "IN_PROGRESS"
  );

  // Check for completed TEAM assignments
  const completedTeams = userTeams.filter(
    (team) =>
      // team.assessmentId === (isAssigned ? assessment.assessmentId._id : assessment?._id) &&
      team.assessmentId === (isAssigned ? assessment._id : assessment?._id) &&
      team.status === "COMPLETED"
  );

  // Check if user has played any game (SOLO or TEAM)
  const hasPlayed = soloPlayed || userTeams.some(
    // (team) => team.assessmentId === (isAssigned ? assessment.assessmentId._id : assessment?._id)
    (team) => team.assessmentId === (isAssigned ? assessment._id : assessment?._id)
  );

  // Check solo eligibility
  const checkSoloAccess = async (assessmentId, userId) => {
    try {
      const { data, error } = await getUserEligibilitySolo(assessmentId, userId);
      if (data) {
        setSoloPlayed(!data.canPlaySolo);
        setSoloAssignment(data.assignemnt)
      } else {
        console.error("Error checking solo eligibility:", error);
      }
    } catch (error) {
      console.error("Error checking solo eligibility:", error);
    }
  };

  // Check any team play
  const checkUserTeamPlay = async (assessmentId, userId) => {
    try {
      const { data, error } = await getUserTeamPlay(assessmentId, userId);
      if (data) {
        setTeamPlayed(data.hasPlayedTeam);
      } else {
        console.error("Error checking team play check:", error);
      }
    } catch (error) {
      console.error("Error checking team play check:", error);
    }
  };

  // Fetch all team assignments for the user
  const getAllUserTeams = async (userId) => {
    try {
      const { data, error } = await getUserTeamPlays(userId);
      console.log(data)
      if (data) {
        setUserTeams(data?.data || []);
      } else {
        console.error("Error fetching team plays:", error);
      }
    } catch (error) {
      console.error("Error fetching team plays:", error);
    }
  };

  console.log("HAS Played TEAMS", teamPlayed)

  // Start a new assignment (SOLO or TEAM)
  const handleStartAssignment = async (assignmentType) => {
    if (!assessment?._id || !user?._id) {
      setError("Invalid assessment data");
      return;
    }
    if (assignmentType === "SOLO") {
      setSoloLoading(true);
    } else if (assignmentType === "TEAM") {
      setTeamLoading(true);
    }
    setError(null);
    try {
      const data = await startAssignment({
        // assessmentId: assessment?._isAssigned ? assessment?.assessmentId?._id : assessment._id,
        assessmentId: assessment?._isAssigned ? assessment?._id : assessment._id,
        userId: user._id,
        assignmentType,
      });

      if (data && assignmentType === "SOLO") {
        router.push(
          `/dashboard/assessments/game/${assessment?._id}?userId=${user?._id}&type=${assignmentType}&assignmentId=${data?._id}`
        );
      } else {
        router.push(
          `/dashboard/assessments/invites?assessment=${assessment?._id}&assignment=${data?._id}&type=TEAM`
        );
      }
    } catch (err) {
      console.error("Assignment error:", err);
      setError(err.message || "Failed to start assessment");
    } finally {
      setSoloLoading(false);
      setTeamLoading(false);
    }
  };

  // Continue an in-progress assignment
  const handleContinue = (type, assignmentId) => {
    if (type === "SOLO") {
      router.push(
        `/dashboard/assessments/game/${assessment.assessmentId._id}?userId=${user._id}&type=SOLO&assignmentId=${assessment._id}`
      );
    } else {
      router.push(
        `/dashboard/assessments/invites?assessment=${assessment?.assessmentId._id || assessment?._id}&assignment=${assignmentId}&type=TEAM`
      );
    }
  };


  const handleDetails = (assessmentId) => {
    router.push(
      `/dashboard/assessments/details?assessmentId=${assessmentId}&userId=${user._id}`
    );
  };
  const handleSoloDetails = (assignemntId) => {
    router.push(
      `/dashboard/assessments/details/view-details?assignmentId=${soloAssignment._id}&assessmentId=${assessment._id}&userId=${user._id}&type=SOLO`
    );
  };

  useEffect(() => {
    if (assessment && user) {
      // checkSoloAccess(isAssigned ? assessment.assessmentId._id : assessment?._id, user?._id);
      checkSoloAccess(isAssigned ? assessment?._id : assessment?._id, user?._id);
      checkUserTeamPlay(assessment?._id, user?._id)
      getAllUserTeams(user?._id);
    }
  }, [assessment, user, isAssigned]);


  return (
    <div className="border w-full max-h-full border-bordered md:rounded-xl overflow-auto bg-white">
      
      <div className="bg-[#F5F6FA40] border-b py-2 sm:px-6 px-4 flex justify-between border-bordered md:rounded-t-xl">
        <h1 className="text-black lg:text-2xl text-sm">Topic #{count}</h1>
        <RxCross1 onClick={onClose} className="text-sm md:hidden block" />
      </div>

      <div className="p-3 flex flex-col items-center justify-between gap-4">
        <div
          style={{ backgroundColor: assessment?.background || "#ffffff" }}
          className="xl:w-32 xl:h-32 w-32  h-32 p-1 flex justify-center items-center rounded-full"
        >
          <Image
            src={assessment?.logo || assessment?.assessmentId?.logo}
            className="w-full h-full object-cover rounded-full"
            alt={assessment?.assessmentName}
            width={500}
            height={500}
          />
        </div>

        <h1 className="lg:text-2xl text-base font-semibold text-center">
          {/* {isAssigned
            ? assessment.assessmentId.assessmentName
            : assessment?.assessmentName} */}
          {isAssigned
            ? assessment.assessmentName
            : assessment?.assessmentName}
        </h1>
        <p className="text-gray text-xs text-center line-clamp-5">
          {/* {isAssigned
            ? assessment.assessmentId.description
            : assessment?.description} */}
          {isAssigned
            ? assessment.description
            : assessment?.description}
        </p>

        {/* {soloInProgress ? (
          <h1 className="font-semibold text-base text-center text-darkPurple">
            Solo In Progress
          </h1>
        ) : teamInProgress ? (
          <h1 className="font-semibold text-base text-center text-darkPurple">
            Team In Progress
          </h1>
        ) : (isComplete || (isAssigned && assessment.status === "COMPLETED")) ? (
          <div>
          </div>
        ) : (
          <h1 className="font-semibold text-base text-center text-red-600">
            Not Started
          </h1>
        )} */}

        <div className="space-y-4 w-full">
          {/* Always show Play with Team button */}
          <button
            onClick={() => handleStartAssignment("TEAM")}
            className={`bg-[#FCAE660A] font-medium border border-primary rounded-md text-primary text-center text-base p-2 w-full hover:bg-[#FCAE661A] transition-colors ${teamLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            disabled={teamLoading}
          >
            {teamLoading ? (
              <span className="flex items-center justify-center gap-2 text-primary">
                <span className="animate-spin rounded-full h-5 w-5 text-base border-b-2 border-primary"></span>
                Please wait...
              </span>
            ) : (
              <span className="text-primary text-base">Play with Team</span>
            )}
          </button>

          {/* Show Solo Play button if not yet played and no assignment */}
          {!soloPlayed && (
            <button
              onClick={() => handleStartAssignment("SOLO")}
              disabled={soloLoading}
              className={`bg-[#FCAE660A] font-medium border border-primary rounded-md text-center text-base p-2 w-full hover:bg-[#FCAE661A] transition-colors ${soloLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {soloLoading ? (
                <span className="flex items-center justify-center gap-2 text-primary">
                  <span className="animate-spin text-base rounded-full h-5 w-5 border-b-2 border-primary"></span>
                  Starting...
                </span>
              ) : (
                <span className="text-primary text-base">Solo Play</span>
              )}
            </button>
          )}

          {/* Continue button for in-progress assignments */}
          {soloInProgress && (
            <button
              onClick={() => handleContinue("SOLO", assessment._id)}
              className="bg-[#FCAE660A]  font-medium border border-primary rounded-md text-primary text-center text-base p-2 w-full hover:bg-[#FCAE661A] transition-colors"
            >
              Continue Solo
            </button>
          )}
          {teamInProgress && (
            <button
              onClick={() => handleContinue("TEAM", teamInProgress.assignmentId)}
              className="bg-[#FCAE660A] font-medium border border-primary rounded-md text-primary text-center text-base p-2 w-full hover:bg-[#FCAE661A] transition-colors"
            >
              Continue Team
            </button>
          )}

          {/* View Result buttons for completed assignments */}

          {/* {hasPlayed && (
            <>
              {soloPlayed && (
                <button
                  onClick={() => handleDetails("SOLO", assessment._id)}
                  className="bg-[#FCAE660A] font-medium border border-primary rounded-md text-primary text-center text-base p-2 w-full hover:bg-[#FCAE661A] transition-colors"
                >
                  View Solo Result
                </button>
              )}
              {completedTeams.map((team) => (
                <button
                  key={team.assignmentId}
                  onClick={() => handleDetails("TEAM", assessment._id)}
                  className="bg-[#FCAE660A] font-medium border border-primary rounded-md text-primary text-center text-base p-2 w-full hover:bg-[#FCAE661A] transition-colors"
                >
                  View Team Result
                </button>
              ))}
            </>
          )} */}


          {hasPlayed && (
            <div>
              {
                teamPlayed &&
                <button
                  onClick={() => handleDetails(assessment._id)}
                  className="bg-[#FCAE660A] font-medium border border-primary rounded-md text-primary text-center text-base p-2 w-full hover:bg-[#FCAE661A] transition-colors"
                >
                  View Team Details
                </button>
              }

              {
                soloPlayed &&
                <button
                  onClick={() => handleSoloDetails(assessment._id)}
                  className={`bg-[#FCAE660A] ${teamPlayed && 'mt-4'} font-medium border border-primary rounded-md text-primary text-center text-base p-2 w-full hover:bg-[#FCAE661A] transition-colors`}
                >
                  View Solo Details
                </button>
              }
            </div>
          )}

        </div>

        {error && <p className="text-red-500 text-base text-center">{error}</p>}
      </div>
    </div>
  );
};

export default AssessmentDetail;