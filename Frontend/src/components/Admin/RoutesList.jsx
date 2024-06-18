import { Container } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import "../../styles/routesList.css";
import { Link } from "react-router-dom";
import "../../styles/fontSize.css";

const RoutesList = () => {
  return (
    <Container
      className="mt-3 mb-4 pb-5 change-font"
      style={{
        background: "#92C7CF",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h5 className="text-center mb-5 mt-3 pt-5">فهرست صفحات</h5>
      <ListGroup
        style={{ direction: "rtl", textAlign: "right", padding: "10px" }}
      >
        <ListGroup.Item
          as={Link}
          to="/AdminHome"
          className="item btn btn-secondary"
        >
          خانه
        </ListGroup.Item>
        <ListGroup.Item
          as={Link}
          to="/AdminProducts"
          className="items btn btn-secondary"
        >
          محصولات
        </ListGroup.Item>

        <ListGroup.Item
          as={Link}
          to="Services"
          className="items btn btn-secondary"
        >
          خدمات
        </ListGroup.Item>
        <ListGroup.Item
          as={Link}
          to="SampleWorks"
          className="items btn btn-secondary"
        >
          نمونه کارها
        </ListGroup.Item>
        <ListGroup.Item
          as={Link}
          to="/About"
          className="items btn btn-secondary"
        >
          درباره ما
        </ListGroup.Item>
        <ListGroup.Item
          as={Link}
          to="/Contact"
          className="items btn btn-secondary mb-2"
        >
          تماس با ما
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default RoutesList;
