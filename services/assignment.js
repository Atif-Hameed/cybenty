import { backend_url } from "@/utils/config";
import axios from "axios";

export const getAssignment = async (assigmentId) => {
  try {
    const response = await axios.get(
      `${backend_url}/api/assignments/${assigmentId}`
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while getting assignment.";
    throw new Error(errorMessage);
  }
};

export const updateAssignment = async (assigmentId, data) => {
  try {
    const response = await axios.put(
      `${backend_url}/api/assignments/${assigmentId}`,
      data
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while updating assignment.";
    throw new Error(errorMessage);
  }
};



// game.action.js
export const updateTeamMemberRecommendations = async (assignmentId, email, recommendations) => {
  try {
    const response = await axios.put(
      `${backend_url}/api/update-members-assignments/${assignmentId}`,
      { email, recommendations }
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while updating assignment.";
    throw new Error(errorMessage);
  }
};

export const startAssignment = async (data) => {
  try {
    const response = await axios.post(
      `${backend_url}/api/assignments/start`,
      data
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while starting assignment.";
    throw new Error(errorMessage);
  }
};

export const sendAssignmentInvites = async (data) => {
  try {
    const response = await axios.post(
      `${backend_url}/api/assignments/invitations`,
      data
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while sending invitations.";
    throw new Error(errorMessage);
  }
};

export const getAssignmentMembers = async (assignmentId) => {
  try {
    const response = await axios.get(
      `${backend_url}/api/assignments/${assignmentId}/members`
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while getting members.";
    throw new Error(errorMessage);
  }
};

// get specifi memebr
export const getMember = async (assignmentId, memberId) => {
  try {
    const response = await axios.get(
      `${backend_url}/api/get-member?assignmentId=${assignmentId}&memberId=${memberId}`
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while getting member.";
    throw new Error(errorMessage);
  }
};

export const acceptAssignmentInvite = async (data) => {
  try {
    const response = await axios.post(
      `${backend_url}/api/assignments/invitations/accept`,
      data
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while accepting.";
    throw new Error(errorMessage);
  }
};

export const declineAssignmentInvite = async (data) => {
  try {
    const response = await axios.post(
      `${backend_url}/api/assignments/invitations/declined`,
      data
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while decline.";
    throw new Error(errorMessage);
  }
};
