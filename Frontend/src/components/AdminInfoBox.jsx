import React from "react";
import { Container } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const AdminInfoBox = () => {
  const [validated, setValidated] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container className="problem-container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h6 className="text-center">مشخصات بیمار</h6>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            {/* <Form.Label>نام</Form.Label> */}
            <Form.Control
              className="input-field"
              required
              type="text"
              placeholder=" نام و نام‌خانوادگی"
              disabled
            />
          </Form.Group>

          <Form.Group as={Col} md="4">
            {/* <Form.Label>نام خانوادگی</Form.Label> */}
            <Form.Control
              className="input-field"
              required
              type="text"
              placeholder="نام کاربری"
              disabled
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            {/* <Form.Label>ایمیل</Form.Label> */}
            <Form.Control
              className="input-field"
              type="email"
              placeholder="ایمیل"
              required
              pattern="[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9"
              disabled
            />
            {/* <Form.Control.Feedback type="invalid">
              ایمیل معتبر نیست.
            </Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group as={Col} md="4">
            {/* <Form.Label>شماره تلفن</Form.Label> */}
            <InputGroup hasValidation>
              <Form.Control
                className="input-field"
                type="text"
                placeholder="شماره تلفن"
                required
                pattern="^09[0-9]{9}$"
                disabled
              />
              {/* <Form.Control.Feedback type="invalid">
                شماره تلفن معتبر نیست.
              </Form.Control.Feedback> */}
            </InputGroup>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};

export default AdminInfoBox;
