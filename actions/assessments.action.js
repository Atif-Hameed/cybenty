import { backend_url } from "@/utils/config";
import axios from "axios"



// All assessments
export const allPublishedAssessments = async () => {
    try {
        const response = await axios.get(`${backend_url}/api/all-published-assessments`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during assessments fetching.';
        return { data: null, error: errorMessage };
    }
};


// All assignemnts
export const allAssignments = async (createdBy) => {
    try {
        const response = await axios.get(`${backend_url}/api/user-assignments/${createdBy}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during assignemnts fetching.';
        return { data: null, error: errorMessage };
    }
};



// Update assignemnt
export const updateAssignment = async (assignmentId, updateData) => {
    try {
        const response = await axios.put(
            `${backend_url}/api/update-assignment/${assignmentId}`,
            updateData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to update assessment. Please try again.';
        return { data: null, error: errorMessage };
    }
};


// get assesemtn by id
export const getAssessmentById = async (id) => {
    try {
        const response = await axios.get(`${backend_url}/api/get-assessment/${id}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during assessment fetching.';
        return { data: null, error: errorMessage };
    }
};


// Update Assessment
export const updateAssessment = async (id, updateData) => {
    try {
        const response = await axios.put(
            `${backend_url}/api/update-assessment/${id}`,
            updateData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to update assessment. Please try again.';
        return { data: null, error: errorMessage };
    }
};


// All question of a speific assessmrnt
export const allAssessmentQuestion = async (assessmentId) => {
    try {
        const response = await axios.get(`${backend_url}/api/get-assessment-question/${assessmentId}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during assignemnts fetching.';
        return { data: null, error: errorMessage };
    }
};


// assing assessment
export const assignAssessment = async (assessmentId, userId) => {
    try {
        const response = await axios.post(`${backend_url}/api/assign-assessment`, { assessmentId, userId });
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while assinging.';
        return { data: null, error: errorMessage };
    }
};


// All assessments with assigned assesmts
export const allAssignedAssessemnts = async (userId) => {
    try {
        const response = await axios.get(`${backend_url}/api/get-assgined-assessemtns/${userId}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during assignemnts fetching.';
        return { data: null, error: errorMessage };
    }
};


// All assessments with completed assignments
export const allCompletedAssignedAssessemnts = async (userId, page, limit) => {
    try {
        const response = await axios.get(`${backend_url}/api/get-completed-assgined-assessemtns/${userId}?page=${page}&limit=${limit}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during assignemnts fetching.';
        return { data: null, error: errorMessage };
    }
};



// All user assignments 
export const getUserAllAssignments = async (userId, assessmentId) => {
    try {
        const response = await axios.get(`${backend_url}/api/get-assginments/${userId}/${assessmentId}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during assignemnts fetching.';
        return { data: null, error: errorMessage };
    }
};


// all team mmebrs
export const getAllTeamMembers = async (assignmentId) => {
    try {
        const response = await axios.get(`${backend_url}/api/get-all-members?assignmentId=${assignmentId}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during memebers fetching.';
        return { data: null, error: errorMessage };
    }
};



// check user eligibility for solo
export const getUserEligibilitySolo = async (assessmentId, userId) => {
    try {
        const response = await axios.get(`${backend_url}/api/check-user-soloPlay?assessmentId=${assessmentId}&userId=${userId}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during eligibility fetching.';
        return { data: null, error: errorMessage };
    }
};

// check user team play
export const getUserTeamPlay = async (assessmentId, userId) => {
    try {
        const response = await axios.get(`${backend_url}/api/check-user-temaPlay?assessmentId=${assessmentId}&userId=${userId}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during data fetching.';
        return { data: null, error: errorMessage };
    }
};


// get user teams
export const getUserTeamPlays = async (userId) => {
    try {
        const response = await axios.get(`${backend_url}/api/get-user-teamsPlay?userId=${userId}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during teams fetching.';
        return { data: null, error: errorMessage };
    }
};