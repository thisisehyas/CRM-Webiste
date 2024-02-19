import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/middleEach.css";
import "../../styles/fontSize.css";
import {
  Row,
  Col,
  Image,
  Container,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAccessToken } from "../authUtils";

const MiddleEach = (props) => {
  const { id } = useParams();
  const [newTitle, setNewTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newDescription, setNewDescription] = useState("");
  const [showDesModal, setShowDesModal] = useState(false);

  const [newPicture, setNewPicture] = useState("");
  const [showPicModal, setShowPicModal] = useState(false);

  // for info pic
  const [newAdditionalPic, setNewAdditionalPic] = useState("");
  const [showAdditionalPicModal, setShowAdditionalPicModal] = useState(false);

  const handleAdditionalPicChange = () => {
    setShowAdditionalPicModal(true);
  };

  const handleAdditionalPicModalClose = () => {
    setShowAdditionalPicModal(false);
  };

  const handleAdditionalPicModalSave = () => {
    // make the request to the backend here:
    const apiUrl = `http://127.0.0.1:8000/machine/${id}/`;
    axios
      .patch(
        apiUrl,
        {
          additional_picture: newAdditionalPic,
        },
        {
          headers: {
            Authorization: `JWT ${getAccessToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Response from updating title:", response);
        // props.onTitleUpdate(response.data.title);
        console.log("Reloading the page...");
        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error updating title:", error);
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
          console.error("Error setting up the request:", error.message);
        }
      })
      .finally(() => {
        console.log("Axios request completed.");
      });
  };

  //...

  const handlePictureChange = () => {
    setShowPicModal(true);
  };

  const handlePicModalClose = () => {
    // Close the modal without making any changes
    setShowPicModal(false);
  };

  const handleTitleChange = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    // Close the modal without making any changes
    setShowModal(false);
  };

  const handleModalSave = () => {
    console.log("Attempting to save changes...");
    setShowModal(false);

    const apiUrl = `http://127.0.0.1:8000/machine/${id}/`;

    axios
      .patch(
        apiUrl,
        {
          title: newTitle,
        },
        {
          headers: {
            Authorization: `JWT ${getAccessToken()}`,
          },
        }
      )
      .then((response) => {
        console.log("Response from updating title:", response);
        // props.onTitleUpdate(response.data.title);
        console.log("Reloading the page...");
        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error updating title:", error);
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
          console.error("Error setting up the request:", error.message);
        }
      })
      .finally(() => {
        console.log("Axios request completed.");
      });
  };

  const handleDescriptionChange = (event) => {
    setShowDesModal(true);
  };

  const handleDesModalClose = () => {
    // Close the modal without making any changes
    setShowDesModal(false);
  };

  const handleDesModalSave = () => {
    console.log("Attempting to save changes...");
    setShowDesModal(false);

    const apiUrl = `http://127.0.0.1:8000/machine/${id}/`;

    axios
      .patch(
        apiUrl,
        {
          description: newDescription,
        },
        {
          headers: {
            Authorization: `JWT ${getAccessToken()}`,
          },
        }
      )
      .then((response) => {
        console.log("Response from updating title:", response);
        // props.onTitleUpdate(response.data.title);
        console.log("Reloading the page...");
        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error updating title:", error);
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
          console.error("Error setting up the request:", error.message);
        }
      })
      .finally(() => {
        console.log("Axios request completed.");
      });
  };

  const handlePicModalSave = () => {
    console.log("Attempting to save changes...");
    setShowPicModal(false);

    const apiUrl = `http://127.0.0.1:8000/machine/${id}/`;

    axios
      .patch(
        apiUrl,
        {
          picture: newPicture,
        },
        {
          headers: {
            Authorization: `JWT ${getAccessToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Response from updating picture:", response);
        // Handle the response as needed
        // Example: props.onPictureUpdate(response.data.picture);
        console.log("Reloading the page...");
        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error updating picture:", error);
        // Handle errors as needed
      })
      .finally(() => {
        console.log("Axios request completed.");
      });
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-4 mt-1">
        <Button
          className="change-font"
          variant="primary"
          onClick={handleTitleChange}
        >
          تغییر عنوان محصول
        </Button>
      </div>
      <Container className="mt-3">
        <Row>
          <Col className="d-flex align-items-stretch">
            <p
              className="change-font first-p"
              style={{ direction: "rtl", textAlign: "right" }}
            >
              <Button
                className="mb-2 change-font"
                variant="primary"
                onClick={handleDescriptionChange}
              >
                تغییر توضیحات
              </Button>
              <h5 className="text-center">توضیحات</h5>
              {props.description}
            </p>
          </Col>

          <Col className="d-flex align-items-stretch">
            <Image
              style={{ marginBottom: "10px", width: "80%", marginLeft: "20%" }}
              src={props.picture}
              alt="عکس محصول"
            ></Image>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button
            className="mb-5 change-font"
            variant="primary"
            onClick={handlePictureChange}
          >
            تغییر تصویر
          </Button>
        </div>
        <Row>
          <h4 className="text-center mt-3">مشخصات فنی</h4>
          <Image
            className="mt-2"
            src={props.additional_picture}
            alt="مشخصات فنی"
          />
        </Row>
        <div className="d-flex justify-content-end">
          <Button
            className="mt-2 change-font"
            variant="primary"
            onClick={handleAdditionalPicChange}
          >
            تغییر تصویر
          </Button>
        </div>
      </Container>

      {/* Modal for updating the title */}
      <Modal show={showModal} onHide={handleModalClose}>
        {/* improve the styling of the closeButton and the header title. right now it's fixed with margin that might affect responsiveness.*/}
        <Modal.Header closeButton style={{ flexDirection: "row-reverse" }}>
          <Modal.Title style={{ marginLeft: "50%" }}>
            تغییر عنوان محصول
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "right", direction: "rtl" }}>
          <Form>
            <Form.Group controlId="formNewTitle">
              <Form.Label>عنوان جدید</Form.Label>
              <Form.Control
                type="text"
                placeholder="عنوان جدید را وارد کنید."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            بستن
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            ذخیره تغییرات
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for updating the description */}
      <Modal show={showDesModal} onHide={handleDesModalClose}>
        {/* improve the styling of the closeButton and the header title. right now it's fixed with margin that might affect responsiveness.*/}
        <Modal.Header closeButton style={{ flexDirection: "row-reverse" }}>
          <Modal.Title style={{ marginLeft: "40%" }}>
            تغییر توضیحات محصول
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "right", direction: "rtl" }}>
          <Form>
            <Form.Group controlId="formNewTitle">
              <Form.Label>توضیحات جدید</Form.Label>
              <Form.Control
                as="textarea"
                rows={12}
                placeholder="توضیحات جدید را وارد کنید."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDesModalClose}>
            بستن
          </Button>
          <Button variant="primary" onClick={handleDesModalSave}>
            ذخیره تغییرات
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPicModal} onHide={handlePicModalClose}>
        <Modal.Header closeButton style={{ flexDirection: "row-reverse" }}>
          <Modal.Title style={{ marginLeft: "50%" }}>
            تغییر تصویر محصول
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "right", direction: "rtl" }}>
          <Form>
            <Form.Group controlId="formNewPicture">
              <Form.Label>تصویر جدید</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setNewPicture(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePicModalClose}>
            بستن
          </Button>
          <Button variant="primary" onClick={handlePicModalSave}>
            ذخیره تغییرات
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAdditionalPicModal}
        onHide={handleAdditionalPicModalClose}
      >
        <Modal.Header closeButton style={{ flexDirection: "row-reverse" }}>
          <Modal.Title style={{ marginLeft: "50%" }}>
            تغییر تصویر محصول
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "right", direction: "rtl" }}>
          <Form>
            <Form.Group controlId="formNewPicture">
              <Form.Label>تصویر جدید</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setNewAdditionalPic(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAdditionalPicModalClose}>
            بستن
          </Button>
          <Button variant="primary" onClick={handleAdditionalPicModalSave}>
            {console.log("button clicked")} ذخیره تغییرات
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MiddleEach;

{
  /* improve the styling of the closeButton and the header title. right now it's fixed with margin that might affect responsiveness.*/
}
