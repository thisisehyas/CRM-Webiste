import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import MiddleEach from "../components/MiddleEach.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

const EachProduct = (props) => {

  const [productData, setProductData] = useState(null);
  const { id } = useParams(); // Getting the category ID from URL params

  useEffect(() => {
    // Fetch category data based on the ID when the component mounts or the ID changes
    fetchProductData(id);
  }, [id]);

  const fetchProductData = async (productId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/machine/${productId}/`
      );
      if (!response.data) {
        throw new Error("Failed to fetch product data");
      }
      setProductData(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    console.log("Product data:", productData);
  }, [productData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {productData ? (
        <>
          <Header title={productData.title} svg="1" />
          <MiddleEach
            description={productData.description}
            picture={productData.picture}
          />
        </>
      ) : (
        <>
          <Header title=".محصول موجود نیست" svg="1" />
          <MiddleEach />
        </>
      )}
    </div>
  );
};

export default EachProduct;
