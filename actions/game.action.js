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



// assing assessment
export const startGame = async (assessmentId, userId, teamMode) => {
    try {
        const response = await axios.post(`${backend_url}/api/game/start-game`, { assessmentId, userId, teamMode });
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while assinging.';
        return { data: null, error: errorMessage };
    }
};


// start team game
export const startTeamGame = async (assignmentId, userId, email, assessmentId) => {
    try {
        const response = await axios.post(`${backend_url}/api/game/start-team-game`, { assignmentId, userId, email, assessmentId });
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while starting game.';
        return { data: null, error: errorMessage };
    }
};


// force submit game
export const forceSubmit = async (assignmentId, userId, email) => {
    try {
        const response = await axios.post(`${backend_url}/api/game/force-submit`, { assignmentId, userId, email });
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while force submiting.';
        return { data: null, error: errorMessage };
    }
};


// submit answer
export const submitAnswer = async (userId, email, questionId, userAnswer, assignmentId) => {
    try {
        const response = await axios.post(`${backend_url}/api/game/submit-answer`, { userId, email, questionId, userAnswer, assignmentId });
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while submitting answer.';
        return { data: null, error: errorMessage };
    }
};


// fnish assigemnt
export const finshAssignemnt = async (assignmentId) => {
    try {
        const response = await axios.post(`${backend_url}/api/game/finish-assignment`, { assignmentId });
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while finishing assignemnt.';
        return { data: null, error: errorMessage };
    }
};


// submit answer
export const getAllQuestions = async (userId, email, assessmentId, assignmentId) => {
    try {
        const response = await axios.get(`${backend_url}/api/game/get-all-questions?userId=${userId}&email=${email}&assessmentId=${assessmentId}&assignmentId=${assignmentId}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fwthcing questions.';
        return { data: null, error: errorMessage };
    }
};


// decode game id
export const decodeGameId = async (shortCode) => {
    try {
        const response = await axios.get(`${backend_url}/api/game/decode-gameId?shortCode=${shortCode}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while decoding game id.';
        return { data: null, error: errorMessage };
    }
};

// get team results
export const getTeamResults = async (assignmentId, assessmentId) => {
    try {
        const response = await axios.get(`${backend_url}/api/game/team-results?assignmentId=${assignmentId}&assessmentId=${assessmentId}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fwthcing results.';
        return { data: null, error: errorMessage };
    }
};


// get solo results
export const getSoloResult = async (assignmentId, assessmentId) => {
    try {
        const response = await axios.get(`${backend_url}/api/game/solo-result?assignmentId=${assignmentId}&assessmentId=${assessmentId}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fwthcing result.';
        return { data: null, error: errorMessage };
    }
};


// get total score 
export const getUserTotalScore = async (userId) => {
    try {
        const response = await axios.get(`${backend_url}/api/total-score/${userId}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fwthcing total score.';
        return { data: null, error: errorMessage };
    }
};


// get total user acheivements 
export const getUserTotalAcheivements = async (userId) => {
    try {
        const response = await axios.get(`${backend_url}/api/total-acheivements/${userId}`);
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fwthcing total acheivements.';
        return { data: null, error: errorMessage };
    }
};




// fnish assigemnt
export const sendReaction = async (
    assignmentId,
    winnerMemberId,
    senderEmail,
    senderMemberId,
    reactionType
) => {
    try {
        const response = await axios.post(`${backend_url}/api/reactions/send`, {
            assignmentId,
            winnerMemberId,
            senderEmail,
            senderMemberId,
            reactionType
        });
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while sending reactions.';
        return { data: null, error: errorMessage };
    }
};