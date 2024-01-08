import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/esm/Container";
import "../styles/-categoryCards.css";
import Wave from "../components/-waveSvg";

function Card1() {
  return (
    <>
      <Container className="mt-5">
        <div className="row d-flex justify-content-between">
          <Card
            className="ms-5 myCard"
            style={{
              backgroundColor: "#D9D9D9",
              borderRadius: "8px",
              border: "none",
            }}
          >
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ height: "100%" }}
            >
              <Card.Img
                className="cardImage"
                variant="top"
                src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/655/original/5126f3_1.png?1703887114"
              />
              <Card.Text
                className="cardText"
                style={{ textAlign: "right", direction: "rtl" }}
              >
                بسته‌بندی و توزین
              </Card.Text>
            </div>
          </Card>
          <Card
            className="myCard"
            style={{
              backgroundColor: "#D9D9D9",
              borderRadius: "8px",
              border: "none",
            }}
          >
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ height: "100%" }}
            >
              <Card.Img
                className="cardImage"
                variant="top"
                src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/808/original/b79ad7_1.png?1704052831"
              />
              <Card.Text
                className="cardText"
                style={{ textAlign: "right", direction: "rtl" }}
              >
                خط شالیکوبی مدرن
              </Card.Text>
            </div>
          </Card>
          <Card
            className="me-5 myCard"
            style={{
              backgroundColor: "#D9D9D9",
              borderRadius: "8px",
              border: "none",
            }}
          >
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ height: "100%" }}
            >
              <Card.Img
                className="cardImage"
                variant="top"
                src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/809/original/0396c4_1.png?1704052838"
              />
              <Card.Text
                className="cardText"
                style={{ textAlign: "right", direction: "rtl" }}
              >
                سورتینگ
              </Card.Text>
            </div>
          </Card>
        </div>
      </Container>
      <Wave />
    </>
  );
}

export default Card1;

//  PROBLEMS TO SOLVE:
//  - The cards should be linked to the page of products.
