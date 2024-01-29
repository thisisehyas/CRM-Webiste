import Header from "../../Header.jsx";
import CategoryMiddle from "../../CategoryMiddle.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminProductCols from "../AdminProductCols.jsx";

const Category = () => {
  const [categoryData, setCategoryData] = useState(null);
  const { id } = useParams(); // Getting the category ID from URL params

  useEffect(() => {
    // Fetch category data based on the ID when the component mounts or the ID changes
    fetchCategoryData(id);
  }, [id]);

  const fetchCategoryData = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/category/${categoryId}/`
      );
      if (!response.data) {
        throw new Error("Failed to fetch category data");
      }
      setCategoryData(response.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  return (
    <>
      {categoryData && (
        <>
          <Header title={categoryData.title} svg="1" />
          {/* <CategoryMiddle /> */}
          <AdminProductCols
            badgeName="محصولات"
            containName="true"
            categoryId={categoryData.id}
          />
        </>
      )}
    </>
  );
};

export default Category;

// categoryMiddle is not complete
