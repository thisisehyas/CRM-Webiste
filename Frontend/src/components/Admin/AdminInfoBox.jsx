import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { getAccessToken } from "../../components/authUtils";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminInfoBox = () => {
  const [adminInfo, setAdminInfo] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  useEffect(() => {
    fetchAdminInfo();
  }, []);

  const fetchAdminInfo = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/iam/iam/user/me/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch admin info");
        throw new Error("Failed to fetch admin info");
      }

      const adminData = await response.json();
      console.log("Fetched admin info successfully:", adminData);
      setAdminInfo(adminData);
      console.log(adminData.email);
    } catch (error) {
      console.error("Error fetching admin info:", error.message);
    }
  };

  return (
    <Container
      style={{
        backgroundColor: "#92C7CF",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
      className="p-4 mt-3"
    >
      <Form style={{ textAlign: "right", direction: "rtl" }}>
        <h6 className="text-center mb-5"> اطلاعات ادمین</h6>

        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label className="mt-2">نام کاربری</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                className="input-field"
                type="text"
                required
                disabled
                value={`${adminInfo.first_name} ${adminInfo.last_name}`}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label className="mt-2">شماره تلفن</Form.Label>
            <Form.Control
              className="input-field"
              type="text"
              required
              disabled
              value={adminInfo.phone_number}
            />
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};

export default AdminInfoBox;
