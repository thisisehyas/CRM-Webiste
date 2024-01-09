import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/-Services.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/-fontSize.css";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [editedService, setEditedService] = useState({});

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  useEffect(() => {
    loadServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const loadServices = () => {
    setIsLoading(true);

    // Replace the sample API URL with your actual API endpoint
    const apiUrl = `https://jsonplaceholder.typicode.com/photos?_limit=4`;

    axios
      .get(apiUrl)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleShowModal = (service) => {
    setEditedService(service);
    setNewTitle(service.title);
    setNewText(service.body);
    setNewImageUrl(service.thumbnailUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTitle("");
    setNewText("");
    setNewImageUrl("");
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes to the backend here

    // Close the modal
    handleCloseModal();
  };

  return (
    <>
      <Container fluid>
        <Row className="mx-auto">
          {services.map((service) => (
            <Col key={service.id}>
              <Card
                className="m-5 mx-auto h-100"
                style={{
                  width: "19rem",
                  borderRadius: "20px",
                  margin: "auto",
                }}
              >
                <Card.Img
                  variant="top"
                  src={service.thumbnailUrl || "defaultImageUrl"}
                />
                <Card.Body>
                  <Card.Title className="text-center change-font-title">
                    {service.title || "Default Title"}
                  </Card.Title>
                  <Card.Text
                    className="change-font"
                    style={{ textAlign: "right", direction: "rtl" }}
                  >
                    {`${service.title} ${service.title}` || "Default Text"}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleShowModal(service)}
                  >
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {isLoading && (
          <div data-testid="loading-spinner" className="text-center mt-3">
            <BeatLoader color="#007BFF" css={override} loading={isLoading} />
          </div>
        )}
      </Container>

      {/* Modal for editing services */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newText">
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Services;
