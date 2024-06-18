import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import "../styles/categoryCards.css";
import Wave from "../components/WaveSvg.jsx";
import { Link } from "react-router-dom";

function Card1() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/core/category/");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <div className="row d-flex justify-content-between">
          {categories.map((category) => (
            <Card
              key={category.id} // Ensure each Card has a unique key
              className="ms-5 myCard mx-auto"
              style={{
                backgroundColor: "#D9D9D9",
                borderRadius: "8px",
                border: "none",
              }}
            >
              <Link
                to={`/category/${category.id}`}
                key={category.id}
                as="div"
                className="d-flex flex-column align-items-center justify-content-center"
                style={{
                  height: "100%",
                  textDecoration: "none",
                  color: "#333",
                }}
              >
                {/* <div
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{ height: "100%" }}
                > */}
                {/* Update the paths with the actual local images */}
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
                {/* Add more conditions for other category IDs as needed */}
                <Card.Text
                  className="cardText"
                  style={{
                    textAlign: "right",
                    direction: "rtl",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  {category.title}
                </Card.Text>
                {/* </div> */}
              </Link>
            </Card>
          ))}
        </div>
      </Container>
      <Wave />
    </>
  );
}

export default Card1;
