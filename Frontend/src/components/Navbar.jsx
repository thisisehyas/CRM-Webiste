import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/navbar.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import LogoutButton from "./LogoutButton";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { getAccessToken } from "./authUtils";

const Navbar1 = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);

  // Function to handle hovering over the user icon
  const handleUserIconClick = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/core/auth/users/me/",
          {
            headers: {
              Authorization: `JWT ${getAccessToken()}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary fixed-top"
      style={{ textAlign: "right", direction: "rtl" }}
    >
      <Container fluid className="nav-container">
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <img
            className="logo"
            src="../images/logo-navbar.png"
            alt="لوگوی شرکت"
            style={{ width: "61px", height: "83" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="navbar-nav ms-auto mb-2 mb-lg-0"
            style={{ maxHeight: "100px", marginRight: "2%" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/Products" className="nav-link ms-3">
              محصولات
            </Nav.Link>
            <Nav.Link as={Link} to="/Services" className="nav-link ms-3">
              خدمات
            </Nav.Link>
            <Nav.Link as={Link} to="/SampleWorks" className="nav-link ms-3">
              نمونه کارها
            </Nav.Link>
            <Nav.Link as={Link} to="/About" className="nav-link ms-3">
              درباره ما
            </Nav.Link>
            <Nav.Link as={Link} to="/Contact" className="nav-link ms-3">
              تماس با ما
            </Nav.Link>
          </Nav>

          <div className="d-flex">
            <Nav.Item
              style={{ cursor: "pointer" }}
              className="mx-2"
              onClick={handleUserIconClick}
            >
              <svg
                className="mb-2"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-user"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Nav.Item>
            <LogoutButton />
          </div>
        </Navbar.Collapse>
      </Container>
      {/* User info modal */}
      <Modal
        style={{ direction: "rtl", textAlign: "right" }}
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header>
          <Modal.Title>اطلاعات کاربر</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userData && (
            <>
              <p>نام: {userData.first_name}</p>
              <p>نام خانوادگی: {userData.last_name}</p>
              <p>ایمیل: {userData.email}</p>
              <p>نام کاربری: {userData.username}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Navbar1;
