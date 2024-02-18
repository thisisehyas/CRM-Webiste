import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/signin.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import "../styles/font.css";

const SignIn = () => {
  const [error, setError] = useState(null);
  const history = useHistory();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegistration = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    if (jsonData.password !== confirmPassword) {
      setError("رمز عبور و تکرار آن باید یکسان باشند.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Registration successful: ", responseData);
        setError("");

        setTimeout(() => {
          history.push({
            pathname: "/Login",
            state: { preFilledUsername: jsonData.username },
          });
        }, 2000);
      } else {
        const errorData = await response.json();
        console.log("ثبت نام ناموفق: ", response.statusText, errorData);

        const errorMessages = Object.values(errorData)
          .flat()
          .map((error) => error);

        setError(`ثبت‌نام ناموفق: ${errorMessages.join(" ")}`);
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      // setError(`Error during registration: ${errorData}`);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <Container
      className="mt-5 mb-2 p-0 d-flex align-items-center justify-content-center flex-column"
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
        onSubmit={handleRegistration}
      >
        <Row>
          <Col md={6} className="mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="text"
              placeholder="نام "
              name="first_name"
            />
          </Col>
          <Col md={6} className="costume-col mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="text"
              placeholder="نام خانوادگی"
              name="last_name"
            />
          </Col>
        </Row>

        <Row>
          <Col md={6} className="costume-col mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="text"
              placeholder="نام کاربری"
              pattern="^[a-zA-Z0-9_\-]{3,}$"
              name="username"
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
            />
          </Col>
          <Col md={6} className="costume-col mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="password"
              placeholder="تکرار رمز عبور"
              onChange={handleConfirmPasswordChange}
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
      {error && (
        <div
          style={{ textAlign: "right", direction: "rtl" }}
          className="alert alert-danger m-3 change-font"
          role="alert"
        >
          {error}
        </div>
      )}
      {error == "" && (
        <div
          style={{ textAlign: "right", direction: "rtl" }}
          className="alert alert-success m-3 change-font"
          role="alert"
        >
          ثبت نام با موفقیت انجام شد. در حال انتقال به صفحه ورود...
        </div>
      )}
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

//wanted to prefill the username field when redirecting ot login
//page from register.
