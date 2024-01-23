import ListGroup from "react-bootstrap/ListGroup";
import { Button, Container } from "react-bootstrap";
import "../styles/costumerMessage.css";

const CostumerMessage = () => {
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
      <h6 className="text-center pt-5">پیام‌های نخوانده</h6>
      <ListGroup className="p-3">
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start item"
        >
          اطلاعات مشتری
          <Button className="btn btn-danger change-font">مشاهده</Button>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start item"
        >
          اطلاعات مشتری
          <Button className="btn btn-danger change-font">مشاهده</Button>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start item"
        >
          اطلاعات مشتری
          <Button className="btn btn-danger change-font">مشاهده</Button>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start item"
        >
          اطلاعات مشتری
          <Button className="btn btn-danger change-font">مشاهده</Button>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start item"
        >
          اطلاعات مشتری
          <Button className="btn btn-danger change-font">مشاهده</Button>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default CostumerMessage;

// put a scroll bar for the user messages and the list of users for the times we have long lists.

// you should put the messages from the user from the online question and answer to be in a different part
// for example a modal will open or a dialoug and the admin can answer to the user

// the container above it which is the admin info box, has a more margin than it should from the bottom
