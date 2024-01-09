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
  const [newTitle, setNewTitle] = useState("Default Title");
  const [newText, setNewText] = useState("Default Text");
  const [newImageUrl, setNewImageUrl] = useState("defaultImageUrl");

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

    const accessKey = "1Wm59-NEeIsfGkHZPRvWCmIRzXSeIvSIY3DdrYtCzJ0";
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=4`;

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
    setNewTitle(service.alt_description || "");
    setNewText(service.description || "");
    setNewImageUrl(service.urls.full);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTitle("");
    setNewText("");
    setNewImageUrl("");
  };

  const handleSaveChanges = () => {
    // The logic that saves changes to the backend should be implemented here (later)

    // Update the service in the services state
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === editedService.id
          ? {
              ...service,
              alt_description: newTitle,
              description: newText,
              urls: { full: newImageUrl, thumb: newImageUrl },
            }
          : service
      )
    );

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
                  src={service.urls.thumb || "defaultImageUrl"}
                />
                <Card.Body>
                  <Card.Title className="text-center change-font-title">
                    {service.alt_description || "Default Title"}
                  </Card.Title>
                  <Card.Text
                    className="change-font"
                    style={{ textAlign: "right", direction: "rtl" }}
                  >
                    {service.description || "Default Text"}
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
                value={newTitle || ""}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newText">
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter text"
                value={newText || ""}
                onChange={(e) => setNewText(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={newImageUrl || ""}
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
