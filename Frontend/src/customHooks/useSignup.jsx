import { useState } from "react";

const useSignup = (formData, onSuccess) => {
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/iam/iam/signup/",
        formData
      );
      if (response.status === 201) {
        setSignupSuccess(true);
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setSignupError("خطا در ثبت نام!");
    } finally {
      setTimeout(() => setSignupSuccess(false), 3000);
    }
  };

  return {
    signupSuccess,
    signupError,
    handleSubmit,
  };
};

export default useSignup;
