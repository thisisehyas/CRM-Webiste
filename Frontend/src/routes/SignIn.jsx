import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/signin.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        Authorization:
          "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2OTM4Nzk0LCJpYXQiOjE3MDY0MjAzOTQsImp0aSI6IjhhNTg1ODNjOGY0MTRjOTk4MjlmNmZlZWU3MzJkM2Y0IiwidXNlcl9pZCI6NX0.jlxNM7rCnp2HZ4GUlvH9W0ja-m59zTC1tT1kqBrPG8Y",
        body: JSON.stringify(formData),
      });

      console.log("Request sent. Waiting for response...");

      const responseData = await response.json();

      console.log("Response received:", response);

      if (response.ok) {
        console.log("User successfully registered:", responseData);

        // You may want to redirect the user or perform other actions upon successful registration
      } else {
        console.error("Error registering user:", response.statusText);
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container
      className="mt-3 mb-2 p-0 d-flex align-items-center justify-content-center flex-column"
      style={{
        width: "100%",
        minHeight: "80vh",
        border: "1px solid #D6D5D5",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <Image
        className="mt-2"
        style={{ width: "125px" }}
        src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/109/251/original/0c34607cbf3244f9969b4a57cdcebdc9_1.png?1704396541"
        alt="لوگوی شرکت"
      ></Image>
      {/* <hr
        style={{
          width: "100%",
          borderTop: "3px solid #D6D5D5",
          position: "absolute",
          top: "30%",
          transform: "translateY(-50%)",
        }}
      /> */}
      <Form
        style={{
          direction: "rtl",
          textAlign: "right",
          maxWidth: "130%",
          width: "70%",
          margin: "auto",
          position: "relative",
          zIndex: 1,
        }}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col md={6} className="mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="text"
              placeholder="نام "
              name="first_name" // Updated name attribute
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} className="costume-col mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="text"
              placeholder="نام خانوادگی"
              name="last_name" // Updated name attribute
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </Col>
        </Row>

        <Row>
          {/* <Col md={6} className="mb-4 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="text"
              placeholder="شماره تلفن همراه"
              pattern="^09\d{9}$"
            />
          </Col> */}
          <Col md={6} className="costume-col mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="text"
              placeholder="نام کاربری"
              pattern="^[a-zA-Z0-9_\-]{3,}$"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} className=" costume-col mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="email"
              placeholder="ایمیل"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              ایمیل معتبر نیست.
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="password"
              placeholder="رمز عبور"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} className="costume-col mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="password"
              placeholder="تکرار رمز عبور"
              // name="confirmPassword" // You may want to add a confirmPassword field
              // value={formData.confirmPassword}
              // onChange={handleInputChange}
            />
          </Col>
        </Row>

        <Button
          type="submit"
          className="mt-4 change-font login-button mx-auto d-block"
        >
          ثبت نام
        </Button>
      </Form>
      <Form.Text
        style={{ textAlign: "right", direction: "rtl" }}
        className="mb-3 text-muted form-text"
      >
        قبلاً ثبت نام کرده‌اید؟<Link to="/Login"> وارد شوید.</Link>
      </Form.Text>
    </Container>
  );
};

export default SignIn;

//  - in smaller screens i want it to have more margin from the right and left of the page
//  - and the input fields to have less margin from each other
//  - icons in the input fileds.
//  - user friendly error messages for invalid input
//  - the password input fileds should match each other

//confirm password functionality
//showing the errors from the backend
