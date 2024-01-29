import React from "react";
import Carousel1 from "../components/Carousel.jsx";
import Card1 from "../components/CategoryCards.jsx";
import ProductsCols from "../components/ProductsCols.jsx";

const Home = () => {
  return (
    <>
      <Carousel1 />
      <Card1 />
      <ProductsCols badgeName=" محصولات" />
    </>
  );
};

export default Home;
