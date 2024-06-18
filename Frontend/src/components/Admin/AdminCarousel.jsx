import React, { useState, useEffect } from "react";
import MyCarousel from "../MyCarousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/btnFS.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function Carousel2() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [file, setFile] = useState(null);
  const [dimensions, setDimensions] = useState("");
  const [editDimensions, setEditDimensions] = useState("");
  const [editImageId, setEditImageId] = useState(null);
  const [imagesData, setImagesData] = useState([]);
  const [alert, setAlert] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFile(null);
    setDimensions("");
  };

  const handleShowEditModal = (image) => {
    setEditImageId(image.id);
    setEditDimensions(image.dimensions || "");
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditImageId(null);
    setEditDimensions("");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDimensionsChange = (e) => {
    setDimensions(e.target.value);
  };

  const handleEditDimensionsChange = (e) => {
    setEditDimensions(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    if (dimensions) {
      formData.append("dimensions", dimensions);
    }

    try {
      const response = await fetch("http://localhost:8080/media/media/file/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setAlert({
          type: "success",
          message: `فایل با موفقیت آپلود شد`,
        });
        const updatedData = [
          ...imagesData,
          { id: data.file_id, url: data.url, dimensions: data.dimensions },
        ];
        localStorage.setItem("imagesData", JSON.stringify(updatedData));
        setImagesData(updatedData);
      } else {
        setAlert({
          type: "danger",
          message: `آپلود ناموفق: ${data.message}`,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        type: "danger",
        message: "عملیات ناموفق",
      });
    }

    handleCloseModal();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append("dimensions", editDimensions);

    try {
      const response = await fetch(
        `http://localhost:8080/media/media/file/?id=${editImageId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAlert({ type: "success", message: "عکس با موفقیت آپدیت شد" });
        const updatedData = imagesData.map((image) =>
          image.id === editImageId
            ? { ...image, dimensions: editDimensions, url: data.url }
            : image
        );
        localStorage.setItem("imagesData", JSON.stringify(updatedData));
        setImagesData(updatedData);
      } else {
        setAlert({
          type: "danger",
          message: `عملیات ناموفق: ${data.message}`,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        type: "danger",
        message: "عملیات ناموفق",
      });
    }
    handleCloseEditModal();
  };

  const handleDeleteImage = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/media/media/file/?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedData = imagesData.filter((image) => image.id !== id);
        localStorage.setItem("imagesData", JSON.stringify(updatedData));
        setImagesData(updatedData);
        setAlert({ type: "success", message: "عکس با موفقیت حذف شد" });
      } else {
        const data = await response.json();
        setAlert({
          type: "danger",
          message: `عملیات ناموفق: ${data.message}`,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        type: "danger",
        message: "عملیات ناموفق",
      });
    }
  };

  useEffect(() => {
    const savedImagesData = JSON.parse(localStorage.getItem("imagesData"));
    if (savedImagesData) {
      setImagesData(savedImagesData);
    }
  }, []);

  const handleAlertClose = () => setAlert(null);

  useEffect(() => {
    let timeout;
    if (alert) {
      timeout = setTimeout(() => {
        setAlert(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  return (
    <>
      <MyCarousel images={imagesData.map((data) => data.url)} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="primary"
          className="btn-fs m-2"
          onClick={handleShowModal}
        >
          اضافه کردن عکس
        </Button>
      </div>
      {alert && (
        <Alert
          className="text-center"
          variant={alert.type}
          onClose={handleAlertClose}
          style={{ margin: "10px" }}
        >
          {alert.message}
        </Alert>
      )}
      {/* Add Image Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header style={{ direction: "rtl", textAlign: "right" }}>
          <Modal.Title>اضافه کردن عکس</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="formFile"
              className="mb-1"
              style={{ direction: "rtl", textAlign: "right" }}
            >
              <Form.Label>عکس را انتخاب کنید.</Form.Label>
            </Form.Group>
            <Form.Control
              className="mb-4"
              type="file"
              onChange={handleFileChange}
              required
            />
            <Form.Group
              controlId="formDimensions"
              className="mb-3"
              style={{ direction: "rtl", textAlign: "right" }}
            >
              <Form.Label>ابعاد (اختیاری)</Form.Label>
              <Form.Control
                type="text"
                value={dimensions}
                onChange={handleDimensionsChange}
                placeholder="ابعاد را وارد کنید."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              ذخیره تغییرات
            </Button>
            <Button
              className="mx-1"
              variant="secondary"
              onClick={handleCloseModal}
            >
              بستن
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Edit Dimensions Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header style={{ direction: "rtl", textAlign: "right" }}>
          <Modal.Title>ویرایش تصویر</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group
              controlId="formEditFile"
              className="mb-3"
              style={{ direction: "rtl", textAlign: "right" }}
            >
              <Form.Label>عکس جدید</Form.Label>
            </Form.Group>
            <Form.Control type="file" onChange={handleFileChange} />
            <Form.Group
              controlId="formEditDimensions"
              className="mb-3 mt-3"
              style={{ direction: "rtl", textAlign: "right" }}
            >
              <Form.Label>ابعاد جدید</Form.Label>
              <Form.Control
                type="text"
                value={editDimensions}
                onChange={handleEditDimensionsChange}
                placeholder="ابعاد جدید را وارد کنید."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              ذخیره تغییرات
            </Button>
            <Button
              className="mx-1"
              variant="secondary"
              onClick={handleCloseEditModal}
            >
              بستن
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      ;
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {imagesData.map((data, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "200px",
              height: "150px",
              marginLeft: "10px",
            }}
          >
            <img
              alt={`Image ${data.id}`}
              src={data.url}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                display: "flex",
                gap: "5px",
              }}
            >
              <Button
                variant="danger"
                size="sm"
                style={{
                  borderRadius: "50%",
                  padding: "0.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleDeleteImage(data.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Button
                variant="warning"
                size="sm"
                style={{
                  borderRadius: "50%",
                  padding: "0.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleShowEditModal(data)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Carousel2;
