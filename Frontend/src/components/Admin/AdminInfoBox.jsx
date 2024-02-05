import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../../styles/fontSize.css";
import { getAccessToken } from "../../components/authUtils";
import { useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminInfoBox = () => {
  const [adminInfo, setAdminInfo] = useState({
    id: 0,
    username: "",
    email: "",
    first_name: "ادمین",
    last_name: "ادمین",
  });

  useEffect(() => {
    // Fetch admin information when the component mounts
    fetchAdminInfo();
  }, []);

  const fetchAdminInfo = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/users/me/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${getAccessToken()}`,
        },
      });

      console.log("Admin info:" + adminInfo);

      if (!response.ok) {
        console.error("Failed to fetch admin info");
        throw new Error("Failed to fetch admin info");
      }

      const adminData = await response.json();
      console.log("Fetched admin info successfully:", adminData);
      setAdminInfo(adminData);
    } catch (error) {
      console.error("Error fetching admin info:", error.message);
    }
  };
  return (
    <Container
      style={{
        backgroundColor: "#D9D9D9",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
      className="p-4 mt-3 change-font"
    >
      <Form style={{ textAlign: "right", direction: "rtl" }}>
        <h6 className="text-center mb-5"> اطلاعات ادمین</h6>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label className="mt-2">نام</Form.Label>
            <Form.Control
              className="input-field"
              required
              type="text"
              disabled
              value={"ادمین"}
            />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label className="mt-2"> نام‌خانوادگی</Form.Label>
            <Form.Control
              className="input-field"
              required
              type="text"
              disabled
              value={"ادمین"}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label className="mt-2">نام کاربری</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                className="input-field"
                type="text"
                required
                disabled
                value={adminInfo.username}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label className="mt-2">ایمیل</Form.Label>
            <Form.Control
              className="input-field"
              type="email"
              required
              pattern="[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9"
              disabled
              value={adminInfo.email}
            />
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};

export default AdminInfoBox;

// the admin can not have a name when you create it with superuser
