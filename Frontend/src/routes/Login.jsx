import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/font.css";
import "../styles/fontSize.css";
import "../styles/login.css";

const Login = () => {
  return (
    <Container
      className="mt-5 mb-5 p-0 d-flex align-items-center justify-content-center flex-column"
      style={{
        width: "50%",
        minHeight: "80vh",
        border: "1px solid #D6D5D5",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <Image
        className="mt-4"
        style={{ width: "125px" }}
        src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/109/251/original/0c34607cbf3244f9969b4a57cdcebdc9_1.png?1704396541"
        alt="لوگوی شرکت"
      ></Image>
      <hr
        style={{
          width: "100%",
          borderTop: "3px solid #D6D5D5",
          position: "absolute",
          top: "40%",
          transform: "translateY(-50%)",
        }}
      />
      <Form
        style={{
          direction: "rtl",
          textAlign: "right",
          maxWidth: "130%",
          width: "70%",
          margin: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Form.Group className="mb-4 mt-5" controlId="username">
          <Form.Control
            className="change-font form-control"
            required
            type="text"
            placeholder="نام کاربری خود را وارد کنید."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form className="lable"></Form>
          <Form.Control
            className="change-font form-control"
            type="password"
            required
            placeholder="رمز عبور خود را وارد کنید."
          />
          {/* <Form.Text className="text-center text-muted form-text d-block">
            رمز عبور خود را فراموش کرده‌اید؟ <Link to="">کلیک کنید.</Link>
          </Form.Text> */}
        </Form.Group>

        <Button
          type="submit"
          className="login-button mt-4 change-font mx-auto d-block"
        >
          ورود
        </Button>
      </Form>
      <Form.Text
        style={{ textAlign: "right", direction: "rtl" }}
        className="mb-3 text-muted form-text"
      >
        {/* حساب ندارید؟ <Link to="/SignIn">ثبت نام کنید.</Link> */}
      </Form.Text>
    </Container>
  );
};

export default Login;
