
import React from "react";
import Button from "react-bootstrap/Button";
import { removeAccessToken } from "../components/authUtils.jsx";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Clear the access token from storage or perform any other logout-related actions
    removeAccessToken();

    // Redirect the user to the login page or any other desired page
    history.push("/login");
  };

  return (
    <Button
      variant="danger"
      style={{
        color: "white",
        backgroundColor: "#FF5C5C",
        borderColor: "#FF5C5C",
        width: "80px",
      }}
      onClick={handleLogout}
    >
      خروج
    </Button>
  );
};

export default LogoutButton;
