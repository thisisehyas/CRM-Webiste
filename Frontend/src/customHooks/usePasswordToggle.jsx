import { useState } from "react";

const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return [showPassword, togglePasswordVisibility];
};

export default usePasswordToggle;
