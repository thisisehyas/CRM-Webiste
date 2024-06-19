import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { getAccessToken } from "./authUtils";

const UserDetailsModal = ({ phoneNumber, show, handleClose }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/iam/iam/user/?phone_number=${phoneNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch user details");
          throw new Error("Failed to fetch user details");
        }

        const userData = await response.json();
        console.log("Fetched user details successfully:", userData);
        setUserDetails(userData);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    if (show) {
      fetchUserDetails();
    }
  }, [show, phoneNumber]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userDetails ? (
          <div>
            <p>First Name: {userDetails.first_name}</p>
            <p>Last Name: {userDetails.last_name}</p>
            <p>Phone Number: {userDetails.phone_number}</p>
            <p>Customer: {userDetails.is_customer ? "Yes" : "No"}</p>
            <p>Staff: {userDetails.is_staff ? "Yes" : "No"}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
