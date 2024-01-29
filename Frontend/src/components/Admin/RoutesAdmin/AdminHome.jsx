import React from "react";
import Carousel1 from "../../Carousel.jsx";
import AdminCategoryCards from "../AdminCategoryCards.jsx";
import ProductsCols from "../../ProductsCols.jsx";

const Home = () => {
  return (
    <>
      <Carousel1 />
      <AdminCategoryCards />
      <ProductsCols badgeName=" محصولات" />
    </>
  );
};

export default Home;
