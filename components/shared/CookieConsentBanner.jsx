// components/CookieConsentBanner.js
'use client';
import React, { useState } from "react";
import CookieConsent from "react-cookie-consent";
import Image from "next/image";
import cookie from "@/public/assets/images/cookie.png";
import Link from "next/link";

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  const handleAccept = () => {
    console.log("User accepted cookies");
    setShowBanner(false); // Hide the banner
  };

  const handleDecline = () => {
    console.log("User declined cookies");
    setShowBanner(false); // Hide the banner
  };

  const handleClose = () => {
    console.log("Close button clicked");
    setShowBanner(false); // Hide the banner
  };

  if (!showBanner) {
    return null; // If showBanner is false, do not render the banner
  }

  return (
    <div className="cookie-banner-custom-mainwrapper absolute bottom-4 mr-5 w-[100%]">
      <CookieConsent
        location="bottom"
        declineButtonText="Decline"
        buttonText="Accept"
        enableDeclineButton
        overlay
        cookieName="CookieConsent"
        onAccept={handleAccept}
        onDecline={handleDecline}
        containerClasses="cookie-banner-custom"
        className="flex gap-3 md:flex-row sm:flex-col sm:w-full w-[100%] relative"
        expires={40}
        style={{
          color: "black",
          position: "fixed",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        buttonStyle={{
          backgroundColor: "#083d99",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          borderRadius: "8px",
          margin: "0.5rem",
          fontWeight: "bold",
        }}
        declineButtonStyle={{
          backgroundColor: "white",
          color: "#344054",
          border: "none",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          borderRadius: "8px",
          margin: "0.5rem",
          fontWeight: "bold",
          // borderColor: '#D0D5DD',
          border: "1.4px solid #D0D5DD"
        }}
      >
        <div className="flex justify-between items-center w-full relative md:flex-row sm:flex-col sm:w-full overflow-hidden">
          {/* <div className="hidden md:flex w-[50px] h-[45px] shadow-sm rounded-[10px] border-2 border-[#EAECF0] ">
            <Image
              // className="rounded-full"
              src={cookie}
              alt="Cookie Banner Image"
              className="w-full h-full object-contain"
            />
          </div> */}

          <span className="text-[#344054] font-bold sm:text-xs md:text-base sm:w-full sm:mt-2 md:mt-0 md:ml-4">
         {` We use cookies on our website to give you the most relevant experience by remembering your preferences and repeat visits. By clicking “Accept All”, you consent to the use of ALL the cookies.`}
          </span>
        </div>
        <div className="absolute right-2 top-0 ">
          <button
            onClick={handleClose}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "30px",
              // fontWeight: "semibold",
              outline: "none",
            }}
            className=" text-[#D0D5DD]"
          >
            &times;
          </button>
        </div>
      </CookieConsent>
    </div>
  );
};

export default CookieConsentBanner;
