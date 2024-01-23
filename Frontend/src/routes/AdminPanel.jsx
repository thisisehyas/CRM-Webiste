import AdminInfoBox from "../components/AdminInfoBox";
import RoutesList from "../components/RoutesList";
import { Row, Col } from "react-bootstrap";
import CostumerMessage from "../components/CostumerMessage";
import UsersList from "../components/UsersList";

const AdminPanel = () => {
  return (
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
  );
};

export default AdminPanel;

// i want the length to stretch and be the same size

// if you add the online QA part you can put it under the routeslist
