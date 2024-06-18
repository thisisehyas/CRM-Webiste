// import React, { useState, useEffect } from "react";
// import MyCarousel from "../MyCarousel";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../styles/btnFS.css";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";

// function Carousel2() {
//   const [showModal, setShowModal] = useState(false);
//   const [file, setFile] = useState(null);
//   const [imageUrls, setImageUrls] = useState([]);

//   let newImageUrl = "";

//   const handleShowModal = () => setShowModal(true);

//   const handleCloseModal = () => setShowModal(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("dimensions", "optional dimensions");

//     try {
//       const response = await fetch("http://localhost:8080/media/media/file/", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert(
//           `File uploaded successfully. File ID: ${data.file_id} url: ${data.url}`
//         );
//         newImageUrl = data.url;
//         setImageUrls((prevUrls) => {
//           const updatedUrls = [...prevUrls, newImageUrl];
//           localStorage.setItem("imageUrls", JSON.stringify(updatedUrls));
//           return updatedUrls;
//         });
//       } else {
//         alert(`File upload failed: ${data.message}`);
//         // Handle error (e.g., show error message)
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while uploading the file.");
//       // Handle network error
//     }

//     handleCloseModal();
//   };

//   useEffect(() => {
//     const savedImageUrls = JSON.parse(localStorage.getItem("imageUrls"));
//     if (savedImageUrls) {
//       setImageUrls(savedImageUrls);
//     }
//   }, []);

//   return (
//     <>
//       <MyCarousel images={imageUrls} />
//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <Button
//           variant="primary"
//           className="btn-fs m-2"
//           onClick={handleShowModal}
//         >
//           اضافه کردن عکس
//         </Button>
//       </div>

//       {/* Modal */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header style={{ direction: "rtl", textAlign: "right" }}>
//           <Modal.Title>اضافه کردن عکس</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group
//               controlId="formFile"
//               className="mb-1"
//               style={{ direction: "rtl", textAlign: "right" }}
//             >
//               <Form.Label>عکس را انتخاب کنید.</Form.Label>
//             </Form.Group>
//             <Form.Control
//               className="mb-4"
//               type="file"
//               onChange={handleFileChange}
//               required
//             />
//             <Button variant="primary" type="submit">
//               ذخیره تغییرات
//             </Button>
//             <Button
//               className="mx-1"
//               variant="secondary"
//               onClick={handleCloseModal}
//             >
//               بستن
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default Carousel2;

import React, { useState, useEffect } from "react";
import MyCarousel from "../MyCarousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/btnFS.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DeleteButton from "../../components/DeleteButton";

function Carousel2() {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [imagesData, setImagesData] = useState([]);

  let newImageUrl = "";

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("dimensions", "optional dimensions");

    try {
      const response = await fetch("http://localhost:8080/media/media/file/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert(
          `File uploaded successfully. File ID: ${data.file_id} url: ${data.url}`
        );
        newImageUrl = data.url;
        setImagesData((prevData) => {
          const updatedData = [
            ...prevData,
            { id: data.file_id, url: data.url },
          ];
          localStorage.setItem("imagesData", JSON.stringify(updatedData));
          return updatedData;
        });
      } else {
        alert(`File upload failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the file.");
    }

    handleCloseModal();
  };

  useEffect(() => {
    const savedImagesData = JSON.parse(localStorage.getItem("imagesData"));
    if (savedImagesData) {
      setImagesData(savedImagesData);
    }
  }, []);

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

      {/* Modal */}
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

      {imagesData.map((data, index) => (
        <div key={index} style={{ position: "relative" }}>
          <img
            alt={`Image ${data.id}`}
            src={data.url}
            style={{ width: 400, height: 300 }}
          />
          <div style={{ position: "absolute", top: "0px", right: "0px" }}>
            <DeleteButton onClick={() => handleDeleteImage(data.id)} />
          </div>
        </div>
      ))}
    </>
  );
}

export default Carousel2;
