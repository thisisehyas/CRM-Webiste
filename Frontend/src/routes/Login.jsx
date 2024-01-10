import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/fontSize.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ minHeight: "100vh", border: "2px solid black" }}
    >
      <Image
        style={{ width: "125px" }}
        src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/109/251/original/0c34607cbf3244f9969b4a57cdcebdc9_1.png?1704396541"
        alt="لوگوی شرکت"
      ></Image>

      <Form
        style={{
          direction: "rtl",
          textAlign: "right",
        }}
      >
        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Control
            style={{
              borderRadius: "10px",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
            className="change-font"
            required
            type="text"
            placeholder="شماره تلفن خود را وارد کنید."
            pattern="^09[0-9]{9}$"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form.Control
            style={{
              borderRadius: "10px",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
            className="change-font"
            type="password"
            required
            placeholder="رمز عبور خود را وارد کنید."
          />
          <Form.Text className="text-muted">
            قبلاً ثبت نام کرده‌اید؟
            <Link to="/SignIn">کلیک کنید.</Link>
          </Form.Text>
        </Form.Group>

        <Button variant="success" type="submit" className="change-font mx-auto">
          ارسال
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
