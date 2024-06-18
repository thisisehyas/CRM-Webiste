import React from "react";
import MyCarousel from "../components/MyCarousel.jsx";
import Card1 from "../components/CategoryCards.jsx";
import ProductsCols from "../components/ProductsCols.jsx";
import "../styles/font.css";

const Home = () => {
  return (
    <>
      <MyCarousel />
      <Card1 />
      <ProductsCols badgeName=" محصولات" />
    </>
  );
};

export default Home;
