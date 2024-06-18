import React from "react";
import Button from "react-bootstrap/Button";

const DeleteButton = ({ onClick }) => {
  return (
    <Button variant="danger" onClick={onClick}>
      حذف
    </Button>
  );
};

export default DeleteButton;
