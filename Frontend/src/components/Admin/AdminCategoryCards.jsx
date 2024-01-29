import React, { useState, useEffect } from "react";
import { Card, Button, Container, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Wave from "../../components/WaveSvg";
import "../../styles/categoryCards.css";
import { getAccessToken } from "../authUtils";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Card1() {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const history = useHistory();

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/category/");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      if (!newCategoryTitle) {
        alert("Please enter a category title");
        return;
      }
      const response = await fetch("http://127.0.0.1:8000/category/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${getAccessToken()}`,
        },
        body: JSON.stringify({ title: newCategoryTitle }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorBody = await response.json(); // Log the response body
          console.log(errorBody);
        }
        throw new Error("Failed to add category");
      }

      // Close the add category modal and fetch updated categories
      setShowAddModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/category/${categoryId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${getAccessToken()}`,
          },
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorBody = await response.json(); // Log the response body
          console.log(errorBody);
        }
        throw new Error("Failed to delete category");
      }

      // Fetch updated categories after deletion
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditCategory = async (categoryId, newTitle) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/category/${categoryId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${getAccessToken()}`,
          },
          body: JSON.stringify({ title: newTitle }),
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorBody = await response.json(); // Log the response body
          console.log(errorBody);
        }
        throw new Error("Failed to edit category");
      }

      // Fetch updated categories after editing
      fetchCategories();
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewCategoryTitle("");
  };

  return (
    <>
      <Container className="mt-5">
        <div className="row d-flex justify-content-between">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="ms-5 myCard mx-auto"
              style={{
                backgroundColor: "#D9D9D9",
                borderRadius: "8px",
                border: "none",
              }}
            >
              <div
                key={category.id}
                as="div"
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ height: "100%" }}
              >
                {/* <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ height: "100%" }}
              > */}
                {category.id % 2 === 0 && (
                  <Card.Img
                    className="cardImage"
                    variant="top"
                    src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/655/original/5126f3_1.png?1703887114"
                  />
                )}
                {category.id % 2 === 1 && (
                  <Card.Img
                    className="cardImage"
                    variant="top"
                    src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/808/original/b79ad7_1.png?1704052831"
                  />
                )}
                <Link
                  to={`/AdminCategory/${category.id}`}
                  style={{ textDecoration: "none", color: "#333" }}
                >
                  <Card.Text
                    style={{
                      marginBottom: "10px",
                      textAlign: "right",
                      direction: "rtl",
                    }}
                  >
                    {category.title}
                  </Card.Text>
                </Link>
                <div className="d-flex">
                  <Button
                    variant="danger"
                    className="mx-1"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    className="mx-1"
                    onClick={() => {
                      const newTitle = prompt("Enter the new title:");
                      if (newTitle) {
                        handleEditCategory(category.id, newTitle);
                      }
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          <Card className="mx-auto myCard">
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ height: "100%" }}
            >
              <Button variant="success" onClick={handleShowAddModal}>
                Add Category
              </Button>
            </div>
          </Card>
        </div>
      </Container>
      <Wave />

      {/* Modal for adding a new category */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newCategoryTitle">
              <Form.Label>Category Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category title"
                value={newCategoryTitle}
                onChange={(e) => setNewCategoryTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Card1;

//when the modal is in the second column is a lot more to the right of the page. fix it with styling
