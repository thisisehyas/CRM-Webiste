import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../../styles/fontSize.css";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderSubmitBox = () => {
  return (
    <>
      <Container
        style={{
          backgroundColor: "#D9D9D9",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
        className="p-4 mt-3 mb-3 change-font"
      >
        <Form style={{ textAlign: "right", direction: "rtl" }}>
          <h5 className="text-center mb-5">ثبت سفارش</h5>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label className="mt-2">آیدی خریدار</Form.Label>
              <Form.Control required type="number" />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label className="mt-2"> آیدی ماشین</Form.Label>
              <Form.Control required type="number" />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label className="mt-2">ایمیل</Form.Label>
              <Form.Control
                type="email"
                required
                pattern="[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9"
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label className="mt-2">تاریخ</Form.Label>
              <InputGroup hasValidation>
                <Form.Control type="text" required />
              </InputGroup>
            </Form.Group>
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <Button style={{ width: "15%", fontSize: "115%" }}>ثبت</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default OrderSubmitBox;


// put a format for the data input field.
// see if you are getting all the info needed to submit an order.