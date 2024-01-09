// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Carousel from "react-bootstrap/Carousel";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";

// function CarouselAdmin() {
//   const [items, setItems] = useState([
//     {
//       id: 1,
//       src: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/646/original/carousel-image.png?1703878576",
//       alt: "First Slide",
//     },
//     {
//       id: 2,
//       src: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/646/original/carousel-image.png?1703878576",
//       alt: "Second Slide",
//     },
//     {
//       id: 3,
//       src: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/646/original/carousel-image.png?1703878576",
//       alt: "Third Slide",
//     },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [newImageSrc, setNewImageSrc] = useState("");
//   const [newImageAlt, setNewImageAlt] = useState("");

//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   const handleAddImage = () => {
//     const newId = items.length + 1;
//     const newItem = {
//       id: newId,
//       src: newImageSrc,
//       alt: newImageAlt,
//     };
//     setItems([...items, newItem]);
//     setShowModal(false);
//     // Clear input fields
//     setNewImageSrc("");
//     setNewImageAlt("");
//   };

//   const handleRemoveImage = (id) => {
//     const updatedItems = items.filter((item) => item.id !== id);
//     setItems(updatedItems);
//   };

//   return (
//     <>
//       <Carousel style={{ marginTop: "12vh", marginBottom: "10px" }}>
//         {items.map((item) => (
//           <Carousel.Item key={item.id}>
//             <img
//               className="d-block w-100"
//               src={item.src}
//               alt={item.alt}
//               style={{ maxHeight: "400px", objectFit: "cover" }}
//             />
//             <Carousel.Caption>
//               <Button
//                 variant="danger"
//                 onClick={() => handleRemoveImage(item.id)}
//               >
//                 Remove Image
//               </Button>
//             </Carousel.Caption>
//           </Carousel.Item>
//         ))}
//       </Carousel>

//       <Button variant="primary" onClick={handleShowModal}>
//         Add New Image
//       </Button>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Image</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="newImageSrc">
//               <Form.Label>Image URL</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter image URL"
//                 value={newImageSrc}
//                 onChange={(e) => setNewImageSrc(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="newImageAlt">
//               <Form.Label>Image Alt Text</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter alt text"
//                 value={newImageAlt}
//                 onChange={(e) => setNewImageAlt(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleAddImage}>
//             Add Image
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default CarouselAdmin;

// the above is without fetching and everything

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

function CarouselAdmin() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newImageSrc, setNewImageSrc] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");

  useEffect(() => {
    // Fetch initial carousel items from the backend when the component mounts
    fetchCarouselItems();
  }, []);

  const fetchCarouselItems = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos?_limit=3"
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching carousel items:", error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddImage = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/photos",
        {
          url: newImageSrc,
          title: newImageAlt,
        }
      );
      const newItem = response.data;
      setItems([...items, newItem]);
      setShowModal(false);
      // Clear input fields
      setNewImageSrc("");
      setNewImageAlt("");
    } catch (error) {
      console.error("Error adding image:", error);
    }
  };

  const handleRemoveImage = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`);
      // Await the state update before continuing
      await setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  return (
    <>
      <Carousel style={{ marginTop: "12vh", marginBottom: "10px" }}>
        {items.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              src={item.url}
              alt={item.title}
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <Button
                variant="danger"
                onClick={() => handleRemoveImage(item.id)}
              >
                Remove Image
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Button variant="primary" onClick={handleShowModal}>
        Add New Image
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newImageSrc">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={newImageSrc}
                onChange={(e) => setNewImageSrc(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newImageAlt">
              <Form.Label>Image Alt Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter alt text"
                value={newImageAlt}
                onChange={(e) => setNewImageAlt(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddImage}>
            Add Image
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CarouselAdmin;
