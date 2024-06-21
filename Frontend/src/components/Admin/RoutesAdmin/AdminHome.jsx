// import React from "react";
// import AdminCarousel from "../AdminCarousel.jsx";
// import AdminCategoryCards from "../AdminCategoryCards.jsx";
// import ProductsCols from "../../ProductsCols.jsx";

// const Home = () => {
//   return (
//     <>
//       <AdminCarousel />
//       <AdminCategoryCards />
//       <ProductsCols badgeName=" محصولات" />
//     </>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import AdminCarousel from "../AdminCarousel.jsx";
import AdminCategoryCards from "../AdminCategoryCards.jsx";
import ProductsCols from "../../ProductsCols.jsx";
import ErrorPage from "../../ErrorPage";
import axios from "axios";
import { getAccessToken } from "../../authUtils"; 

const Home = () => {
  const [isStaff, setIsStaff] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is staff
    checkIsStaff();
  }, []);

  const checkIsStaff = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/iam/iam/user/me/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
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

  if (isStaff === null) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!isStaff) {
    return <ErrorPage message={error} />;
  }

  return (
    <>
      <AdminCarousel />
      <AdminCategoryCards />
      <ProductsCols badgeName=" محصولات" />
    </>
  );
};

export default Home;
