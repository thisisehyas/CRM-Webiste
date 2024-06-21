// import React from "react";
// import Header from "../../Header.jsx";
// import Badge from "react-bootstrap/esm/Badge";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../../styles/badge.css";
// import Container from "react-bootstrap/esm/Container";
// import ProductsCols from "../../../components/ProductsCols.jsx";
// import AdminCategoryCards from "../AdminCategoryCards.jsx";

// const AdminProducts = () => {
//   return (
//     <>
//       <Header title="محصولات" />
//       <Container className="text-center">
//         <Badge className="mx-auto text-center myBadge">دسته‌بندی‌ها </Badge>
//       </Container>
//       <AdminCategoryCards />
//       <ProductsCols badgeName="همه‌ی محصولات" containName="true" />
//     </>
//   );
// };

// export default AdminProducts;
import React, { useState, useEffect } from "react";
import Header from "../../Header.jsx";
import Badge from "react-bootstrap/esm/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/badge.css";
import Container from "react-bootstrap/esm/Container";
import ProductsCols from "../../../components/ProductsCols.jsx";
import AdminCategoryCards from "../AdminCategoryCards.jsx";
import ErrorPage from "../../ErrorPage"; // Assuming you have this component
import axios from "axios";
import { getAccessToken } from "../../authUtils.jsx";

const AdminProducts = () => {
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
