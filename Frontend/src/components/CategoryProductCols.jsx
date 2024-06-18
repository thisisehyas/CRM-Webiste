import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { Modal, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsFilter } from "react-icons/bs";

const ProductsCols = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1);

  // states for the search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [initialFetch, setInitialFetch] = useState(true);

  const fetchMoreProducts = () => {
    let apiUrl = `http://127.0.0.1:8080/core/machine/?page=${page}`;

    // Modify apiUrl if search term exists
    if (searchTerm.trim() !== "") {
      apiUrl = `http://127.0.0.1:8080/core/machine/?search=${searchTerm}&page=${page}`;
    }

    console.log(`Fetching more products for category ${props.categoryId}...`);

    console.log("API URL:", apiUrl);
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Response from the API:", response);

        // Filter products based on the category ID
        const newProducts = response.data.results.filter(
          (product) => product.category === props.categoryId
        );

        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setLoading(false);

        // Check if there is a next page
        if (response.data.next) {
          setPage(page + 1);
        } else {
          // No more pages, set hasMoreData to false
          setHasMoreData(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching more products:", error);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    setPage(1);
    setProducts([]);
    setLoading(true);
    setHasMoreData(true);
    setInitialFetch(true);

    fetchMoreProducts();

    setShowFilterModal(false);
  };

  useEffect(() => {
    if (initialFetch) {
      console.log(
        `Fetching initial set of products for category ${props.categoryId}...`
      );

      let apiUrl = `http://127.0.0.1:8080/core/machine/?page=${page}`;

      // Modify apiUrl if search term exists
      if (searchTerm.trim() !== "") {
        apiUrl = `http://127.0.0.1:8080/core/machine/?search=${searchTerm}&page=${page}`;
      }

      axios
        .get(apiUrl)
        .then((response) => {
          console.log("Response from the API:", response);

          // Filter products based on the category ID
          const newProducts = response.data.results.filter(
            (product) => product.category === props.categoryId
          );

          setProducts(newProducts);
          setLoading(false);

          // Check if there is a next page
          if (response.data.next) {
            setPage(page + 1);
          } else {
            // No more pages, set hasMoreData to false
            setHasMoreData(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching initial products:", error);
          setLoading(false);
        });

      setInitialFetch(false);
    }
  }, [props.categoryId, initialFetch, page]);

  const handleScroll = () => {
    if (
      hasMoreData &&
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
    ) {
      console.log(
        `Reached the bottom of the page. Fetching more products for category ${props.categoryId}...`
      );
      setLoading(true);
      fetchMoreProducts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      console.log("Cleanup: Removing scroll event listener");
      window.removeEventListener("scroll", handleScroll);
    };
  }, [products, hasMoreData, props.categoryId, page]);

  return (
    <>
      <Container className="text-center">
        <Badge className="mx-auto text-center myBadge">{props.badgeName}</Badge>
      </Container>
      <Container className="text-center mt-2">
        <Badge
          className="mx-auto text-center bg-success"
          style={{
            cursor: "pointer",
            width: "10%",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
          onClick={() => setShowFilterModal(true)}
        >
          <BsFilter size={35} />
        </Badge>
      </Container>
      <Container>
        <div className="row">
          {products.length == 0 && (
            <Alert
              style={{ width: "50%", direction: "rtl", textAlign: "right" }}
              variant="warning"
              className="text-center mt-5 mx-auto"
            >
              <b>محصولی یافت نشد.</b>
            </Alert>
          )}
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
      <Modal
        style={{ direction: "rtl", textAlign: "right" }}
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
      >
        <Modal.Header>
          <Modal.Title>جست‌و‌جو محصولات</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="عبارت مورد نظر را وارد کنید..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
            بستن
          </Button>
          <Button variant="primary" onClick={handleSearch}>
            جست‌و‌جو
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductsCols;
