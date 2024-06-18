import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/signup.css";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../styles/font.css";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getAccessToken, setAccessToken } from "../components/authUtils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [countdown, setCountdown] = useState(60);
  const [showVerification, setShowVerification] = useState(false);
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
  });
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (countdown > 0 && showVerification) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown, showVerification]);

  const handleResendCode = () => {
    axios
      .post("http://localhost:8080/iam/iam/resend-verification-code/", {
        phone_number: formData.phone_number,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Verification code resent successfully");
          setCountdown(60);
        }
      })
      .catch((error) => {
        console.error("Error resending verification code:", error);
        if (error.response && error.response.status === 404) {
          console.log("Error: Not Found");
          console.log("Response body:", error.response.data);
        }
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleVerificationCodeChange = (event) => {
    const code = event.target.value;
    setVerificationCode(code);
    setIsCodeEntered(code.trim() !== "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/iam/iam/signup/",
        formData
      );
      if (response.status === 201) {
        setShowVerification(true);
        startCountdown();
        setSignupSuccess(true);
        setTimeout(() => setSignupSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setSignupError("خطا در ثبت نام!"); // Set error message
      setTimeout(() => setSignupError(""), 3000);
    }
  };

  const handleVerificationSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/iam/iam/verify-code/",
        {
          phone_number: formData.phone_number,
          code: verificationCode,
        }
      );
      if (response.status === 200) {
        console.log("verification code valid");
        setVerificationSuccess(true);
        setIsCodeEntered(true);
        setAccessToken(response.data.access_token);
        console.log("access token:", getAccessToken());
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Invalid verificatoin code");
        setVerificationError(true);
      } else {
        console.log("Error verifying code: ", error);
      }
    }
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(interval);
        }
        return prevCount - 1;
      });
    }, 1000);
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
        <Row>
          <Col md={6} className="mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="text"
              placeholder="نام "
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </Col>
          <Col md={6} className="costume-col mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="text"
              placeholder="نام خانوادگی"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row>
          <Col md={6} className="costume-col mb-1 mt-5">
            <Form.Control
              className="change-font form-control"
              required
              type="text"
              placeholder="شماره تلفن"
              pattern="^09\d{9}$|^(\+98|0)9\d{9}$"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </Col>
          <Col md={6} className="mb-1 mt-5">
            <div className="password-input">
              <Form.Control
                className="change-font form-control"
                required
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور"
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
          </Col>
        </Row>

        {signupError && (
          <Alert variant="danger" className="mt-4 text-center change-font">
            {signupError}
          </Alert>
        )}
        {signupSuccess && (
          <Alert variant="success" className="mt-4 text-center change-font">
            حساب شما با موفقیت ایجاد شد.
          </Alert>
        )}

        {showVerification ? (
          <div>
            <Row>
              <Col md={12} className="mb-1 mt-5">
                <Form.Control
                  className="change-font form-control"
                  required
                  type="text"
                  placeholder="کد تایید را وارد کنید."
                  name="verification_code"
                  value={verificationCode}
                  onChange={handleVerificationCodeChange}
                />
              </Col>
            </Row>

            {countdown > 0 && !verificationSuccess && (
              <p className="change-font text-muted">
                {countdown} ثانیه باقی مانده
              </p>
            )}
            {!verificationSuccess && countdown <= 0 && (
              <Button
                variant="link"
                className="change-font text-muted not-link-button"
                onClick={handleResendCode}
              >
                ارسال مجدد کد تایید
              </Button>
            )}

            {verificationSuccess || verificationError ? (
              <Alert
                variant={verificationSuccess ? "success" : "danger"}
                className="mt-4 text-center change-font"
              >
                {verificationSuccess
                  ? "حساب شما با موفقیت تایید شد."
                  : "کد تایید اشتباه است."}
              </Alert>
            ) : null}
            <Button
              type="submit"
              className="mt-4 change-font login-button mx-auto d-block"
              disabled={!isCodeEntered || verificationSuccess}
              onClick={handleVerificationSubmit}
            >
              تاييد
            </Button>
          </div>
        ) : (
          <Button
            type="submit"
            className="mt-4 change-font login-button mx-auto d-block"
          >
            ثبت نام
          </Button>
        )}
      </Form>

      <Form.Text
        style={{ textAlign: "right", direction: "rtl" }}
        className="mb-3 text-muted form-text"
      >
        قبلاً ثبت نام کرده‌اید؟<Link to="/login"> وارد شوید.</Link>
      </Form.Text>
    </Container>
  );
};

export default Signup;

// - improve the style of the verification code field
// - improve the appearing of the code field for
//   example use animation and transition to make
//   it appear softly and move the sign up button
//   slowley down.
