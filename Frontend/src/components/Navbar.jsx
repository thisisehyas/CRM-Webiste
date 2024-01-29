// import "bootstrap/dist/css/bootstrap.min.css";
// import React from "react";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import "../styles/navbar.css";
// import { Link } from "react-router-dom/cjs/react-router-dom";
// import LogoutButton from "./LogoutButton";

// const Navbar1 = () => {
//   return (
//     <Navbar
//       expand="lg"
//       className="bg-body-tertiary fixed-top"
//       style={{ textAlign: "right", direction: "rtl" }}
//     >
//       <Container fluid className="nav-container">
//         <Navbar.Brand as={Link} to="/" className="navbar-brand">
//           <img
//             className="logo"
//             src="../images/logo-navbar.png"
//             alt="لوگوی شرکت"
//             style={{ width: "61px", height: "83" }}
//           />
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="navbar-nav me-5 my-2 my-lg-0"
//             style={{ maxHeight: "100px" }}
//             navbarScroll
//           >
//             <Nav.Link as={Link} to="/Products" className="nav-link ms-3">
//               محصولات
//             </Nav.Link>
//             <Nav.Link as={Link} to="/Services" className="nav-link ms-3">
//               خدمات
//             </Nav.Link>
//             <Nav.Link as={Link} to="/SampleWorks" className="nav-link ms-3">
//               نمونه کارها
//             </Nav.Link>
//             <Nav.Link as={Link} to="/About" className="nav-link ms-3">
//               درباره ما
//             </Nav.Link>
//             <Nav.Link as={Link} to="/Contact" className="nav-link ms-3">
//               تماس با ما
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>

//         <div>
//           <Button
//             as={Link}
//             to="/login"
//             variant="success"
//             style={{
//               color: "white",
//               backgroundColor: "#56B94C",
//               borderColor: "#56B94C",
//             }}
//             className="enter"
//           >
//             ورود
//           </Button>
//           <LogoutButton />
//         </div>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navbar1;

// // Things to fix:

// // - the logo should be a button that goes to the home page.
// // - you can adjust the positions for when the navbar is opened
// //    the carousel won't go under it so it is still visible
// // - Complete the href of the navbar links.
// // - The hover effect of the
// //    - each navlink
// // - The magnifier needs to be a button for search
// // - The logo should be in the middle after the search bar and before the
// //    toggler menu.
// // - When the menu is opened for scroll the navbar should take the whole
// //    width of the horizontal line. But when the menu is closed it should
// //    go back. Do this with js.
// //    If it only sticked to the right of the page without sapce, that
// //    would be ok too.
// //  - The search bar, when you try to right in it, the direction is not
// //    from right to left. make it happen to be better for persion typing.
// //  - Generally speaking I don't like the responsiveness of the navbar. it is responsive but it's ugly. so fix it.

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/navbar.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import LogoutButton from "./LogoutButton";

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
            className="navbar-nav ms-auto mb-2 mb-lg-0"
            style={{ maxHeight: "100px", marginRight:'2%' }}
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
            <Button
              as={Link}
              to="/login"
              variant="success"
              style={{
                color: "white",
                backgroundColor: "#56B94C",
                borderColor: "#56B94C",
                marginRight: "10%", 
              }}
              className="enter me-2"
            >
              ورود
            </Button>
            <LogoutButton />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
