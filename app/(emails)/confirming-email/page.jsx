"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmEmailOwnership } from "@/services/checkEmails";
import success from "@/public/assets/images/email-confirm.jpg";
import Image from "next/image";
// import { CheckCircleIcon } from '@heroicons/react/solid'; // You can use heroicons for a success icon or other libraries

const ConfirmEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter(); // Use Next.js router for navigation

  // State variables to handle the confirmation status
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        try {
          // Make an API call to verify the token
          const response = await confirmEmailOwnership(token);
          if (response.success) {
            // Handle successful confirmation
            setIsConfirmed(true);
          } else {
            // If the response doesn't indicate success, show an error
            setError("Error confirming email. Please try again later.");
          }
        } catch (error) {
          // Handle errors and update the error state
          setError(
            error.message || "Error confirming email. Please try again later."
          );
        } finally {
          // Stop loading after confirmation or error
          setIsLoading(false);
        }
      }
    };

    verifyEmail(); // Call the async function to handle the email confirmation
  }, [token]);

  // Close the window or navigate to another page after confirmation
  useEffect(() => {
    if (isConfirmed) {
      // If the page was opened with window.open(), you can close it
      if (window.opener) {
        window.close();
      }
    }
  }, [isConfirmed, router]);

  // Render the UI based on the confirmation status
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-white to-blue-200 text-gray-800">
      {isLoading ? (
        // Show loading spinner while confirming
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">
            Please wait, confirming your email...
          </h1>
        </div>
      ) : isConfirmed ? (
        // Show success message with icon
        <div className="text-center flex flex-col items-center ">
          <Image
            src={success}
            className="h-32 w-32 text-green-500 mb-6 animate-bounce"
            alt=" "
          />
          <h1 className="text-3xl font-bold ">
            Your email has been confirmed!
          </h1>
          <p className="text-lg mt-2 text-gray-700">
            Your email has been confirmed successfully.
          </p>
          <p className="text-sm mt-4 text-gray-500">
            You can now close this page.
          </p>
        </div>
      ) : (
        // Show error message if confirmation fails
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">Oops!</h1>
          <p className="text-lg mt-2 text-gray-700">{error}</p>
          <p className="text-sm mt-4 text-gray-500">Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default ConfirmEmail;
