"use server";
import { HIBP_API_KEY } from "@/utils/Constant";
import axios from "axios";

// HIBP API URL
const HIBP_API_URL = "https://haveibeenpwned.com/api/v3";

// Function to get breaches for a specific account (email)
export const checkEmailBreaches = async (email) => {
    if (!email) {
        throw new Error("Email is required");
    }

    try {
        const response = await axios.get(`${HIBP_API_URL}/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`, {
            headers: {
                "hibp-api-key": HIBP_API_KEY, // HIBP API Key in the headers
                "user-agent": "cybenty", // Your app name
            },
        });

        // Process the breach data to return all details
        return response.data; // Returns the full breach data
    } catch (error) {
        // Handle errors properly
        if (error.response) {
            if (error.response.status === 404) {
                return []; // No breaches found for this email
            }
            if (error.response.status === 429) {
                // Handle the 429 error specifically
                throw new Error('Too many requests. Please try again later.'); // Provide a clear message for 429
            }
        }

        // Fallback error message for other errors
        const errorMessage = error.message || 'An error occurred while checking email breaches.';
        throw new Error(errorMessage);
    }
};
