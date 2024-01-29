import ListGroup from "react-bootstrap/ListGroup";
import { Button, Container } from "react-bootstrap";
import "../styles/costumerMessage.css";
import React, { useState, useEffect } from "react";
import { getAccessToken } from "./authUtils";
import { Modal } from "react-bootstrap";
import { all } from "axios";

const CostumerMessage = () => {
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch unread messages when the component mounts
    fetchUnreadMessages();
  }, []);

  const fetchUnreadMessages = async () => {
    try {
      const token = getAccessToken();
      let allMessages = [];
      let nextUrl = "http://127.0.0.1:8000/message/?status=U";

      while (nextUrl) {
        const response = await fetch(nextUrl, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });

        if (!response.ok) {
          console.log(response.status);
          throw new Error(
            `Failed to fetch unread messages (Status: ${response.status})`
          );
        }

        const data = await response.json();
        console.log("Fetched messages:", data);

        allMessages = [...allMessages, ...data.results];
        nextUrl = data.next; // Update nextUrl for the next page
      }

      setUnreadMessages(allMessages);
    } catch (error) {
      console.error("Error fetching unread messages:", error);
    }
  };

  const handleShowModal = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteMessage = async (id) => {
    try {
      const token = getAccessToken();
      const response = await fetch(`http://127.0.0.1:8000/message/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      if (!response.ok) {
        console.log(response.status);
        throw new Error(
          `Failed to delete message (Status: ${response.status})`
        );
      }

      // Remove the deleted message from the state
      setUnreadMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== id)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return new Date(dateTimeString).toLocaleString("en-US", options);
  };
  return (
    <Container
      className="mt-4 pb-3 change-font"
      style={{
        direction: "rtl",
        textAlign: "right",
        backgroundColor: " #D9D9D9",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h6 className="text-center pt-5">پیام‌ها</h6>
      <ListGroup
        className="p-2"
        style={{ overflowY: "auto", maxHeight: "200px" }}
      >
        {unreadMessages.map((message) => (
          <ListGroup.Item
            key={message.id}
            as="li"
            className="d-flex justify-content-between align-items-start item"
          >
            {message.full_name}

            <div>
              <Button
                style={{ marginLeft: "5px" }}
                className="btn btn-danger change-font-btn "
                onClick={() => handleDeleteMessage(message.id)}
              >
                حذف
              </Button>
              <Button
                className="btn btn-success change-font-btn"
                onClick={() => handleShowModal(message)}
              >
                مشاهده
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        style={{ textAlign: "right", direction: "rtl" }}
      >
        {/* <Modal.Header closeButton > */}
        <Modal.Title style={{ padding: "20px" }}>جزئیات پیام</Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body style={{ padding: "20px" }}>
          <p>نام فرستنده: {selectedMessage?.full_name}</p>
          <p>ایمیل: {selectedMessage?.email}</p>
          <p>موضوع: {selectedMessage?.subject}</p>
          <p>پیام: {selectedMessage?.message}</p>
          <p>تاریخ ارسال: {formatDateTime(selectedMessage?.created_at)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CostumerMessage;

// put a scroll bar for the user messages and the list of users for the times we have long lists.

// you should put the messages from the user from the online question and answer to be in a different part
// for example a modal will open or a dialoug and the admin can answer to the user

// the container above it which is the admin info box, has a more margin than it should from the bottom
