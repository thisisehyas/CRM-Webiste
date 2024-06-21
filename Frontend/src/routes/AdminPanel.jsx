import React, { useEffect, useState } from "react";
import AdminInfoBox from "../components/Admin/AdminInfoBox";
import RoutesList from "../components/Admin/RoutesList";
import { Row, Col, Navbar, Container } from "react-bootstrap";
import CostumerMessage from "../components/CostumerMessage";
import UsersList from "../components/UsersList";
import OrderSubmitBox from "../components/Admin/OrderSubmitBox";
import OrderList from "../components/Admin/OrderList";
import axios from "axios";
import { getAccessToken } from "../components/authUtils";
import ErrorPage from "../components/ErrorPage";
import "../styles/font.css";

const AdminPanel = () => {
  const [isStaff, setIsStaff] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const token = getAccessToken();

        const response = await axios.get(
          `http://localhost:8080/iam/iam/user/me/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data.is_staff) {
          setIsStaff(true);
        } else {
          setIsStaff(false);
          setError("شما دسترسی لازم برای مشاهده این صفحه را ندارید.");
        }
      } catch (err) {
        setIsStaff(false);
        setError(
          "خطایی در بررسی وضعیت کاربر رخ داده است. لطفاً دوباره تلاش کنید."
        );
      }
    };

    fetchUserStatus();
  }, []);

  if (isStaff === null) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!isStaff) {
    return <ErrorPage message={error} />;
  }

  return (
    <div style={{ overflowX: "hidden", height: "100%", margin: "0" }}>
      <Row>
        <Navbar
          expand="lg"
          style={{ boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.1)" }}
          className="bg-body-tertiary"
        >
          <Container fluid>
            <Navbar.Brand className="navbar-brand mx-auto">
              <img
                className="logo"
                src="../images/logo-navbar.png"
                alt="لوگوی شرکت"
                style={{ width: "98px", height: "100px" }}
              />
            </Navbar.Brand>
          </Container>
        </Navbar>
      </Row>
      <Row
        style={{
          background:
            "linear-gradient(to right, rgba(153, 153, 153, 0.1), rgba(153, 153, 153, 0.17))",
        }}
        className="mx-auto"
      >
        <Col md={6} xs={12}>
          <AdminInfoBox />
          <CostumerMessage />
          <UsersList />
          {/* <OrderList /> */}
        </Col>

        <Col md={6} xs={12} className="">
          <RoutesList />
          {/* <OrderSubmitBox /> */}
        </Col>
      </Row>
    </div>
  );
};

export default AdminPanel;
