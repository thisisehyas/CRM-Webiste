import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import "../../styles/badge.css";
import "../../styles/fadeButton.css";
import { getAccessToken } from "../authUtils";

const ProductsCols = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);

  // State for the modal
  const [showModal, setShowModal] = useState(false);

  // State for new product form
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    unit_price: "",
    picture: "",
  });

  // Function to toggle the modal
  const toggleModal = () => setShowModal(!showModal);

  const fetchAllProducts = () => {
    const apiUrl = `http://127.0.0.1:8000/machine/`;

    console.log("Fetching all products...");

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Response from the API:", response);

        // Filter products based on the category ID
        const filteredProducts = response.data.results.filter(
          (product) => product.category === props.categoryId
        );

        setProducts(filteredProducts);
        setLoading(false);

        // Since we fetched all products, there's no need to check for next
        setHasMoreData(false);
      })
      .catch((error) => {
        console.error("Error fetching all products:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(
      `Fetching initial set of products for category ${props.categoryId}...`
    );
    fetchAllProducts();
  }, [props.categoryId]); // Re-fetch when category ID changes

  // Function to handle adding a new product
  const handleAddProduct = () => {
    // Implement your logic for adding a new product
    // You can use axios.post to send a POST request to your backend
    console.log("Adding new product:", newProduct);
    // After adding, close the modal and fetch updated data
    toggleModal();
    fetchAllProducts();
  };

  // Function to handle deleting a product
  const handleDeleteProduct = (productId) => {
    // Implement your logic for deleting a product
    // You can use axios.delete to send a DELETE request to your backend
    console.log("Deleting product with ID:", productId);
    // After deleting, fetch updated data
    fetchAllProducts();
  };

  const handleEditProduct = (productId) => {
    const apiUrl = `http://127.0.0.1:8000/machine/${productId}/`;

    // Find the product to be edited
    const productToEdit = products.find((product) => product.id === productId);

    // Prepare the updated product data
    const updatedProduct = {
      title: newProduct.title || productToEdit.title,
      category: newProduct.category || productToEdit.category,
      description: newProduct.description || productToEdit.description,
      unit_price: newProduct.unit_price || productToEdit.unit_price,
      picture: newProduct.picture || productToEdit.picture,
    };

    // Send a PATCH request with the updated data
    axios
      .patch(apiUrl, updatedProduct, {
        headers: {
          Authorization: `JWT ${getAccessToken()}`,
        },
      })
      .then((response) => {
        console.log("Response from editing product:", response);
        fetchAllProducts(); // Fetch updated data
      })
      .catch((error) => {
        console.error("Error editing product:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

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

              {/* Buttons for editing and deleting */}
              {/* <div className="mt-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </Button>{" "}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleEditProduct(product.id)}
                >
                  Edit
                </Button>
              </div> */}
            </div>
          ))}
        </div>
        {loading && (
          <div className="text-center mt-5">
            <Spinner animation="grow" variant="success" size="lg" />
            <p className="mt-2">Loading...</p>
          </div>
        )}

        {/* <Button
          variant="primary"
          onClick={toggleModal}
          className="position-fixed bottom-0 end-0 m-4 add-product-button"
        >
          Add New Product
        </Button> */}
      </Container>

      {/* Modal for adding a new product */}
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
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
              <Form.Label>Picture URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter picture URL"
                name="picture"
                value={newProduct.picture}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
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
