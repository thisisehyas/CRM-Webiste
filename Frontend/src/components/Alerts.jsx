import React from "react";
import { Alert } from "react-bootstrap";

const Alerts = ({ variant, message }) => {
  return (
    <Alert variant={variant} className="mt-4 text-center change-font">
      {message}
    </Alert>
  );
};

export default Alerts;
