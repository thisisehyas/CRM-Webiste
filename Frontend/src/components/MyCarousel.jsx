// import "bootstrap/dist/css/bootstrap.min.css";
// import React from "react";
// import Carousel from "react-bootstrap/Carousel";

// function MyCarousel({ images }) {
//   return (
//     <Carousel style={{ marginTop: "12vh", marginBottom: "10px" }}>
//       <Carousel.Item>
//         <img
//           className="d-block w-100 "
//           src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/646/original/carousel-image.png?1703878576"
//           alt="Slide"
//         />
//       </Carousel.Item>

//       {images.map((image, index) => (
//         <Carousel.Item key={index}>
//           <img
//             className="d-block w-100 mt-5"
//             src={image}
//             alt={`Slide ${index}`}
//           />
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// }

// export default MyCarousel;

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Carousel from "react-bootstrap/Carousel";

function MyCarousel({ images }) {
  return (
    <Carousel style={{ marginTop: "12vh", marginBottom: "10px" }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/646/original/carousel-image.png?1703878576"
          alt="Slide"
          style={{ maxHeight: "70vh", objectFit: "cover" }}
        />
      </Carousel.Item>

      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 mt-5"
            src={image}
            alt={`Slide ${index}`}
            style={{ maxHeight: "70vh", objectFit: "cover" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MyCarousel;
