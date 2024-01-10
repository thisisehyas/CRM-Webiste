// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Container from "react-bootstrap/Container";
// import Badge from "react-bootstrap/Badge";
// import Card from "react-bootstrap/Card";
// import "../styles/productsCols.css";

// const productsCols = () => {
//   return (
//     <>
//       <Container className="text-center">
//         <Badge
//           className="mx-auto text-center myBadge"
//           style={{
//             width: "auto",
//             fontSize: "100%",
//             marginTop: "4%",
//             padding: "15px",
//           }}
//         >
//           پربازدیدترین محصولات
//         </Badge>
//       </Container>
//       <Container>
//         <div className="row">
//           {[1, 2, 3, 4, 5, 6].map((index) => (
//             <div key={index} className="col-6 col-md-4 mb-3 mt-5">
//               <Card
//                 style={{
//                   backgroundColor: "#D9D9D9",
//                   border: "none",
//                   width: "60%",
//                   height: "140%",
//                   margin: "auto",
//                 }}
//               >
//                 <div
//                   className="d-flex flex-column align-items-center justify-content-center"
//                   style={{ height: "100%" }}
//                 >
//                   <Card.Img
//                     className="cardImage"
//                     variant="top"
//                     src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/854/original/Bag_alt.png?1704112854"
//                   />
//                 </div>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </Container>
//     </>
//   );
// };

// export default productsCols;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import "../styles/productsCols.css";
import Spinner from "react-bootstrap/Spinner";

const ProductsCols = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMoreData = () => {
    // Replace this URL with the actual API endpoint
    const apiUrl = `https://jsonplaceholder.typicode.com/photos?_start=${products.length}&_limit=6`;

    // Fetch more products from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response contains an array of products
        setProducts([...products, ...data]); // Append new data to existing products
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching more products:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch initial set of products
    fetchMoreData();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleScroll = () => {
    // Check if user has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLoading(true);
      fetchMoreData();
    }
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: Remove scroll event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [products]); // Reattach event listener when products state changes

  return (
    <>
      <Container className="text-center">
        <Badge
          className="mx-auto text-center myBadge"
          style={{
            width: "auto",
            fontSize: "100%",
            marginTop: "4%",
            padding: "15px",
          }}
        >
          پربازدیدترین محصولات
        </Badge>
      </Container>
      <Container>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-6 col-md-4 mb-3 mt-5">
              <Card
                style={{
                  backgroundColor: "#D9D9D9",
                  border: "none",
                  width: "60%",
                  height: "140%",
                  margin: "auto",
                }}
              >
                <div
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{ height: "100%" }}
                >
                  <Card.Img
                    className="cardImage"
                    variant="top"
                    src={product.thumbnailUrl}
                    alt={product.title}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
        {loading && (
          <div className="text-center mt-5">
            <Spinner animation="grow" variant="success" size="lg" />
            <p className="mt-2">Loading...</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default ProductsCols;

//  - The products then should be links that go to the related product's page.
//    /products/:id
