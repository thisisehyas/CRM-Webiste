import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../styles/error.css";

const ErrorPage = ({ message }) => {
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/");
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="text-center">
        <Col>
          <h1 className="display-4">دسترسی ممنوع</h1>
          <p className="lead" style={{ direction: "rtl", textAlign: "right" }}>
            {message}
          </p>
          <Button variant="primary" onClick={handleGoBack}>
            بازگشت به صفحه اصلی
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
