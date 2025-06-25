import { backend_url } from "@/utils/config";
import axios from "axios";

// Function to save a checked email
export const saveCheckedEmail = async (userId, email) => {
    try {
        const response = await axios.post(`${backend_url}/api/save-checked-email`, { userId, email });
        return response.data; // Return the response data from the API
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while saving the checked email.';
        throw new Error(errorMessage);
    }
};

// Function to get all checked emails for a specific user
export const confirmEmailOwnership = async (otp) => {
    try {
        const response = await axios.get(`${backend_url}/api/confirm-email?otp=${otp}`);
        return response.data; // Return the response data from the API
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fetching checked emails.';
        throw new Error(errorMessage);
    }
};

// Function to get all checked emails for a specific user
export const getCheckedEmails = async (userId) => {
    try {
        const response = await axios.get(`${backend_url}/api/get-all-checkedEmails?userId=${userId}`);
        return response.data; // Return the response data from the API
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fetching checked emails.';
        throw new Error(errorMessage);
    }
};

// Function to delete a checked email by ID
export const deleteCheckedEmail = async (id) => {
    try {
        const response = await axios.delete(`${backend_url}/api/delete-checkedEmail/${id}`);
        return response.data; // Return the response data from the API
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while deleting the checked email.';
        throw new Error(errorMessage);
    }
};

// Function to update the breach data for a specific email and user
export const updateCheckedEmailData = async (userId, email) => {
    try {
        const response = await axios.put(`${backend_url}/api/update-checked-email-data/${userId}/${email}`);
        return response.data; // Return the response data from the API
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while updating the checked email data.';
        throw new Error(errorMessage);
    }
};


// Function to update the breach status for a specific breach of an email
export const updateBreachStatus = async (email, breachName, status) => {
    console.log(email, breachName, status)
    try {
        const response = await axios.put(`${backend_url}/api/update-breach-status/${email}`, { breachName, status });
        return response.data; // Return the response data from the API
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while updating the breach status.';
        throw new Error(errorMessage);
    }
};





/////////////////////////guest breaches apis////////////////////////////


// Function to save a checked email guest
export const requestGuestBreaches = async (email) => {
    try {
        const response = await axios.post(`${backend_url}/api/request-guest-breach-check`, { email });
        return response.data; // Return the response data from the API
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while checking email.';
        throw new Error(errorMessage);
    }
};



// confrim guest email ownership
export const confirmGuestEmailOwnership = async (otp) => {
    try {
        const response = await axios.get(`${backend_url}/api/confirm-guest-email?otp=${otp}`);
        return response.data; // Return the response data from the API
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while onfirming email.';
        throw new Error(errorMessage);
    }
};



// Function to get the breach data for a specific email in guest
export const getGuestBreachesData = async (email) => {
    try {
        const response = await axios.get(`${backend_url}/api/get-guest-breaches?email=${email}`);
        return response.data; // Return the response data from the API
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fetching breaches data for email.';
        throw new Error(errorMessage);
    }
};