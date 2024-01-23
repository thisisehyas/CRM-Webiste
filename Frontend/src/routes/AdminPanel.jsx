import AdminInfoBox from "../components/AdminInfoBox";
import RoutesList from "../components/RoutesList";
import { Row, Col } from "react-bootstrap";
import CostumerMessage from "../components/CostumerMessage";
import UsersList from "../components/UsersList";
import { Navbar, Container } from "react-bootstrap";

const AdminPanel = () => {
  return (
    <>
      <Row>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid className="nav-container">
            <Navbar.Brand className="navbar-brand mx-auto">
              <img
                className="logo"
                src="../images/logo-navbar.png"
                alt="لوگوی شرکت"
                style={{ width: "98px", height: "118" }}
              />
            </Navbar.Brand>
          </Container>
        </Navbar>
      </Row>
      <Row className="mx-auto">
        <Col md={6} xs={12}>
          <AdminInfoBox />
          <CostumerMessage />
          <UsersList />
        </Col>

        <Col md={6} xs={12}>
          <RoutesList />
        </Col>
      </Row>
    </>
  );
};

export default AdminPanel;

// i want the length to stretch and be the same size

// if you add the online QA part you can put it under the routeslist
