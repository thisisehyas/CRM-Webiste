import ListGroup from "react-bootstrap/ListGroup";
import { Button, Container } from "react-bootstrap";
import "../styles/fontSize.css";

const UsersList = () => {
  return (
    <Container
      className="mt-4 change-font"
      style={{
        direction: "rtl",
        textAlign: "right",
        backgroundColor: " #D9D9D9",
        borderRadius: "10px",
      }}
    >
      <h6 className="text-center pt-5">مدیریت کاربران </h6>

      <ListGroup className="p-3">
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start item"
        >
          نام کاربر
          <div className="d-flex ">
            <Button
              className="btn btn-danger change-font-btn"
              style={{ marginLeft: "3px" }}
            >
              حذف کاربر
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
          نام کاربر
          <div className="d-flex">
            <Button
              className="btn btn-danger change-font-btn"
              style={{ marginLeft: "3px" }}
            >
              حذف کاربر
            </Button>
            <Button className="btn btn-success change-font-btn ">
              مشاهده اطلاعات
            </Button>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start item"
        >
          نام کاربر
          <div className="d-flex">
            <Button
              className="btn btn-danger change-font-btn"
              style={{ marginLeft: "3px" }}
            >
              حذف کاربر
            </Button>
            <Button className="btn btn-success change-font-btn ">
              مشاهده اطلاعات
            </Button>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start item"
        >
          نام کاربر
          <div className="d-flex">
            <Button
              className="btn btn-danger change-font-btn"
              style={{ marginLeft: "3px" }}
            >
              حذف کاربر
            </Button>
            <Button className="btn btn-success change-font-btn ">
              مشاهده اطلاعات
            </Button>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start item"
        >
          نام کاربر
          <div className="d-flex">
            <Button
              className="btn btn-danger change-font-btn"
              style={{ marginLeft: "3px" }}
            >
              حذف کاربر
            </Button>
            <Button className="btn btn-success change-font-btn ">
              مشاهده اطلاعات
            </Button>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default UsersList;
