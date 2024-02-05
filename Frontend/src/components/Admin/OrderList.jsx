import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Container, Toast } from "react-bootstrap";
import "../../styles/fontSize.css";

const OrderList = () => {
  return (
    <>
      <Container
        className="mt-4 change-font mb-4"
        style={{
          direction: "rtl",
          textAlign: "right",
          backgroundColor: " #D9D9D9",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h5 className="text-center pt-5"> لیست سفارشات </h5>

        <ListGroup
          className="p-3"
          style={{
            overflowY: "auto",
            maxHeight: "260px",
          }}
        >
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start item"
          >
            شماره سفارش
            <div className="d-flex">
              <Button
                className="btn btn-danger change-font-btn"
                style={{ marginLeft: "3px" }}
              >
                حذف سفارش
              </Button>
              <Button className="btn btn-success change-font-btn">
                مشاهده اطلاعات
              </Button>
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start item"
          >
            شماره سفارش
            <div className="d-flex">
              <Button
                className="btn btn-danger change-font-btn"
                style={{ marginLeft: "3px" }}
              >
                حذف سفارش
              </Button>
              <Button className="btn btn-success change-font-btn">
                مشاهده اطلاعات
              </Button>
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start item"
          >
            شماره سفارش
            <div className="d-flex">
              <Button
                className="btn btn-danger change-font-btn"
                style={{ marginLeft: "3px" }}
              >
                حذف سفارش
              </Button>
              <Button className="btn btn-success change-font-btn">
                مشاهده اطلاعات
              </Button>
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start item"
          >
            شماره سفارش
            <div className="d-flex">
              <Button
                className="btn btn-danger change-font-btn"
                style={{ marginLeft: "3px" }}
              >
                حذف سفارش
              </Button>
              <Button className="btn btn-success change-font-btn">
                مشاهده اطلاعات
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </>
  );
};

export default OrderList;
