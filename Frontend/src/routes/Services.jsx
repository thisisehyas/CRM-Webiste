import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header.jsx";
import "../styles/services.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../styles/fontSize.css";
import React, { useEffect } from "react";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header title="خدمات" />
      <div className="services-text change-font">
        <p style={{ direction: "rtl", textAlign: "right" }}>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
          و با استفاده از طراحان گرافیک است،
        </p>
      </div>
      <Container fluid>
        <Row className="mx-auto">
          {[1, 2, 3, 4].map((index) => (
            <Col key={index}>
              <Card
                className="m-2 mx-auto"
                style={{ width: "19rem", borderRadius: "20px", margin: "auto" }}
              >
                <Card.Img
                  variant="top"
                  src="http://127.0.0.1:8000/machine_pics/services.png"
                />
                <Card.Body>
                  <Card.Title
                    data-testid={`default-title-${index}`}
                    className="text-center change-font-title"
                  >
                    مشاوره های رایگان
                  </Card.Title>
                  <Card.Text
                    className="change-font"
                    style={{ textAlign: "right", direction: "rtl" }}
                  >
                    کارشناسان شرکت با سال‌ها تجربه و دانش، آماده پاسخگویی به
                    سوالات و ابهام‌های شما در زمینه خرید، ارتقا و یا تعمیرات
                    می‌باشند. این مشاوره‌ها هم به صورت حضوری و هم به صورت تلفنی
                    صورت می‌گیرد تا گستره‌ی هرچه وسیع‌تری از مشتریان بتوانند از
                    آن‌ها بهره‌مند شوند.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Services;

//  THINGS TO FIX:
//  - Would the font be ok on the mobile view or too big?
