import { useState } from "react";
import axios from "axios";
import { setAccessToken } from "../components/authUtils";

/**
 * useVerification hook
 *
 * This custom hook is used in Signup component
 * to handle states related to the verification of the code
 * which the user should enter to verify their account.
 * It also includes the function that will make the request to the API endpoint
 * to check the validation of the code.
 * 
 * @param {string} phoneNumber - The phone number of the user being verified.
 * 
 * @returns {Object} - the states and functions that will be used in the Signup component
 */
const useVerification = (phoneNumber) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

  const handleVerificationCodeChange = (event) => {
    const code = event.target.value;
    setVerificationCode(code);
    setIsCodeEntered(code.trim() !== "");
  };

  const handleVerificationSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/iam/iam/verify-code/",
        {
          phone_number: phoneNumber,
          code: verificationCode,
        }
      );
      if (response.status === 200) {
        setVerificationSuccess(true);
        setAccessToken(response.data.access_token);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setVerificationError(true);
      } else {
        console.error("Error verifying code: ", error);
      }
    }
  };

  return {
    verificationCode,
    isCodeEntered,
    verificationSuccess,
    verificationError,
    handleVerificationCodeChange,
    handleVerificationSubmit,
  };
};

export default useVerification;
