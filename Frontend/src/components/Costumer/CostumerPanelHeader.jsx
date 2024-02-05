import React from "react";
import { Row, Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/fontSize.css";

const CostumerPanelHeader = () => {
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
              <img
                className="logo"
                src="../images/logo-navbar.png"
                alt="لوگوی شرکت"
                style={{ width: "98px", height: "100px" }}
              />
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
              <span className="mx-2 change-font">نام و نام خانوادگی مشتری</span>
            </Nav.Item>
          </Container>
        </Navbar>
      </Row>
    </div>
  );
};

export default CostumerPanelHeader;

//change the font of the entire web. It actually makes a difference.
