import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function KitchenSinkExample() {
  return (
    <Card
      className="ms-5"
      style={{
        width: "20%",
        height: "38vh",
        backgroundColor: "#D9D9D9",
        borderRadius: "8px",
        border: "none",
      }}
    >
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "100%" }}
      >
        {/* sample image */}
        <Card.Img
          className="col-4"
          style={{ width: "85px", height: "94px" }}
          variant="top"
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/108/655/original/5126f3_1.png?1703887114"
        />
        <Card.Text>Card Text</Card.Text>
      </div>
    </Card>
  );
}

export default KitchenSinkExample;
