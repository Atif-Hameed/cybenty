"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/components/shared/Heading";
import { toast, Toaster } from "react-hot-toast";
import {
  updateUserAuthMethod,
  updateUserSecondaryEmail,
  userGenerateQR,
  userOtp,
  userOtpMfa,
  userSendMfaOtp,
  userVerifyQR,
} from "@/services/auth";
import MaxContainer from "@/components/shared/Layout/MaxContainer";
import Image from "next/image";
import logo from "@/public/assets/images/logomain.png";
import img from "@/public/assets/images/loginBanner.png";
import AuthHeading from "@/components/shared/AuthHeading";
import CustomInput from "@/components/shared/CustomInput";
import { FaEnvelope } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import CustomRadioButton from "@/components/shared/CustomRadio";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";

const Page = () => {
  const [authMethod, setAuthMethod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [email, setEmail] = useState(
    user?.secondaryEmail ? user?.secondaryEmail : user?.email
  );
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingQR, setLoadingQR] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [connectionMessage, setConnectionMessage] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleGenerateQR = async () => {
    setLoadingQR(true);
    try {
      const response = await userGenerateQR();
      if (response && response.qrCode && response.secret) {
        setQrCode(response.qrCode);
        setSecret(response.secret);
        localStorage.setItem("secret", response.secret);
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      const errorMessage =
        error.message || "An error occurred generating TOTP.";
      toast.error(errorMessage); // Error toast
    } finally {
      setLoadingQR(false);
    }
  };

  useEffect(() => {
    handleGenerateQR();
  }, []);

  const handleSendOtp = async () => {
    setLoadingSend(true);
    try {
      const emailToSend = email || user.email;
      if (email !== user?.secondaryEmail) {
        const data = await updateUserSecondaryEmail(user._id, email);
        dispatch(setUser(data?.user));
        setMessage("OTP sent to your updated email address!");
      } else {
        setMessage("OTP sent to your email!");
      }
      await userSendMfaOtp(user?._id, emailToSend);
      setOtpSent(true);
    } catch (error) {
      const errorMessage =
        error.message ||
        "An error occurred sending the OTP or updating the secondary email.";
      setMessage(errorMessage);
    } finally {
      setLoadingSend(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoadingVerify(true);
    try {
      const data = await userOtpMfa(user?._id, otp);
      setSuccessMessage("OTP verified successfully!"); // Set success message
      setErrorMessage(""); // Clear error message
      setOtp("");
    } catch (error) {
      const errorMessage =
        error.message || "An error occurred verifying the TOTP."; // Use a simple error message
      setErrorMessage(errorMessage); // Set only the error message
      setSuccessMessage(""); // Clear success message
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleVerifyTotp = async () => {
    setLoadingVerify(true);
    try {
      const response = await userVerifyQR(user?._id, secret, otp);
      setSuccessMessage(response.message); // Set success message
      setErrorMessage(""); // Clear error message
      setOtp("");
      setConnectionMessage("Your app connected successfully!"); // Set success message
      setQrCode(""); // Clear QR code after successful connection
    } catch (error) {
      console.error("Error verifying TOTP:", error);
      const errorMessage =
        error.message || "An error occurred verifying the TOTP."; // Use a simple error message
      setErrorMessage(errorMessage); // Set only the error message
      setSuccessMessage(""); // Clear success message
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleAuthMethods = async (value) => {
    try {
      const data = await updateUserAuthMethod(user?._id, value);
      dispatch(setUser(data?.user));
      window.location.reload();
      setMessage("Authentication method updated successfully.");
      setOtp("");
      setAuthMethod(value);
    } catch (error) {
      setMessage(error.message || "An error occurred");
      console.log(error);
    }
  };

  useEffect(() => {
    const AuthMethod = () => {
      if (user?.authMethod === "otp") setAuthMethod("otp");
      else setAuthMethod("mfa");
    };
    AuthMethod();
  }, [user?.authMethod]);

  return (
    <div className="bg-white flex items-center font-poppins justify-center p-6">
      <Toaster />
      <div className="w-full flex justify-start items-start border border-bordered rounded-xl p-6 h-full">
        <div className="w-full h-fit">
          <AuthHeading>
            <p className="text-start w-full font-bold text-darkBlue mt-3">
              Multifactor Authentication Setup
            </p>
          </AuthHeading>
          <p className="text-gray my-4 text-start">
            Multifactor Authentication (MFA) adds an extra layer of security to
            your account by requiring not only your password but also an
            additional verification code. Follow the steps below to set up MFA
            for your account.
          </p>

          <div className="mt-5">
            <p className="text-gray font-medium text-xl">
              Select Your Authentication Method:
            </p>
            <div className="flex items-center justify-start gap-8 mt-3">
              <div className="flex items-center gap-2">
                <CustomRadioButton
                  name="auth"
                  value="mfa"
                  isChecked={authMethod === "mfa"}
                  onChange={(value) => handleAuthMethods(value)}
                />
                <p>Authentication App</p>
              </div>
              <div className="flex items-center gap-2">
                <CustomRadioButton
                  name="auth"
                  value="otp"
                  isChecked={authMethod === "otp"}
                  onChange={(value) => handleAuthMethods(value)}
                />
                <p>Email</p>
              </div>
            </div>

            <div>
              {successMessage && (
                <p className="text-green-500 my-3">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-red-500 my-3">{errorMessage}</p>
              )}
              <p className="text-green-500 my-3">{message}</p>
              <p className="text-green-500 my-3">{connectionMessage}</p>{" "}
              {/* Display connection message */}
            </div>

            {authMethod === "otp" && (
              <div>
                <div className=" flex items-center justify-between gap-4  mt-4">
                  <CustomInput
                    type="email"
                    icon={<FaEnvelope />}
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="bg-purple text-white rounded-lg px-5 py-2.5"
                    onClick={handleSendOtp}
                    disabled={loadingSend}
                  >
                    {loadingSend ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            )}

            {authMethod === "mfa" && (
              <div
                className={`flex   items-end gap-10 ${
                  qrCode
                    ? "justify-between sm:w-[60%] w-full"
                    : "justify-center w-full"
                } `}
              >
                <div className="flex flex-col">
                  <span className="text-xl font-light text-black text-opacity-50">
                    Configure mobile app
                  </span>
                  <span className="text-sm text-black text-opacity-50 mt-3">
                    Complete the following steps to configure your mobile app.
                  </span>
                  <div className="flex flex-col space-y-3 mt-5">
                    <span className="text-sm text-black text-opacity-50 ml-3">
                      1. Install the microsoft authenticator app for Windows
                      Phone, Android or iOS.
                    </span>
                    <span className="text-sm text-black text-opacity-50 ml-3">
                      {`2. In the app, add an account and choose "Work or school
                      account".`}
                    </span>
                    <span className="text-sm text-black text-opacity-50 ml-3">
                      3. Scan the image below.
                    </span>
                    {qrCode && (
                      <div className="ml-3">
                        <img
                          src={qrCode}
                          className="w-32 h-32"
                          alt="TOTP QR Code"
                        />{" "}
                        {/* Adjust size here */}
                        {/* <p className="text-green-500 mt-2">
                        Scan this QR code
                      </p>{" "} */}
                        {/* Instruction to scan */}
                      </div>
                    )}
                  </div>
                </div>
                {/* <button
                  className="bg-purple text-white w-fit rounded-lg px-7 py-3 text-lg mt-10"
                  onClick={handleGenerateQR}
                  disabled={loadingQR}
                >
                  {loadingQR ? "Generating..." : "Get QR Code"}
                </button> */}
              </div>
            )}

            {authMethod === "mfa" && (
              <div className="mt-4">
                <div className="bg-[#FDFDFD] p-2 rounded-xl mt-2">
                  <CustomInput
                    type="text"
                    name="otp"
                    icon={<BsFillShieldLockFill />}
                    placeholder="Enter the six-digit code from the Authenticator App"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button
              className="bg-purple text-white w-full rounded-lg px-5 py-2.5 mt-3"
              onClick={handleVerifyTotp}
              disabled={loadingVerify}
            >
              {loadingVerify ? "Verifying..." : "Verify"}
            </button>

            {otpSent && (
              <button
                className="bg-purple text-white w-full rounded-lg px-5 py-2.5 mt-3"
                onClick={handleVerifyOtp}
                disabled={loadingVerify}
              >
                {loadingVerify ? "Verifying..." : "Verify OTP"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
