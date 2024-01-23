import { Row, Col, Container } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/routesList.css";
import { Link } from "react-router-dom";

const RoutesList = () => {
  return (
    <Container className="mt-3">
      <Row className="justify-content-end">
        <Col
          xs={12}
          md={6}
          lg={4}
          style={{ background: "#D9D9D9", borderRadius: "8px" }}
        >
          <h6 className="text-center mb-3 mt-4">فهرست صفحات</h6>
          <ListGroup
            style={{ direction: "rtl", textAlign: "right", padding: "10px" }}
          >
            <ListGroup.Item as={Link} to="" className="item btn btn-secondary">
              خانه
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="" className="item btn btn-secondary">
              محصولات
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="" className="item btn btn-secondary">
              خدمات
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="" className="item btn btn-secondary">
              نمونه کارها
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="" className="item btn btn-secondary">
              درباره ما
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="" className="item btn btn-secondary mb-2">
              تماس با ما
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default RoutesList;
