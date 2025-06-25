"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createSecret } from "@/services/api";
import AdvancedSettings from "./AdvanceSetting";
import Image from "next/image";
import img from "@/public/assets/icons/shield.svg";

const SendText = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [formData, setFormData] = useState({
    secretContent: "",
    description: "",
    message: "",
    lifeTime: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    setFeedbackMessage("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (parseInt(formData?.lifeTime) < 1) {
      setIsError(true);
      setFeedbackMessage("Lifetime (hours) value must be greater than or equal to 1");
      setLoading(false);
      return;
    }
    setFeedbackMessage("");
    setIsError(false);

    try {
      const { secretContent, description, message, lifeTime, password } =
        formData;
      const response = await createSecret(
        secretContent,
        null,
        description,
        message,
        lifeTime,
        password
      );
      console.log(response);
      setFeedbackMessage(
        "Secret successfully created! Your secure link is ready."
      );
      setLoading(false);
      router.push(
        `/dashboard/tools/send-receive-secret/receive-secret-text?token=${response.secret._id}&type=link`
      );
    } catch (error) {
      setFeedbackMessage(
        error.message || "An error occurred while creating the secret."
      );
      setIsError(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center gap-2 w-fit mt-10">
        <h1 className="text-darkBlue text-center font-medium xl:text-4xl lg:text-3xl md:text-2xl text-xl">
          Send and receive secret securely.
        </h1>
        <p className="text-lg mt-2 text-center text-gray">
          Create a secure one-time secret link. Stop sharing sensitive
          information on chat or email
        </p>
        <textarea
          name="secretContent"
          rows={4}
          className="w-full mt-5 border border-bordered rounded-xl p-4"
          placeholder="Type Secret Content Here"
          value={formData.secretContent}
          onChange={handleInputChange}
        />

        <div className="w-full">
          <AdvancedSettings
            formData={formData}
            onInputChange={handleInputChange}
          />
        </div>

        {feedbackMessage && (
          <div
            className={`text-center mt-4 text-lg ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {feedbackMessage}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="bg-purple mt-12 text-white p-3 px-5 flex items-center justify-center w-full rounded-lg gap-2 md:text-xl sm:text-base text-sm"
          disabled={loading}
        >
          <Image alt="" src={img} />
          {loading
            ? "Encrypting and creating link..."
            : "Encrypt Secret and create a secure Link"}
        </button>
      </div>
    </div>
  );
};

export default SendText;
