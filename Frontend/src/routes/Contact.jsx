import Container from "react-bootstrap/esm/Container";
import Header from "../components/Header.jsx";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/fontSize.css";

const Contact = () => {
  return (
    <>
      <Header title="تماس‌ با‌ ما" />
      <Container className="mt-4 change-font">
        <Row>
          <Col sm={12} md={6}>
            <Form
              style={{
                direction: "rtl",
                textAlign: "right",
                borderRadius: "8px",
                backgroundColor: "#F3F3F3",
                padding: "5%",
              }}
            >
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>نام</Form.Label>
                <Form.Control
                  className="change-font"
                  required
                  type="text"
                  placeholder="نام خود را وارد کنید."
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form»LastName">
                <Form.Label>نام خانوادگی</Form.Label>
                <Form.Control
                  className="change-font"
                  required
                  type="text"
                  placeholder="نام خانوداگی خود را وارد کنید."
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>آدرس ایمیل</Form.Label>
                <Form.Control
                  className="change-font"
                  required
                  type="email"
                  placeholder="ایمیل خود را وارد کنید."
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>شماره تلفن همراه</Form.Label>
                <Form.Control
                  className="change-font"
                  required
                  type="text"
                  placeholder="شماره تلفن خود را وارد کنید."
                  pattern="^09[0-9]{9}$"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="messageTitle">
                <Form.Label>موضوع</Form.Label>
                <Form.Control
                  className="change-font"
                  required
                  type="text"
                  placeholder="موضوع پیام را وارد کنید."
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="messageBody">
                <Form.Label>پیام</Form.Label>
                <Form.Control
                  className="change-font"
                  required
                  type="text"
                  as="textarea"
                  rows={5}
                  placeholder="متن پیام را وارد کنید."
                />
              </Form.Group>

              <Button variant="success" type="submit" className="change-font">
                ارسال
              </Button>
            </Form>
          </Col>
          <Col sm={12} md={6} className="mt-2">
            <p style={{ direction: "rtl", textAlign: "right" }}>
              شما می‌توانید با تکمیل فرم، پیام خود را به صورت آنلاین برای ما
              ارسال کنید یا از طریق راه‌های ارتباطی نوشته شده، با ما تماس
              بگیرید.
              <br />
              <br />
              شماره تلفن : 01132323232
              <br />
              <br />
              پست الکترونیک : sherkat@gmail.com
              <br />
              <br />
              آدرس : خیابان 1، کوچه‌ی اول، سمت راست، شرکت خوشه صنعت
              <br />
              <br />
              ساعت کاری : از ساعت 7:30 تا 19
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;

// THINGS TO FIX:
//  - Validation check on the form inputs can go further.
//  - Shouldn't the font size be smaller in footer and nav too?
//    Check it on mobile to see.
