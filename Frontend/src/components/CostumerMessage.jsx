import ListGroup from "react-bootstrap/ListGroup";
import { Button, Container } from "react-bootstrap";
import "../styles/costumerMessage.css";
import React, { useState, useEffect } from "react";
import { getAccessToken } from "./authUtils";
import { Modal } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

const CostumerMessage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch messages when the component mounts
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = getAccessToken();
      let allMessages = [];

      // Fetch messages from the first page
      let nextUrl = "http://127.0.0.1:8000/message/";
      while (nextUrl) {
        const response = await fetch(nextUrl, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });

        if (!response.ok) {
          console.log(response.status);
          throw new Error(
            `Failed to fetch messages (Status: ${response.status})`
          );
        }

        const data = await response.json();
        console.log("Fetched messages:", data.results);

        allMessages = [...allMessages, ...data.results];
        nextUrl = data.next; // Update nextUrl for the next page
      }

      setMessages(allMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleShowModal = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeStatus = async (id, newStatus) => {
    try {
      const token = getAccessToken();
      const response = await fetch(`http://127.0.0.1:8000/message/${id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        console.log(response.status);
        throw new Error(
          `Failed to update message status (Status: ${response.status})`
        );
      }

      const updatedMessage = await response.json();
      console.log("Updated message:", updatedMessage); // Log the updated message

      // Update the status in the state
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === id ? { ...msg, status: newStatus } : msg
        )
      );
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  const getMessageStatusTranslation = (status) => {
    switch (status) {
      case "U":
        return "خوانده نشده";
      case "N":
        return "نیازمند اقدام";
      case "A":
        return "پاسخ داده شده";
      default:
        return status;
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

    // Refresh the page
    window.location.reload();
  };

  return (
    <Container
      className="mt-4 pb-3 change-font"
      style={{
        direction: "rtl",
        textAlign: "right",
        backgroundColor: "#92C7CF",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h5 className="text-center p-4">پیام‌ها</h5>
      <ListGroup
        className="p-2"
        style={{ overflowY: "auto", maxHeight: "200px" }}
      >
        {messages.map((message) => (
          <ListGroup.Item
            key={message.id}
            as="li"
            className="d-flex justify-content-between align-items-start item"
          >
            <div className="d-flex w-100 justify-content-between">
              <div>{message.full_name}</div>
              <div className="d-flex align-items-center ml-auto">
                <Button
                  style={{ marginLeft: "5px" }}
                  className="btn btn-danger change-font-btn "
                  onClick={() => handleDeleteMessage(message.id)}
                >
                  حذف
                </Button>
                <Button
                  style={{ marginLeft: "5px" }}
                  className="btn btn-success change-font-btn"
                  onClick={() => handleShowModal(message)}
                >
                  مشاهده
                </Button>
                <Dropdown>
                  <Dropdown.Toggle
                    className="change-font-btn"
                    variant="primary"
                    id={`dropdown-basic-${message.id}`}
                  >
                    {getMessageStatusTranslation(message.status)}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleChangeStatus(message.id, "U")}
                    >
                      خوانده نشده
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleChangeStatus(message.id, "N")}
                    >
                      نیازمند اقدام
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleChangeStatus(message.id, "A")}
                    >
                      پاسخ داده شده
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        style={{ textAlign: "right", direction: "rtl" }}
      >
        <Modal.Title style={{ padding: "20px" }}>جزئیات پیام</Modal.Title>
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
