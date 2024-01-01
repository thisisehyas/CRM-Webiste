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
        <div className="row">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="col-6 col-md-4 mb-3 mt-5">
              <Card
                style={{
                  backgroundColor: "#D9D9D9",
                  border: "none",
                  width: "60%",
                  height: "140%",
                  margin: "auto",
                }}
              >
                <div
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{ height: "100%" }}
                >
                  <Card.Img
                    className="cardImage"
                    variant="top"
                    src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/854/original/Bag_alt.png?1704112854"
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default productsCols;
