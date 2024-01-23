import AdminInfoBox from "../components/AdminInfoBox";
import RoutesList from "../components/RoutesList";
import { Row, Col } from "react-bootstrap";

const AdminPanel = () => {
  return (
    <Row className="mx-auto">
      <Col md={6} xs={12}>
        <AdminInfoBox />
        {/* <Messages /> */}
      </Col>

      <Col md={6} xs={12}>
        <RoutesList />
      </Col>
    </Row>
  );
};

export default AdminPanel;

// i want the length to stretch and be the same size
