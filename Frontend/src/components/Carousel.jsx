import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../styles/carousel.css";

function carousel() {
  return (
    <Carousel style={{ marginTop: "12vh", marginBottom: "10px" }}>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/646/original/carousel-image.png?1703878576"
          alt="Third Slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "65vh" }}
          className="d-block w-100 "
          src="http://127.0.0.1:8000/machine_pics/header.jpg"
          alt="Third Slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "65vh" }}
          className="d-block w-100 "
          src="http://127.0.0.1:8000/machine_pics/header1.jpg"
          alt="Third Slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default carousel;
