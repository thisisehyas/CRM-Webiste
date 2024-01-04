import Container from "react-bootstrap/esm/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./-header";
import "./-Services.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const Services = () => {
  return (
    <>
      <Header title="خدمات" />
      <div className="services-text">
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <Col key={index}>
              <Card
                className="m-2 mx-auto"
                style={{ width: "19rem", borderRadius: "20px", margin: "auto" }}
              >
                <Card.Img
                  variant="top"
                  src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/109/180/original/image_14.png?1704367468"
                />
                <Card.Body>
                  <Card.Title className="text-center">
                    مشاوره های رایگان
                  </Card.Title>
                  <Card.Text style={{ textAlign: "right", direction: "rtl" }}>
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
    </>
  );
};

export default Services;

//  THINGS TO FIX:
//  - Would the font be ok on the mobile view or too big?
