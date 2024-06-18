import React from "react";
import AdminCarousel from "../AdminCarousel.jsx";
import AdminCategoryCards from "../AdminCategoryCards.jsx";
import ProductsCols from "../../ProductsCols.jsx";

const Home = () => {
  return (
    <>
      <AdminCarousel />
      <AdminCategoryCards />
      <ProductsCols badgeName=" محصولات" />
    </>
  );
};

export default Home;
