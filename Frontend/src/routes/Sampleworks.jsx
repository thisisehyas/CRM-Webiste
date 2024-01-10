import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header.jsx";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import React from "react";
import "../styles/fontSize.css";

const SampleWorks = () => {
  return (
    <>
      <Header title="نمونه‌کارها" />
      <Container className="mt-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <Row key={index} className="mt-3 mx-auto">
            <Card
              style={{
                maxWidth: "100%",
                padding: "0px",
                border: "none",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                display: "flex",
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              }}
            >
              <Card.Body style={{ flex: 2, backgroundColor: "#D9D9D9" }}>
                <Card.Text
                  className="change-font"
                  style={{ direction: "rtl", textAlign: "right" }}
                >
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                  افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                  طراحان خلاقی،
                </Card.Text>
              </Card.Body>
              <Card.Img
                variant="top"
                src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/109/196/original/image_11_%281%29.png?1704374814"
                style={{
                  flex: 1,
                  objectFit: "cover",
                  maxWidth: "40vw",
                  maxHeight: "60vw",
                }}
              />
            </Card>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default SampleWorks;
