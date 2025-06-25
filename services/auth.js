import { backend_url } from "@/utils/config";
import axios from "axios"



export const userLogin = async (email, password) => {
    try {
        const response = await axios.post(`${backend_url}/api/user/login-user`, { email, password });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during login.';
        throw new Error(errorMessage);
    }
};

export const userRegister = async (name, email, password, confirmPassword, role) => {
    try {
        const response = await axios.post(`${backend_url}/api/user/create-user`, { name, email, password, confirmPassword, role });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during Registration.';
        throw new Error(errorMessage);
    }
};


export const userTopics = async (userId, interestedTopics) => {
    try {
        const response = await axios.put(`${backend_url}/api/user/update-interested-topics`, { userId, interestedTopics });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred.';
        throw new Error(errorMessage);
    }
};


export const userOtp = async (email, otp) => {
    try {
        const response = await axios.post(`${backend_url}/api/user/verify-otp`, { email, otp });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred verfiying Email.';
        throw new Error(errorMessage);
    }
};


export const userOtpMfa = async (id, otp) => {
    try {
        const response = await axios.post(`${backend_url}/api/user/verify-otp-mfa`, { id, otp });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred verfiying Email.';
        throw new Error(errorMessage);
    }
};

export const getIndiviualUserbyId = async (id) => {
    try {
        const response = await axios.get(`${backend_url}/api/user/get-user-by-id/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during get User.';
        throw new Error(errorMessage);
    }
};


export const toggleUserNotifications = async (userId) => {
    try {
        const response = await axios.put(`${backend_url}/api/user/toggle-notification/${userId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during get User.';
        throw new Error(errorMessage);
    }
};


export const userForgotPassword = async (email) => {
    try {
        const response = await axios.post(`${backend_url}/api/user/forgot-password`, { email });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred Sending link.';
        throw new Error(errorMessage);
    }
};


export const userResendOtp = async (email) => {
    try {
        const response = await axios.post(`${backend_url}/api/user/resend-otp`, { email });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred Sending link.';
        throw new Error(errorMessage);
    }
};


export const userSendMfaOtp = async (id, email) => {
    try {
        const response = await axios.post(`${backend_url}/api/user/send-mfa-otp`, { id, email });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred Sending OTP.';
        throw new Error(errorMessage);
    }
};

// update auth mthd
export const updateUserAuthMethod = async (userId, method) => {
    try {
        const response = await axios.post(`${backend_url}/api/user/update-auth-method`, { userId, method });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred updating auth methos.';
        throw new Error(errorMessage);
    }
};


// switch auth mthod also inclide udating auth
export const switchAuthMethod = async (userId, method) => {
    try {
        const response = await axios.post(`${backend_url}/api/user/switch-auth-method`, { userId, method });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred switching auth methos.';
        throw new Error(errorMessage);
    }
};


// Example of the API call to update secondary email
export const updateUserSecondaryEmail = async (userId, secondaryEmail) => {
    try {
        const response = await axios.put(`${backend_url}/api/user/update-secondary-email`, { userId, secondaryEmail });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to update secondary email';
        throw new Error(errorMessage);
    }
};



export const userResetPassword = async (token, newPassword) => {
    try {
        const response = await axios.post(`${backend_url}/api/user/reset-password`, { token, newPassword });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred Sending link.';
        throw new Error(errorMessage);
    }
};


export const userGenerateQR = async () => {
    try {
        const response = await axios.post(`${backend_url}/api/user/generateQR`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred Sending link.';
        throw new Error(errorMessage);
    }
};


export const userVerifyQR = async (id, userSecret, userToken) => {
    try {
        const response = await axios.post(`${backend_url}/api/user/verifyQR`, { id, userSecret, userToken });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred Sending link.';
        throw new Error(errorMessage);
    }
};


export const updateUserbyId = async (id, userData) => {
    try {
        const response = await axios.put(`${backend_url}/api/user/update-user/${id}`, userData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during Updating User.';
        throw new Error(errorMessage);
    }
};




// add remove favourites
export const toggleFavoriteResource = async (userId, resourceId) => {
    try {
        const response = await axios.put(`${backend_url}/api/user/user-favorite/${userId}/favorite/${resourceId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while toggling favorite resource.';
        throw new Error(errorMessage);
    }
};