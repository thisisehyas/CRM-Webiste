import React from "react";
import Header from "../../Header.jsx";
import Badge from "react-bootstrap/esm/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/badge.css";
import Container from "react-bootstrap/esm/Container";
import ProductsCols from "../../../components/ProductsCols.jsx";
import AdminCategoryCards from "../AdminCategoryCards.jsx";

const AdminProducts = () => {
  return (
    <>
      <Header title="محصولات" />
      <Container className="text-center">
        <Badge className="mx-auto text-center myBadge">دسته‌بندی‌ها </Badge>
      </Container>
      <AdminCategoryCards />
      <ProductsCols badgeName="همه‌ی محصولات" containName="true" />
    </>
  );
};

export default AdminProducts;
