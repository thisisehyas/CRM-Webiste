import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Carousel from "react-bootstrap/Carousel";

function carousel() {
  return (
    <Carousel style={{ marginTop: "5px", marginBottom: "10px" }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/646/original/carousel-image.png?1703878576"
          alt="Third Slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/646/original/carousel-image.png?1703878576"
          alt="Third Slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/646/original/carousel-image.png?1703878576"
          alt="Third Slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default carousel;
