import AdminInfoBox from "../components/Admin/AdminInfoBox";
import RoutesList from "../components/Admin/RoutesList";
import { Row, Col } from "react-bootstrap";
import CostumerMessage from "../components/CostumerMessage";
import UsersList from "../components/UsersList";
import { Navbar, Container } from "react-bootstrap";
import OrderSubmitBox from "../components/Admin/OrderSubmitBox";

const AdminPanel = () => {
  return (
    <div style={{ overflowX: "hidden", height: "100%", margin: "0" }}>
      <Row>
        <Navbar
          expand="lg"
          style={{ boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.1)" }}
          className="bg-body-tertiary"
        >
          <Container fluid>
            <Navbar.Brand className="navbar-brand mx-auto">
              <img
                className="logo"
                src="../images/logo-navbar.png"
                alt="لوگوی شرکت"
                style={{ width: "98px", height: "100px" }}
              />
            </Navbar.Brand>
          </Container>
        </Navbar>
      </Row>
      <Row
        style={{
          background:
            "linear-gradient(to right, rgba(153, 153, 153, 0.1), rgba(153, 153, 153, 0.17))",
        }}
        className="mx-auto"
      >
        <Col md={6} xs={12}>
          <AdminInfoBox />
          <CostumerMessage />
          <UsersList />
        </Col>

        <Col md={6} xs={12}>
          <RoutesList />
          <OrderSubmitBox />
        </Col>
      </Row>
    </div>
  );
};

export default AdminPanel;

// i want the length to stretch and be the same size

// if you add the online QA part you can put it under the routeslist

// need a part for the admin to be able to log out
