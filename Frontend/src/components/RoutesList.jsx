import { Container } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/routesList.css";
import { Link } from "react-router-dom";
import "../styles/fontSize.css";

const RoutesList = () => {
  return (
    <Container
      className="mt-3 mb-4 change-font"
      style={{ background: "#D9D9D9", borderRadius: "10px" }}
    >
      <h6 className="text-center mb-5 mt-3 pt-5">فهرست صفحات</h6>
      <ListGroup
        style={{ direction: "rtl", textAlign: "right", padding: "10px" }}
      >
        <ListGroup.Item as={Link} to="" className="item btn btn-secondary">
          خانه
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="" className="items btn btn-secondary">
          محصولات
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="" className="items btn btn-secondary">
          خدمات
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="" className="items btn btn-secondary">
          نمونه کارها
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="" className="items btn btn-secondary">
          درباره ما
        </ListGroup.Item>
        <ListGroup.Item
          as={Link}
          to=""
          className="items btn btn-secondary mb-2"
        >
          تماس با ما
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default RoutesList;
