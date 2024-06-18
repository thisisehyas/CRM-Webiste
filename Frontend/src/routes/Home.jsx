import React, { useState, useEffect } from "react";
import MyCarousel from "../components/MyCarousel.jsx";
import Card1 from "../components/CategoryCards.jsx";
import ProductsCols from "../components/ProductsCols.jsx";
import "../styles/font.css";

const Home = () => {
  const [imagesData, setImagesData] = useState([]);

  useEffect(() => {
    const savedImagesData = JSON.parse(localStorage.getItem("imagesData"));
    if (savedImagesData) {
      setImagesData(savedImagesData);
    }
  }, []);

  return (
    <>
      <MyCarousel images={imagesData.map((data) => data.url)} />
      <Card1 />
      <ProductsCols badgeName=" محصولات" />
    </>
  );
};

export default Home;
