import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../../styles/badge.css";
import "../../styles/fadeButton.css";
import "../../styles/fontSize.css";
import { getAccessToken } from "../authUtils";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Badge,
  Card,
  Button,
  Modal,
  Form,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";

const ProductsCols = (props) => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: props.categoryId,
    description: "",
    unit_price: 0,
    picture: null,
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to:`, value);
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Updating picture to:", file);
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      picture: file,
    }));
  };

  const handleAddProduct = () => {
    const apiUrl = "http://127.0.0.1:8080/core/machine/";

    console.log("Adding new product...", newProduct);

    axios
      .post(apiUrl, newProduct, {
        headers: {
          // Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Response from adding product:", response);

        // Update the state to include the newly added product
        setProducts((prevProducts) => [...prevProducts, response.data]);

        // Close the modal and reset the newProduct state
        handleCloseModal();
        setNewProduct({
          title: "",
          category: props.categoryId,
          description: "",
          unit_price: 0,
          picture: null,
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error(
            "No response received. Request details:",
            error.request
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error details:", error.message);
        }
      });
  };

  const fetchAllProducts = async () => {
    const apiUrl = `http://127.0.0.1:8080/core/machine/`;
    const allProducts = [];

    console.log("Fetching all products...");

    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        const filteredProducts = response.data.results.filter(
          (product) => product.category === props.categoryId
        );
        allProducts.push(...filteredProducts);

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
    console.log(
      `Fetching initial set of products for category ${props.categoryId}...`
    );
    fetchAllProducts();
  }, [props.categoryId]); // Re-fetch when category ID changes

  const handleProductClick = (productId) => {
    // Implement your logic for handling product click
    console.log("Product clicked:", productId);
  };

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
      fetchAllProducts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      console.log("Cleanup: Removing scroll event listener");
      window.removeEventListener("scroll", handleScroll);
    };
  }, [products, hasMoreData, props.categoryId]);

  const handleDeleteProduct = (productId) => {
    const apiUrl = `http://127.0.0.1:8080/core/machine/${productId}/`;

    axios
      .delete(apiUrl, {
        headers: {
          // Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((response) => {
        console.log("Response from deleting product:", response);

        // Update the state to remove the deleted product
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error(
            "No response received. Request details:",
            error.request
          );
        } else {
          console.error("Error details:", error.message);
        }
      });
  };

  return (
    <>
      <Container className="text-center">
        <Badge className="mx-auto text-center myBadge">{props.badgeName}</Badge>
      </Container>

      {/* Add Product Button */}
      <Container className="text-center mt-3">
        <Button
          className="change-font"
          variant="success"
          onClick={handleShowModal}
        >
          اضافه کردن محصول به این دسته‌بندی
        </Button>
      </Container>

      <Container>
        <div className="row">
          {products.map((product) => (
            <div className="col-6 col-md-4 mb-5 mt-5">
              <Link
                as="div"
                to={`/AdminProduct/${product.id}`}
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
                  onClick={() => handleProductClick(product.id)}
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

                  {props.containName ? (
                    <span
                      className="mb-2"
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
                  <Card.Footer className="text-center ">
                    <Button
                      variant="danger"
                      className="change-font"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteProduct(product.id);
                      }}
                    >
                      حذف محصول
                    </Button>
                  </Card.Footer>
                </Card>
              </Link>
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
      {/* Modal for adding a new product */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product title"
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formUnitPrice">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter unit price"
                name="unit_price"
                value={newProduct.unit_price}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPicture">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                name="picture"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductsCols;
