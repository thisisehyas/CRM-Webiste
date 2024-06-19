import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Container, Toast } from "react-bootstrap";
import "../styles/fontSize.css";
import UserDetailsModal from "./UserDatailsModal";
import { getAccessToken } from "./authUtils";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserPhoneNumber, setSelectedUserPhoneNumber] = useState(null);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);

  useEffect(() => {
    // Fetch the list of users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log("Fetching users...");
      const response = await fetch("http://127.0.0.1:8080/iam/iam/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        console.error("Failed to fetch users");
        throw new Error("Failed to fetch users");
      }

      const userList = await response.json();
      console.log("Fetched users successfully:", userList);
      const filteredUsers = userList.filter(
        (user) =>
          user.username !== "admin1" &&
          user.username !== "admin" &&
          user.username !== "me"
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const handleViewDetailsClick = (phoneNumber) => {
    setSelectedUserPhoneNumber(phoneNumber);
    setShowUserDetailsModal(true);
  };

  const handleDeleteUser = async (phoneNumber) => {
    try {
      console.log("Deleting user...", phoneNumber);
      const currentPassword = prompt("Please enter your current password:");
      const response = await fetch(
        `http://localhost:8080/iam/iam/user/delete/?phone_number=${phoneNumber}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
          body: JSON.stringify({
            phone_number: phoneNumber,
          }),
        }
      );

      console.log("Delete response:", response);

      if (!response.ok) {
        console.error("Failed to delete user");
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorBody = await response.json(); // Log the response body
          console.log(errorBody);
        }
        throw new Error("Failed to delete user");
      }

      console.log("User deleted successfully");

      // Fetch updated users after deletion
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  return (
    <Container
      className="mt-4 change-font mb-4"
      style={{
        direction: "rtl",
        textAlign: "right",
        backgroundColor: " #92C7CF",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h6 className="text-center pt-5">مدیریت کاربران </h6>

      <ListGroup
        className="p-3"
        style={{ overflowY: "auto", maxHeight: "224px" }}
      >
        {users.map((user) => (
          <ListGroup.Item
            key={user.id}
            as="li"
            className="d-flex justify-content-between align-items-start item"
          >
            {user.first_name} {user.last_name}
            <div className="d-flex">
              <Button
                className="btn btn-danger change-font-btn"
                style={{ marginLeft: "3px" }}
                onClick={() => handleDeleteUser(user.phone_number)}
              >
                حذف کاربر
              </Button>
              <Button
                onClick={() => handleViewDetailsClick(user.phone_number)}
                className="btn btn-success change-font-btn"
              >
                مشاهده اطلاعات
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <UserDetailsModal
        phoneNumber={selectedUserPhoneNumber}
        show={showUserDetailsModal}
        handleClose={handleCloseUserDetailsModal}
      />
    </Container>
  );
};

export default UsersList;
