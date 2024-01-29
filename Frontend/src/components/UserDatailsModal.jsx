// UserDetailsModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { getAccessToken } from "./authUtils";

const UserDetailsModal = ({ userId, show, handleClose }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/auth/users/${userId}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                `JWT ${getAccessToken()}`,
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
  }, [show, userId]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userDetails && (
          <div>
            <p>Email: {userDetails.email}</p>
            <p>Username: {userDetails.username}</p>
            {/* Add more user details here */}
          </div>
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
