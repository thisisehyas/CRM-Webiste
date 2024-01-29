import React from "react";
import Header from "../components/Header.jsx";
import CategoryCards from "../components/CategoryCards.jsx";
import Badge from "react-bootstrap/esm/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/badge.css";
import Container from "react-bootstrap/esm/Container";
import ProductsCols from "../components/ProductsCols";

const Products = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <Header title="محصولات" />
      <Container className="text-center">
        <Badge className="mx-auto text-center myBadge">دسته‌بندی‌ها </Badge>
      </Container>
      <CategoryCards />
      <ProductsCols badgeName="همه‌ی محصولات" containName="true"/>
    </div>
  );
};

export default Products;
