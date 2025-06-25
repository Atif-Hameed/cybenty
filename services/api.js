import { backend_url } from "@/utils/config";
import axios from "axios"



// All categories
export const allCategories = async () => {
    try {
        const response = await axios.get(`${backend_url}/api/admin/all-categories`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during categories fetching.';
        throw new Error(errorMessage);
    }
};



// get resources by category id
export const getResourcesByCategoryId = async (id) => {
    try {
        const response = await axios.get(`${backend_url}/api/admin/resources-by-category/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during resources fetching.';
        throw new Error(errorMessage);
    }
};


// Indiviual resource
export const indiviualResource = async (id) => {
    try {
        const response = await axios.get(`${backend_url}/api/admin/indiviual-resources/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during resource fetching.';
        throw new Error(errorMessage);
    }
};


// SEARCH RESOURCE
export const searchResource = async (keyword,categoryId) => {
    try {
        const response = await axios.get(`${backend_url}/api/admin/search-resource?keyword=${keyword}&categoryId=${categoryId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during resource searching.';
        throw new Error(errorMessage);
    }
};



////////////////////////////////secrets////////////////////////

// create secret 
export const createSecret = async (secretContent, file, description, message, lifeTime, password) => {
    try {
        const response = await axios.post(`${backend_url}/api/secret/create-secret`, { secretContent, file, description, message, lifeTime, password });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while generating secret.';
        throw new Error(errorMessage);
    }
};



// All categories
export const allSecrets = async () => {
    try {
        const response = await axios.get(`${backend_url}/api/secret/get-all-secrets`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during secrets fetching.';
        throw new Error(errorMessage);
    }
};


// delete Secret
export const deleteSecret = async (id) => {
    try {
        const response = await axios.delete(`${backend_url}/api/secret/delete-secret/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during secrets deleting.';
        throw new Error(errorMessage);
    }
};


// get Secret
export const getSecretById = async (id, type, password) => {
    try {
        // Include the type parameter in the URL
        const response = await axios.post(`${backend_url}/api/secret/get-secret/${id}?type=${type}`, { password });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during secret fetching.';
        throw new Error(errorMessage);
    }
};


// Mark Secret as Viewed
export const markSecretAsViewed = async (id) => {
    try {
        const response = await axios.get(`${backend_url}/api/secret/update-secret/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while marking the secret as viewed.';
        throw new Error(errorMessage);
    }
};




// count views or clicks
export const countResourceViewsClicks = async (id) => {
    try {
        const response = await axios.post(`${backend_url}/api/admin/view-resource-count/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during counting views.';
        throw new Error(errorMessage);
    }
};



// count downlaods
export const countResourceDownloads = async (id) => {
    try {
        const response = await axios.post(`${backend_url}/api/admin/download-resource-count/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during counting downloads.';
        throw new Error(errorMessage);
    }
};



// count likes
export const countResourceLikes = async (id) => {
    try {
        const response = await axios.post(`${backend_url}/api/admin/like-resource-count/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during counting likes.';
        throw new Error(errorMessage);
    }
};


// count shares
export const countResourceShares = async (id) => {
    try {
        const response = await axios.post(`${backend_url}/api/admin/share-resource-count/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during counting shares.';
        throw new Error(errorMessage);
    }
};


// unline resures
export const resourceUnLikes = async (id) => {
    try {
        const response = await axios.post(`${backend_url}/api/admin/unlike-resource-count/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during counting likes.';
        throw new Error(errorMessage);
    }
};

export const getAdminSettings = async (id) => {
    try {
        const response = await axios.get(`${backend_url}/api/admin/settings`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during counting likes.';
        throw new Error(errorMessage);
    }
};