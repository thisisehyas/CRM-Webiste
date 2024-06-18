import React, { useEffect, useState } from "react";
import { Row, Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/fontSize.css";
import { getAccessToken } from "../authUtils";
import axios from "axios";
import { Link } from "react-router-dom";

const CostumerPanelHeader = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8080/core/auth/users/me/",
          {
            headers: {
              Authorization: `JWT ${getAccessToken()}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.log("Error fetching costumer data: ", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div
      style={{
        overflowX: "hidden",
        boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row>
        <Navbar
          expand="lg"
          style={{ boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.1)" }}
          className="bg-body-tertiary"
        >
          <Container
            fluid
            className="d-flex justify-content-between flex-row-reverse"
          >
            <Navbar.Brand className="navbar-brand mx-2 mx-lg-5">
              <Link to="/">
                <img
                  className="logo"
                  src="../images/logo-navbar.png"
                  alt="لوگوی شرکت"
                  style={{ width: "98px", height: "100px" }}
                />
              </Link>
            </Navbar.Brand>
            <Nav.Item className="mx-2 mx-lg-5">
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
              <span className="mx-2 change-font">
                {userData
                  ? `${userData.first_name} ${userData.last_name}`
                  : "Loading..."}
              </span>
            </Nav.Item>
          </Container>
        </Navbar>
      </Row>
    </div>
  );
};

export default CostumerPanelHeader;
