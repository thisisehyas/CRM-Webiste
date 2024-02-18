import Container from "react-bootstrap/esm/Container";
import Header from "../components/Header.jsx";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/fontSize.css";
import { getAccessToken } from "../components/authUtils.jsx";
import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import "../styles/font.css";

const Contact = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    // If success message is set, schedule its removal after 3 seconds
    if (successMessage) {
      const timeoutId = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [successMessage]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/auth/users/me/", {
          method: "GET",
          headers: {
            Authorization: `JWT ${getAccessToken()}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok (Status: ${response.status})`
          );
        }

        const userData = await response.json();
        // Set user info to the form data
        setFormData({
          full_name: `${userData.first_name} ${userData.last_name}`,
          email: userData.email,
          subject: "",
          message: "",
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
        // Handle error if needed
      }
    };

    // Call the fetchUserInfo function
    fetchUserInfo();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setIsButtonDisabled(true);

    const requestBody = {
      status: "U",
      ...formData,
    };
    fetch("http://127.0.0.1:8000/message/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok (Status: ${response.status})`
          );
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage("پیام شما با موفقیت ارسال شد!");
        console.log("Message sent successfully:", data);
        // Optionally, you can handle success feedback to the user
        setIsFormSubmitted(true);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setErrorMessage("پیام شما ارسال نشد. لطفاً دوباره امتحان کنید.");
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setIsButtonDisabled(false);
    setIsFormSubmitted(false);
  };
  return (
    <div>
      <Header title="تماس‌ با‌ ما" />
      <Container className="mt-4 change-font">
        <Row>
          <Col sm={12} md={6}>
            <Form
              style={{
                direction: "rtl",
                textAlign: "right",
                borderRadius: "8px",
                backgroundColor: "#F3F3F3",
                padding: "5%",
              }}
              onSubmit={handleFormSubmit}
            >
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label> نام و نام خانوادگی</Form.Label>
                <Form.Control
                  className="change-font"
                  required
                  type="text"
                  placeholder="نام و نام خانوادگی خود را وارد کنید."
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  disabled
                />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="form»LastName">
                <Form.Label>نام خانوادگی</Form.Label>
                <Form.Control
                  className="change-font"
                  required
                  type="text"
                  placeholder="نام خانوداگی خود را وارد کنید."
                />
              </Form.Group> */}

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>آدرس ایمیل</Form.Label>
                <Form.Control
                  className="change-font"
                  required
                  type="email"
                  placeholder="ایمیل خود را وارد کنید."
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>شماره تلفن همراه</Form.Label>
                <Form.Control
                  className="change-font"
                  required
                  type="text"
                  placeholder="شماره تلفن خود را وارد کنید."
                  pattern="^09[0-9]{9}$"
                />
              </Form.Group> */}

              <Form.Group className="mb-3" controlId="messageTitle">
                <Form.Label>موضوع</Form.Label>
                <Form.Control
                  className="change-font"
                  required
                  type="text"
                  placeholder="موضوع پیام را وارد کنید."
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="messageBody">
                <Form.Label>پیام</Form.Label>
                <Form.Control
                  className="change-font"
                  required
                  type="text"
                  as="textarea"
                  rows={5}
                  placeholder="متن پیام را وارد کنید."
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button
                disabled={
                  isButtonDisabled || (isFormSubmitted && !isButtonDisabled)
                }
                variant="success"
                type="submit"
                className="change-font"
              >
                ارسال
              </Button>
            </Form>
            {successMessage && (
              <Alert
                variant="success"
                style={{ textAlign: "right", direction: "rtl" }}
                className="mb-3 mt-1"
              >
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert
                variant="danger"
                style={{ textAlign: "right", direction: "rtl" }}
                className="mb-3 mt-1"
              >
                {errorMessage}
              </Alert>
            )}
          </Col>
          <Col sm={12} md={6} className="mt-2">
            <p style={{ direction: "rtl", textAlign: "right" }}>
              شما می‌توانید با تکمیل فرم، پیام خود را به صورت آنلاین برای ما
              ارسال کنید یا از طریق راه‌های ارتباطی نوشته شده، با ما تماس
              بگیرید.
              <br />
              <br />
              شماره تلفن : 09112113045
              <br />
              <br />
              پست الکترونیک : khoshesanat@gmail.com
              <br />
              <br />
              آدرس :بابلسر - میدان امام حسین - شهرک صنعتی بابلسر - واحدG8 و G8-1
              <br />
              <br />
              ساعت کاری : از ساعت 07:30 تا 17:00
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;

// THINGS TO FIX:
//  - Validation check on the form inputs can go further.
//  - Shouldn't the font size be smaller in footer and nav too?
//    Check it on mobile to see.

// the button should be disabled when the user submits the form
// and stay disabled until the user changes something in the input
