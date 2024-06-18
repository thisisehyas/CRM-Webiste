import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../../styles/fontSize.css";
import { Link } from "react-router-dom";

const OrderBox = () => {
  return (
    <>
      <Container
        style={{
          backgroundColor: "#92C7CF",
          borderRadius: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",

          paddingLeft: "15px",
          paddingRight: "15px",
        }}
        className="p-4 mt-4 mb-4 change-font"
      >
        <Row>
          <Col md="6">
            <Form
              style={{ textAlign: "right", direction: "rtl", padding: "10px" }}
            >
              <h4 className="mb-5 change-font-title-CPanel">
                <b>سفارش شماره 1</b>
              </h4>
              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label className="mt-2"> نام محصول</Form.Label>
                  <Form.Control required type="text" disabled />
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <Form.Label className="mt-2"> دسته‌بندی</Form.Label>
                  <Form.Control required type="text" disabled />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label className="mt-2"> تاریخ ثبت سفارش</Form.Label>
                  <Form.Control required type="text" disabled />
                </Form.Group>
              </Row>

              <h5 className="mt-5 change-font-title-CPanel">
                اطلاعات مسئول ثبت سفارش
              </h5>
              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label className="mt-2">نام کاربری</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control type="text" required disabled />
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <Form.Label className="mt-2">ایمیل</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    pattern="[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9"
                    disabled
                  />
                </Form.Group>
              </Row>
            </Form>
          </Col>

          <Col md="6">
            <div className="d-flex flex-column">
              <Image
                className="m-5"
                style={{ borderRadius: "20px", maxWidth: "100%" }}
                src="http://127.0.0.1:8000/machine_pics/carousel3.jpg"
              ></Image>
              <Link
                className="text-center change-font-title-CPanel btn btn-primary w-40 mx-auto"
                style={{ textDecoration: "none" }}
              >
                صفحه محصول
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderBox;
