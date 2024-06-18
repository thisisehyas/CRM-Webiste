import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "../styles/middleEach.css";
import "../styles/fontSize.css";

const MiddleEach = (props) => {
  return (
    <Container className="mt-3">
      <Row>
        <Col className="d-flex align-items-stretch" xs={12} md={6}>
          <p
            className="change-font first-p"
            style={{ direction: "rtl", textAlign: "right" }}
          >
            <h5 className="text-center">توضیحات</h5>
            {props.description}
          </p>
        </Col>
        <Col className="d-flex align-items-stretch mx-auto" xs={7} md={6}>
          <Image
            style={{ marginBottom: "10px", width: "80%", marginLeft: "20%" }}
            src={props.picture}
            alt="عکس محصول"
          />
        </Col>
      </Row>
      <Row>
        <h4 className="text-center mt-3">مشخصات فنی</h4>
        <Image src={props.additional_picture} alt="مشخصات فنی" />
      </Row>
    </Container>
  );
};

export default MiddleEach;
