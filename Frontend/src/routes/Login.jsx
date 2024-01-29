import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/fontSize.css";
import { Link } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../components/authUtils.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectToUserPanel, setRedirectToUserPanel] = useState(false);

  const fetchUserInfo = async (accessToken) => {
    try {
      const userResponse = await axios.get(
        "http://127.0.0.1:8000/auth/users/me/",
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );

      return userResponse.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error; // Propagate the error for the caller to handle
    }
  };

  useEffect(() => {
    const checkRedirect = async () => {
      if (getAccessToken()) {
        try {
          const user = await fetchUserInfo(getAccessToken());

          if (user.is_staff) {
            // Admin user, redirect to user panel
            setRedirectToUserPanel(true);
          } else {
            // Normal user, redirect to home
            setRedirectToHome(true);
          }
        } catch (error) {
          console.error("Error checking user info:", error);
        }
      }
    };

    checkRedirect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted. Making a request to the backend...");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/jwt/create/",
        {
          username: username,
          password: password,
        }
      );

      console.log("Login successful. Response:", response.data);

      const accessToken = response.data.access;
      setAccessToken(accessToken);

      const user = await fetchUserInfo(accessToken);

      if (user.is_staff) {
        setRedirectToUserPanel(true);
      } else {
        setRedirectToHome(true);
      }

      console.log("User info:", user);
    } catch (error) {
      console.error("Login failed:", error);

      if (error.response && error.response.data && error.response.data.detail) {
        console.error("Error message:", error.response.data.detail);
        setErrorMessage(error.response.data.detail);
      }
    }
  };

  if (getAccessToken() && redirectToHome) {
    return <Redirect to="/" />;
  }

  if (getAccessToken() && redirectToUserPanel) {
    return <Redirect to="/adminpanel" />;
  }
  console.log("Login component mounted.");

  return (
    <Container
      className="mt-5 mb-5 p-0 d-flex align-items-center justify-content-center flex-column"
      style={{
        width: "50%",
        minHeight: "80vh",
        border: "1px solid #D6D5D5",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <Image
        className="mt-4"
        style={{ width: "125px" }}
        src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/109/251/original/0c34607cbf3244f9969b4a57cdcebdc9_1.png?1704396541"
        alt="لوگوی شرکت"
      ></Image>
      <hr
        style={{
          width: "100%",
          borderTop: "3px solid #D6D5D5",
          position: "absolute",
          top: "40%",
          transform: "translateY(-50%)",
        }}
      />
      <Form
        onSubmit={handleSubmit}
        style={{
          direction: "rtl",
          textAlign: "right",
          maxWidth: "130%",
          width: "70%",
          margin: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Form.Group className="mb-4 mt-5" controlId="username">
          <Form.Control
            className="change-font form-control"
            required
            type="text"
            placeholder="نام کاربری خود را وارد کنید."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form className="lable"></Form>
          <Form.Control
            className="change-font form-control"
            type="password"
            required
            placeholder="رمز عبور خود را وارد کنید."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Form.Text className="text-center text-muted form-text d-block">
            رمز عبور خود را فراموش کرده‌اید؟ <Link to="">کلیک کنید.</Link>
          </Form.Text> */}
        </Form.Group>

        <Button
          type="submit"
          className="mt-4 change-font login-button mx-auto d-block"
        >
          ورود
        </Button>
      </Form>
      <Form.Text
        style={{ textAlign: "right", direction: "rtl" }}
        className="mb-3 text-muted form-text"
      >
        حساب ندارید؟ <Link to="/SignIn">ثبت نام کنید.</Link>
      </Form.Text>
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {/* {errorMessage}
          <br /> */}
          <span className="text-center">.نام کاربری/رمز عبور نامعتبر است</span>
        </div>
      )}
    </Container>
  );
};

export default Login;

// THINGS TO FIX:
//  - The icons need to be in the input fileds.
//  - The pattern that needs to be checked for both of the inputs.
//  - in the moblie view it doesn't look that much good. the button
