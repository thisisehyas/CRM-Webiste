// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Container from "react-bootstrap/Container";
// import Badge from "react-bootstrap/Badge";
// import Card from "react-bootstrap/Card";
// import "../styles/badge.css";
// import Spinner from "react-bootstrap/Spinner";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const ProductsCols = (props) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hasMoreData, setHasMoreData] = useState(true);

//   const fetchMoreData = () => {
//     // Replace this URL with the actual API endpoint
//     const apiUrl = `http://127.0.0.1:8000/machine/?_start=${products.length}&_limit=6`;

//     console.log("Fetching more data...");

//     axios
//       .get(apiUrl)
//       .then((response) => {
//         console.log("Response from the API:", response);
//         setProducts([...products, ...response.data.results]);
//         setLoading(false);

//         // Check if there is a next page
//         if (response.data.next) {
//           setHasMoreData(true);
//         } else {
//           setHasMoreData(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching more products:", error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     console.log("Fetching initial set of products...");
//     fetchMoreData();
//   }, []); // Empty dependency array ensures this runs only once on component mount

//   return (
//     <>
//       <Container className="text-center">
//         <Badge className="mx-auto text-center myBadge">{props.badgeName}</Badge>
//       </Container>
//       <Container>
//         <div className="row">
//           {products.map((product) => (
//             <Link
//               as="div"
//               to={`/product/${product.id}`}
//               key={product.id}
//               className="col-6 col-md-4 mb-5 mt-5"
//               style={{ textDecoration: "none", color: "#000" }}
//             >
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
//                     src={product.picture}
//                     alt={product.title}
//                   />
//                 </div>
//               </Card>

//               {props.containName ? (
//                 <span
//                   style={{
//                     display: "block",
//                     textAlign: "center",
//                     margin: "auto",
//                   }}
//                 >
//                   {product.title}
//                 </span>
//               ) : (
//                 ""
//               )}
//             </Link>
//           ))}
//         </div>
//         {loading && (
//           <div className="text-center mt-5">
//             <Spinner animation="grow" variant="success" size="lg" />
//             <p className="mt-2">Loading...</p>
//           </div>
//         )}
//       </Container>
//     </>
//   );
// };

// export default ProductsCols;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import "../styles/badge.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsCols = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchMoreData = () => {
    // Replace this URL with the actual API endpoint
    const apiUrl = `http://127.0.0.1:8000/machine/?_start=${products.length}&_limit=6`;

    console.log("Fetching more data...");

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Response from the API:", response);
        setProducts([...products, ...response.data.results]);
        setLoading(false);

        // Check if there is a next page
        if (response.data.next) {
          setHasMoreData(true);
        } else {
          setHasMoreData(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching more products:", error);
        setLoading(false);
      });
  };

  const fetchAllProducts = async () => {
    const apiUrl = `http://127.0.0.1:8000/machine/`;
    const allProducts = [];

    console.log("Fetching all products...");

    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        allProducts.push(...response.data.results);

        if (response.data.next) {
          // If there is a next page, recursively fetch the next page
          await fetchData(response.data.next);
        } else {
          // All pages fetched, update the state
          setProducts(allProducts);
          setLoading(false);
          setHasMoreData(false);
        }
      } catch (error) {
        console.error("Error fetching all products:", error);
        setLoading(false);
      }
    };

    await fetchData(apiUrl);
  };

  useEffect(() => {
    console.log("Fetching initial set of products...");
    fetchAllProducts();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <>
      <Container className="text-center">
        <Badge className="mx-auto text-center myBadge">{props.badgeName}</Badge>
      </Container>
      <Container>
        <div className="row">
          {products.map((product) => (
            <Link
              as="div"
              to={`/product/${product.id}`}
              key={product.id}
              className="col-6 col-md-4 mb-5 mt-5"
              style={{ textDecoration: "none", color: "#000" }}
            >
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
                    src={product.picture}
                    alt={product.title}
                  />
                </div>
              </Card>

              {props.containName ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  {product.title}
                </span>
              ) : (
                ""
              )}
            </Link>
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
