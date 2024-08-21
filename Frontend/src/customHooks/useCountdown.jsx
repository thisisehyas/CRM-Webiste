import { useState, useEffect } from "react";

const useCountdown = (initialValue, isActive) => {
  const [countdown, setCountdown] = useState(initialValue);

  useEffect(() => {
    let timer;
    if (countdown > 0 && isActive) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown, isActive]);

  const startCountdown = (value) => {
    setCountdown(value);
  };

  return [countdown, startCountdown];
};

export default useCountdown;
