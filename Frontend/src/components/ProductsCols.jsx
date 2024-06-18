import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import { Card, Button, Modal, Alert } from "react-bootstrap";
import "../styles/badge.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsFilter } from "react-icons/bs";

const ProductsCols = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const fetchMoreData = () => {
    // Empty the products array before fetching new data
    setProducts([]);
    setLoading(true);
    setHasMoreData(true);

    let apiUrl = `http://127.0.0.1:8080/core/machine/?_start=${products.length}&_limit=6`;

    // If search term is provided, add it to the API URL
    if (searchTerm.trim() !== "") {
      apiUrl = `http://127.0.0.1:8080/core/machine/?search=${searchTerm}&_start=${products.length}&_limit=6`;
      setProducts([]);
    }

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Response from the API:", response);
        setProducts((prevProducts) => [
          ...prevProducts,
          ...response.data.results,
        ]);
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
    const apiUrl = `http://127.0.0.1:8080/core/machine/`;
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
  }, []);

  const handleSearch = () => {
    console.log("Search term: ", searchTerm);
    // Reset products array before fetching new search results
    setProducts([]);
    setLoading(true);
    setHasMoreData(true);

    // Fetch data with the new search term
    fetchMoreData();

    // closing the modal
    setShowFilterModal(false);
  };

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
      {/* Filter modal */}
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
          {/* Add more filter options here */}
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
