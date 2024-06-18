import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../components/Header.jsx";
import "../styles/fontSize.css";
import "../styles/font.css";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header title="درباره ما" />
      <Container className="d-flex flex-wrap align-items-stretch">
        <Row className="mt-4">
          <Col
            lg={6}
            className="order-lg-2 change-font"
            style={{ direction: "rtl", textAlign: "right" }}
          >
            <p className="first-p">
              درباره ما شرکت خوشه صنعت تجارت با بیش از یک دهه سابقه کار اجرایی
              با توجه به نیاز مبرم بخش کشاورزی کشور به مدرن سازی و کاهش تلفات و
              افزایش عملکرد تاسیس گردید. این شرکت ابتدا به واردات دستگاه های
              مدرن برداشت و کارخانه شالیکوبی مدرن و سورتینگ اقدام نمود. هم اکنون
              این شرکت با توجه به دانش فنی بومی با اتکا به مهندسان جوان ایرانی
              در کنار واردات اقدام به تولید دستگاه های شالیکوبی و انواع سورتینگ
              و دستگاه های توزین و بسته بندی نموده است.
            </p>
          </Col>
          <Col lg={6} className="order-lg-1 mt-3 mt-lg-0">
            <Carousel className="shadow" fade>
              <Carousel.Item>
                <img
                  src="http://127.0.0.1:8080/core/machine_pics/carousel2.jpg"
                  alt="عکس نمونه"
                  className="d-block w-100"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="http://127.0.0.1:8080/core/machine_pics/carousel3.jpg"
                  alt="عکس نمونه"
                  className="d-block w-100"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="http://127.0.0.1:8080/core/machine_pics/carousel5.jpg"
                  alt="عکس نمونه"
                  className="d-block w-100"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col
            lg={6}
            className="second-p order-lg-1 change-font"
            style={{ direction: "rtl", textAlign: "right" }}
          >
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.{" "}
            </p>
          </Col>
          <Col lg={6} className="order-lg-2 mt-3">
            <img
              className="shadow"
              style={{ width: "100%" }}
              src="http://127.0.0.1:8080/core/machine_pics/photoabout.jpg"
              alt="عکس نمونه"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
