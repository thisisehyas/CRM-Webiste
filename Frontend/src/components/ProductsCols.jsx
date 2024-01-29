
// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Container from "react-bootstrap/Container";
// import Badge from "react-bootstrap/Badge";
// import Card from "react-bootstrap/Card";
// import "../styles/badge.css";
// import Spinner from "react-bootstrap/Spinner";
// import axios from "axios";

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

//   const handleScroll = () => {
//     // Check if user has scrolled to the bottom
//     // Check if there is more data to fetch
//     if (
//       hasMoreData &&
//       window.innerHeight + document.documentElement.scrollTop ===
//         document.documentElement.offsetHeight
//     ) {
//       console.log("Reached the bottom of the page. Fetching more data...");
//       setLoading(true);
//       fetchMoreData();
//     }
//   };

//   useEffect(() => {
//     // Attach scroll event listener
//     window.addEventListener("scroll", handleScroll);

//     // Cleanup: Remove scroll event listener when component unmounts
//     return () => {
//       console.log("Cleanup: Removing scroll event listener");
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [products, hasMoreData]); // Reattach event listener when products state changes

//   return (
//     <>
//       <Container className="text-center">
//         <Badge className="mx-auto text-center myBadge">{props.badgeName}</Badge>
//       </Container>
//       <Container>
//         <div className="row">
//           {products.map((product) => (
//             <div key={product.id} className="col-6 col-md-4 mb-5 mt-5">
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
//             </div>
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

//  - The products then should be links that go to the related product's page.
//    /products/:id

// fetching is happening but you'll need to make the styles right
// the number of machines should be at least




import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import "../styles/badge.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

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

  useEffect(() => {
    console.log("Fetching initial set of products...");
    fetchMoreData();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <>
      <Container className="text-center">
        <Badge className="mx-auto text-center myBadge">{props.badgeName}</Badge>
      </Container>
      <Container>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-6 col-md-4 mb-5 mt-5">
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
