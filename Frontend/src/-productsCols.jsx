import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import "./-productsCols.css";

const productsCols = () => {
  return (
    <>
      <Container className="text-center">
        <Badge
          className="mx-auto text-center myBadge"
          style={{
            width: "auto",
            fontSize: "100%",
            marginTop: "4%",
            padding: "15px",
          }}
        >
          پربازدیدترین محصولات
        </Badge>
      </Container>
      <Container>
        <Card
          className="ms-5 myCard"
          style={{
            backgroundColor: "#D9D9D9",
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
          </div>
        </Card>
      </Container>
    </>
  );
};

export default productsCols;


