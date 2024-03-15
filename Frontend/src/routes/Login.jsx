import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/esm/Container";
import "../styles/font.css";
import "../styles/fontSize.css";
import "../styles/login.css";
import { Alert } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getAccessToken, setAccessToken } from "../components/authUtils";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/iam/login/",
        formData
      );
      if (response.status === 200) {
        setSuccessMessage("ورود با موفقیت انجام شد.");
        setError("");
        console.log("successful enter.");
        setAccessToken(response.data.access);
        console.log("access token: ", getAccessToken());
      } else {
        setError("خطا در ورود. لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("شماره تلفن یا رمز عبور نادرست است.");
      } else {
        setError("خطا در ورود. لطفاً دوباره تلاش کنید.");
      }
    }
  };

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
          top: "38%",
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
            placeholder="شماره تلفن خود را وارد کنید."
            pattern="^09\d{9}$|^(\+98|0)9\d{9}$"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <div className="password-input">
            <Form.Control
              className="change-font form-control"
              type={showPassword ? "text" : "password"}
              required
              placeholder="رمز عبور خود را وارد کنید."
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              variant="light"
              className="password-toggle-btn"
              onClick={togglePasswordVisibility}
              style={{ color: "gray" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
        </Form.Group>

        <Button
          type="submit"
          className="login-button mt-4 change-font mx-auto d-block"
          disabled={!!successMessage}
        >
          ورود
        </Button>
        {successMessage ? ( // Display success message if available
          <Alert variant="success" className="mt-4 text-center change-font">
            {successMessage}
          </Alert>
        ) : (
          error && ( // Display error message if available
            <Alert variant="danger" className="mt-4 text-center change-font">
              {error}
            </Alert>
          )
        )}
      </Form>
      <Form.Text
        style={{ textAlign: "right", direction: "rtl" }}
        className="mb-3 text-muted form-text"
      >
        حساب ندارید؟ <Link to="/signup">ثبت نام کنید.</Link>
      </Form.Text>
    </Container>
  );
};

export default Login;
