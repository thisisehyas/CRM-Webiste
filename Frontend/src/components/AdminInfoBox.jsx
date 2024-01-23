import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../styles/fontSize.css";

const AdminInfoBox = () => {
  return (
    <Container
      style={{
        backgroundColor: "#D9D9D9",
        borderRadius: "10px",
      }}
      className="p-5 mt-3 change-font"
    >
      <Form style={{ textAlign: "right", direction: "rtl" }}>
        <h6 className="text-center mb-5"> اطلاعات ادمین</h6>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>نام کاربری</Form.Label>
            <Form.Control
              className="input-field"
              required
              type="text"
              disabled
            />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>نام و نام‌خانوادگی</Form.Label>
            <Form.Control
              className="input-field"
              required
              type="text"
              disabled
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>ایمیل</Form.Label>
            <Form.Control
              className="input-field"
              type="email"
              required
              pattern="[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9"
              disabled
            />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>شماره تلفن</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                className="input-field"
                type="text"
                required
                pattern="^09[0-9]{9}$"
                disabled
              />
            </InputGroup>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};

export default AdminInfoBox;
