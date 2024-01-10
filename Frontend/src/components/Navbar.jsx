import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/navbar.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Navbar1 = () => {
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
            className="navbar-nav me-5 my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action2" className="nav-link ms-3">
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
        </Navbar.Collapse>

        <Form className="d-flex search-bar">
          <div
            className="form-div"
            style={{
              position: "relative",
              flexGrow: "1",
            }}
          >
            <Form.Control
              type="search"
              placeholder="جستجو"
              className="ms-5"
              aria-label="Search"
              style={{ paddingRight: "40px" }}
            />
            {/* magnifier svg */}
            {/* YOU MAY NEED TO MAKE THIS A BUTTON FOR SEARCH */}
            <svg
              className="magnifier-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="28"
              viewBox="0 0 27 28"
              fill="none"
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                right: "3%",
              }}
            >
              <g clipPath="url(#clip0_54_221)">
                <path
                  d="M17.4375 16.3333H16.5487L16.2338 16.0183C17.3363 14.6883 18 12.9617 18 11.0833C18 6.895 14.7262 3.5 10.6875 3.5C6.64875 3.5 3.375 6.895 3.375 11.0833C3.375 15.2717 6.64875 18.6667 10.6875 18.6667C12.4987 18.6667 14.1637 17.9783 15.4462 16.835L15.75 17.1617V18.0833L21.375 23.905L23.0513 22.1667L17.4375 16.3333ZM10.6875 16.3333C7.88625 16.3333 5.625 13.9883 5.625 11.0833C5.625 8.17833 7.88625 5.83333 10.6875 5.83333C13.4888 5.83333 15.75 8.17833 15.75 11.0833C15.75 13.9883 13.4888 16.3333 10.6875 16.3333Z"
                  fill="#757575"
                />
              </g>
              <defs>
                <clipPath id="clip0_54_221">
                  <rect width="27" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </Form>
        <Button
          as={Link}
          to="/login"
          variant="success"
          style={{
            color: "white",
            backgroundColor: "#56B94C",
            borderColor: "#56B94C",
          }}
          className="enter"
        >
          ورود
        </Button>
      </Container>
    </Navbar>
  );
};

export default Navbar1;

// Things to fix:

// - the logo should be a button that goes to the home page.
// - you can adjust the positions for when the navbar is opened
//    the carousel won't go under it so it is still visible
// - Complete the href of the navbar links.
// - The hover effect of the
//    - each navlink
// - The magnifier needs to be a button for search
// - The logo should be in the middle after the search bar and before the
//    toggler menu.
// - When the menu is opened for scroll the navbar should take the whole
//    width of the horizontal line. But when the menu is closed it should
//    go back. Do this with js.
//    If it only sticked to the right of the page without sapce, that
//    would be ok too.
//  - The search bar, when you try to right in it, the direction is not
//    from right to left. make it happen to be better for persion typing.
//  - Generally speaking I don't like the responsiveness of the navbar. it is responsive but it's ugly. so fix it.
